/** ****************************************************************************
 * Location controller.
 **************************************************************************** */
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import CONFIG from 'config';
import Indicia from 'indicia';
import Log from 'helpers/log';
import StringHelp from 'helpers/string';
import LocHelp from 'helpers/location';
import GridRefUtils from 'bigu';
import App from 'app';
import radio from 'radio';
import savedSamples from 'saved_samples';
import appModel from 'app_model';
import MainView from './main_view';
// import PastLocationsController from '../../../settings/locations/controller';
import './styles.scss';

const LATLONG_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g; // eslint-disable-line

// overwrite how the location is set on the sample
let locationSetFunc = null;

const API = {
  show(sampleID, subSampleID, options = {hideName: true}) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      savedSamples.once('fetching:done', () => {
        API.show.apply(this, [sampleID]);
      });
      return;
    }

    let sample = savedSamples.get(sampleID);

    // Not found
    if (!sample) {
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // can't edit a saved one - to be removed when sample update
    // is possible on the server
    if (sample.getSyncStatus() === Indicia.SYNCED) {
      radio.trigger('samples:show', sampleID, { replace: true });
      return;
    }

    if (subSampleID) {
      sample = sample.samples.get(subSampleID);
    }

    // update the location setting function
    locationSetFunc = options.setLocation;

    // MAIN
    const mainView = new MainView({
      model: new Backbone.Model({ sample, appModel }),
      vent: App,
      hideName: options.hideName,
      hideLocks: options.hideLocks,
      hidePast: options.hidePast,
    });
    API.attachMainViewEvents(mainView, sample);

    radio.trigger('app:main', mainView);

    // HEADER
    radio.trigger('app:header:hide');

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  /**
   * Adds mainView listeners.
   * @param mainView
   * @param sample
   */
  attachMainViewEvents(mainView, sample) {
    // past locations
    mainView.on('past:click', () => API.onPastLocationsClick(sample));

    // map
    mainView.on('location:select:map', (loc, createNew) =>
      API.setLocation(sample, loc, createNew)
    );

    // gridref
    mainView.on('location:gridref:change', data =>
      API.onManualGridrefChange(sample, data)
    );

    // gps
    mainView.on('gps:click', () => API.onGPSClick(sample));

    // location name
    mainView.on('location:name:change', locationName =>
      API.updateLocationName(sample, locationName)
    );

    // country name
    mainView.on('location:country:change', countryName =>
      API.updateCountryName(sample, countryName)
    );

    // sensitive
    mainView.on('location:sensitive:toggle', active =>
      API.updateSensitive(sample, active)
    );

    // Any lock button clicked
    mainView.on('lock:click',  API.onLockClick);

    const locationIsLocked = appModel.isAttrLocked(sample, 'location');
    const nameIsLocked = appModel.isAttrLocked(sample, 'locationName');
    mainView.on('navigateBack', () => {
      API.exit(mainView, sample, locationIsLocked, nameIsLocked);
    });
  },

  /**
   * Sets new location to sample.
   * @param sample
   * @param loc
   * @param createNew
   */
  setLocation(sample, loc, reset) {
    if (typeof loc !== 'object') {
      // jQuery event object bug fix
      // todo clean up if not needed anymore
      Log('Location:Controller:setLocation: loc is not an object.', 'e');
      return Promise.reject(new Error('Invalid location'));
    }

    // check if we need custom location setting functionality
    if (locationSetFunc) {
      return locationSetFunc(sample, loc, reset);
    }

    let location = loc;
    // we don't need the GPS running and overwriting the selected location
    if (sample.isGPSRunning()) {
      sample.stopGPS();
    }

    if (!reset) {
      // extend old location to preserve its previous attributes like name or id
      let oldLocation = sample.get('location');
      if (!_.isObject(oldLocation)) {
        oldLocation = {};
      } // check for locked true
      location = $.extend(oldLocation, location);
    }

    // save to past locations
    const locationID = appModel.setLocation(location);
    location.id = locationID;

    sample.set('location', location);
    sample.trigger('change:location');

    return sample.save().catch(error => {
      Log(error, 'e');
      radio.trigger('app:dialog:error', error);
    });
  },

  exit(mainView, sample, locationWasLocked, nameWasLocked) {
    Log('Location:Controller: exiting.');

    sample
      .save()
      .then(() => {
        // save to past locations and update location ID on record
        const location = sample.get('location') || {};
        if (location.latitude) {
          const locationID = appModel.setLocation(location);
          location.id = locationID;
          sample.set('location', location);
        }

        API.updateLocks(sample, location, locationWasLocked, nameWasLocked);

        window.history.back();
      })
      .catch(error => {
        Log(error, 'e');
        radio.trigger('app:dialog:error', error);
      });
  },

  /**
   * Updates the locks.
   */
  updateLocks(sample, location = {}, locationWasLocked, nameWasLocked) {
    Log('Location:Controller: updating locks.');

    this.updateLocationLock(location, locationWasLocked);
    this.updateLocationNameLock(location.name, nameWasLocked);

    const countryLock = appModel.getAttrLock('smp:country')
    if (countryLock && countryLock === true) {
      // If country has been locked then save the locked value.
      appModel.setAttrLock('smp:country', sample.get('country'));
    }

    const sensitiveLock = appModel.getAttrLock('smp:sensitive')
    if (sensitiveLock && sensitiveLock === true) {
      // If sensitive has been locked then save the locked value.
      // Messy use of smp to store the lock when it is an occ attribute.
      const occ = sample.getOccurrence();
      appModel.setAttrLock('smp:sensitive', occurrence.metadata.sensitive);
    }
  },

  /**
   * On exit, update the value in the location lock.
   * @param {object} location The location.
   * @param {boolean} locationWasLocked Whether the location was locked when show() called.
   */
  updateLocationLock(location, locationWasLocked) {
    const currentLock = appModel.getAttrLock('smp:location');
    /* This will either be true or false if the lock was toggled or
    the original lock value or null if there was no locked value. */

     if (location.source !== 'gps' && location.latitude) {
      const clonedLocation = _.cloneDeep(location);

      // remove location name as it is locked separately
      delete clonedLocation.name;

      // we can lock location and name on their own
      // don't lock GPS though, because it varies more than a map or gridref
      if (currentLock && (currentLock === true || locationWasLocked)) {
        // update locked value if attr is locked
        // check if previously the value was locked and we are updating
        Log('Updating lock.');
        appModel.setAttrLock('smp:location', clonedLocation);
      }
    } else if (currentLock === true) {
      // reset if no location selected but locked is clicked
      appModel.unsetAttrLock('smp:location');
    }
  },
  /**
   * On exit, update the value in the locationName lock.
   * @param {string} locationName The value of the location name.
   * @param {boolean} nameWasLocked Whether the name was locked when  show() called.
   */
  updateLocationNameLock(locationName, nameWasLocked) {
    if (!locationName) {
      return;
    }

    const currentLockedName = appModel.getAttrLock('smp:locationName');
    /* This will either be true or false if the lock was toggled or
    the original lock value or null if there was no locked value. */

    if (currentLockedName) {
      if (currentLockedName === true || nameWasLocked) {
        appModel.setAttrLock('smp:locationName', locationName);
      }
    }
  },

  onGPSClick(sample) {
    // turn off if running
    if (sample.isGPSRunning()) {
      sample.stopGPS();
    } else {
      sample.startGPS();
    }
  },

  /**
   * Update location name that was typed in.
   * @param sample
   * @param countryName
   */
  updateCountryName(sample, countryName) {
    if (!countryName || typeof countryName !== 'string') {
      return;
    }
    const escapedName = StringHelp.escape(countryName);
    sample.set('country', escapedName);
    sample.save();
  },

  /**
   * Update location name that was typed in.
   * @param sample
   * @param locationName
   */
  updateLocationName(sample, locationName) {
    if (!locationName || typeof locationName !== 'string') {
      return;
    }

    const escapedName = StringHelp.escape(locationName);
    const location = sample.get('location') || {};
    location.name = escapedName;

    // check if we need custom location setting functionality
    if (locationSetFunc) {
      locationSetFunc(sample, location);
      return;
    }

    sample.set('location', location);
    sample.save();
  },

  updateSensitive(sample, active) {
    const occ = sample.getOccurrence();
    occ.metadata.sensitivity_precision = active ? CONFIG.sensitivity_precision : null;
    occ.metadata.sensitive = active ? 1 : null;
    occ.save();
  },

  /**
   * Updates sample location with new gridref that was typed in.
   * @param sample
   * @param gridref
   */
  onManualGridrefChange(sample, gridref) {
    Log('Location:Controller: executing onManualGridrefChange.');
    const normalizedGridref = gridref.replace(/\s/g, '').toUpperCase();

    if (gridref !== '') {
      const location = {};
      // check if it is in GB land and not in the sea
      if (LocHelp.isValidGridRef(normalizedGridref)) {
        // GB Grid Reference
        const parsedGridRef = GridRefUtils.GridRefParser.factory(
          normalizedGridref
        );

        location.source = 'gridref';
        location.gridref = parsedGridRef.preciseGridRef;
        location.accuracy = parsedGridRef.length / 2; // radius rather than square dimension

        const latLng = parsedGridRef.osRef.to_latLng();

        location.latitude = latLng.lat;
        location.longitude = latLng.lng;

        API.setLocation(sample, location);
      } else if (gridref.match(LATLONG_REGEX)) {
        // Lat Long
        location.source = 'gridref';
        location.accuracy = 1;
        const latitude = parseFloat(gridref.split(',')[0]);
        location.latitude = parseFloat(latitude);
        const longitude = parseFloat(gridref.split(',')[1]);
        location.longitude = parseFloat(longitude);

        API.setLocation(sample, location);
      } else {
        // invalid
        App.trigger('gridref:form:data:invalid', { gridref: 'invalid' });
      }
    } else {
      const location = sample.get('location') || {};
      delete location.source;
      location.gridref = '';
      location.latitude = null;
      location.longitude = null;
      location.accuracy = null;

      API.setLocation(sample, location);
    }
  },

  /**
   * Navigates to past locations page.
   * @param sample
   */
  onPastLocationsClick(sample) {
    radio.trigger('settings:locations', {
      onSelect(location) {
        if (sample.isGPSRunning()) {
          sample.stopGPS();
        }

        // // check if we need custom location setting functionality
        // if (locationSetFunc) {
        //   locationSetFunc(sample, location).then(() => window.history.back());
        //   return;
        // }

        sample.set('location', location);
        window.history.back();
      },
    });
  },

  onLockClick(attr) {
    attr = 'smp:' + attr;
    // Invert the lock of the attribute.
    // Real value will be put on exit.
    appModel.setAttrLock(attr, !appModel.getAttrLock(attr));
  }
};

export { API as default };
