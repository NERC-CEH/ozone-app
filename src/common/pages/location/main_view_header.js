/** ****************************************************************************
 * Location main view header functions.
 **************************************************************************** */
import $ from 'jquery';
import LocHelp from 'helpers/location';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import Log from 'helpers/log';
import Device from 'helpers/device';
import typeaheadSearchFn from 'helpers/typeahead_search';
import 'typeahead'; // eslint-disable-line

const HeaderView = Marionette.View.extend({
  template: JST['common/location/header'],

  events: {
    'change #location-name': 'changeName',
    'change #location-gridref': 'changeGridRef',
    'change #country': 'changeCountry',
    'keyup #location-gridref': 'keyupGridRef',
    'blur #location-name': 'blurInput',
    'blur #location-gridref': 'blurInput',
    'toggle #sensitive-btn': 'toggleSensitive',
    'click #sensitive-btn': 'toggleSensitive'
  },

  initialize() {
    Log('Location:Controller:MainViewHeader: initializing.');
    const sample = this.model.get('sample');
    this.listenTo(sample, 'change:location', this.onLocationChange);

    const appModel = this.model.get('appModel');
    this.locationInitiallyLocked = appModel.isAttrLocked(sample, 'location');
    this.listenTo(appModel, 'change:attrLocks', this.updateLocks);
  },

  onLocationChange() {
    Log('Location:Controller:MainViewHeader: on location change.');
    const location = this._getCurrentLocation();

    if (location.source !== 'gridref') {
      this.render();
      return;
    }

    this.updateLocks();
    this._clearGrTimeout();
    this._refreshGrErrorState(false);
    this._refreshGridRefElement(location);
  },

  /**
   * Attaches suggestions to the location name search.
   */
  onAttach() {
    const appModel = this.model.get('appModel');

    // Attaches suggestions to the location name search.
    let strs = appModel.get('locations');
    this.$el.find('#location-name').typeahead(
      {
        hint: false,
        highlight: false,
        minLength: 0,
      },
      {
        limit: 3,
        name: 'names',
        source: typeaheadSearchFn(strs, 3, a => a.name),
      }
    );

    // Attaches suggestions to the country search.
    const sample = this.model.get('sample');
    const surveyAttrs = sample.getSurvey().attrs;
    const attrConfig = surveyAttrs['smp']['country'];
    strs = Object.keys(attrConfig.values);
    this.$el.find('#country').typeahead(
      {
        hint: false,
        highlight: false,
        minLength: 1,
      },
      {
        limit: 3,
        name: 'names',
        source: typeaheadSearchFn(strs, 3),
      }
    );

  },

  changeName(e) {
    this.triggerMethod('name:change', $(e.target).val());
  },

  changeCountry(e) {
    // Pass event up to parent view.
    this.triggerMethod('country:change', $(e.target).val());
  },

  blurInput() {
    this.triggerMethod('input:blur');
  },

  toggleSensitive(e) {
    let active = $(e.currentTarget).hasClass('active');
    if (e.type !== 'toggle' && !Device.isMobile()) {
      // Device.isMobile() android generates both swipe and click
      active = !active; // invert because it takes time to get the class
      $(e.currentTarget).toggleClass('active', active);
    }
    // Pass event up to main view.
    this.triggerMethod('sensitive:toggle', active);
  },

  /**
   * after delay, if gridref is valid then apply change
   */
  keyupGridRef(e) {
    switch (e.keyCode) {
      case 13:
      // press Enter
      // falls through
      case 38:
      // Up
      // falls through
      case 40:
        // Down
        break;
      default:
        // Other
        const value = e.target.value.replace(/\s+/g, '').toUpperCase();

        const location = this._getCurrentLocation();
        const latlong = `${location.latitude}, ${location.longitude}`;
        if (value === location.gridref || value === latlong) {
          return; // gridref hasn't changed meaningfully
        }

        // Clear previous timeout
        this._clearGrTimeout();
        // eslint-disable-next-line
        const LATLONG_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g;

        const empty = value === '';
        const validGridRef = LocHelp.isValidGridRef(value);
        const validLatLong = value.match(LATLONG_REGEX);
        if (empty || validGridRef || validLatLong) {
          this._refreshGrErrorState(false);

          // Set new timeout - don't run if user is typing
          this.grRefreshTimeout = setTimeout(() => {
            // let controller know
            this.triggerMethod('gridref:change', value);
          }, 200);
        } else {
          this._refreshGrErrorState(true);
        }
    }
  },

  /**
   * stop any delayed gridref refresh
   */
  _clearGrTimeout() {
    Log('Location:MainView:Header: executing _clearGrTimeout.');

    if (this.grRefreshTimeout) {
      clearTimeout(this.grRefreshTimeout);
      this.grRefreshTimeout = null;
    }
  },

  changeGridRef(e) {
    Log('Location:MainView:Header: executing changeGridRef.');

    this._clearGrTimeout();
    this.triggerMethod('gridref:change', $(e.target).val());
  },

  _refreshGrErrorState(isError) {
    const grInputEl = document.getElementById('location-gridref');
    if (grInputEl) {
      if (isError) {
        grInputEl.setAttribute('data-gr-error', 'error');
        // this._removeMapMarker();
      } else {
        grInputEl.removeAttribute('data-gr-error');
      }
    }
  },

  _refreshGridRefElement(location) {
    Log('Location:MainView:Header: executing _refreshGridRefElement.');

    // rather than full refresh of the view, directly update the relavant input element
    const $GR = this.$el.find('#location-gridref');
    let value = location.gridref;

    const appModel = this.model.get('appModel');
    if ((!appModel.get('useGridRef') || !value) && location.latitude) {
      value = `${location.latitude}, ${location.longitude}`;
    }

    $GR.val(value);
    $GR.attr('data-source', location.source);
  },

  updateLocks() {
    Log('Location:MainView:Header: updating the locks.');

    const appModel = this.model.get('appModel');
    const sample = this.model.get('sample');
    const location = sample.get('location') || {};

    // location lock
    const $locationLockBtn = this.$el.find('#location-lock-btn');
    const disableLocationLock = location.source === 'gps';
    const locationLocked = this.isLocationLocked(disableLocationLock);
    this._setLockButton($locationLockBtn, locationLocked);
    if (locationLocked) {
      $locationLockBtn.removeClass('disabled');
    }

    // location name lock
    const $nameLockBtn = this.$el.find('#location-name-lock-btn');
    const nameLocked = appModel.isAttrLocked(sample, 'locationName');
    this._setLockButton($nameLockBtn, nameLocked);

    // country  lock
    const $countryLockBtn = this.$el.find('#country-lock-btn');
    const countryLocked = appModel.isAttrLocked(sample, 'country');
    this._setLockButton($countryLockBtn, countryLocked);

    // sensitive  lock
    const $sensitiveLockBtn = this.$el.find('#sensitive-lock-btn');
    const sensitiveLocked = appModel.isAttrLocked(sample, 'sensitive');
    this._setLockButton($sensitiveLockBtn, sensitiveLocked);
  },

  /**
   * Set classes on a lock button to show its state.
   * @param {jQuery object} $button  Button to update.
   * @param {boolean} locked  True if locked.
   */
  _setLockButton($button, locked) {
    if (locked) {
      $button.addClass('icon-lock-closed');
      $button.removeClass('icon-lock-open');
    } else {
      $button.addClass('icon-lock-open');
      $button.removeClass('icon-lock-closed');
    }
  },

  _getCurrentLocation() {
    return this.model.get('sample').get('location') || {};
  },

  serializeData() {
    Log('Location:Controller:MainViewHeader: serializing.');

    const appModel = this.model.get('appModel');
    const location = this._getCurrentLocation();
    let value = location.gridref;

    // avoid testing location.longitude as this can validly be zero within the UK
    if ((!appModel.get('useGridRef') || !value) && location.latitude) {
      value = `${location.latitude}, ${location.longitude}`;
    }

    const disableLocationLock = location.source === 'gps';

    const locationLocked = this.isLocationLocked(disableLocationLock);
    const sample = this.model.get('sample');
    const occ = sample.getOccurrence();
    const nameLocked = appModel.isAttrLocked(sample, 'locationName');
    const countryLocked = appModel.isAttrLocked(sample, 'country');
    const sensitiveLocked = appModel.isAttrLocked(sample, 'sensitive');

    return {
      hideName: this.options.hideName,
      hideLocks: this.options.hideLocks,
      disableLocationLock,
      locationName: location.name,
      value,
      country: sample.get('country'),
      sensitive: occ.metadata.sensitive,
      locationLocked,
      nameLocked,
      countryLocked,
      sensitiveLocked
    };
  },

  isLocationLocked(disableLocationLock = false) {
    const appModel = this.model.get('appModel');

    const currentLock = appModel.getAttrLock('smp:location');
    return (
      !disableLocationLock &&
      currentLock &&
      (currentLock === true || this.locationInitiallyLocked)
    );
  },
});

export default HeaderView;
