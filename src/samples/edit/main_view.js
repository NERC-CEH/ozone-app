/** ****************************************************************************
 * Sample Edit main view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import Indicia from 'indicia';
import JST from 'JST';
import DateHelp from 'helpers/date';
import StringHelp from 'helpers/string';
import { coreAttributes } from 'common/config/surveys/general';
import './styles.scss';

export default Marionette.View.extend({
  template: JST['samples/edit/main'],

  triggers: {
    'click a#species-button': 'taxon:update',
  },

  /**
   * Need to push the main content down due to the subheader
   * @returns {string}
   */
  className() {
    const sample = this.model.get('sample');
    let amount = 0;

    let classes = 'attr-edit ';

    if (sample.get('activity')) {
      amount++;
    }

    if (sample.metadata.training) {
      amount++;
    }

    // eslint-disable-next-line
    classes += amount > 0 ? `band-margin-${amount}` : '';
    return classes;
  },

  initialize() {
    const sample = this.model.get('sample');
    this.listenTo(sample, 'geolocation', this.render);
  },

  serializeData() {
    const sample = this.model.get('sample');
    const occ = sample.getOccurrence();
    const specie = occ.get('taxon') || {};
    const appModel = this.model.get('appModel');

    // taxon
    const commonName = (specie.otherSelected) ? specie['other-species'] : specie.common_name;

    const locationPrint = sample.printLocation();
    const location = sample.get('location') || {};

    const attrLocks = {};
    // todo: don't rely on core attributes list to build this as it could contain
    // more than we need
    coreAttributes.forEach(attr => {
      const model = attr.split(':')[0] === 'smp' ? sample : occ;
      attrLocks[attr] = appModel.isAttrLocked(model, attr.split(':')[1]);
    });

    // show activity title.
    const activity = sample.get('activity');
    const activityTitle = activity ? activity.title : null;

    // Count answers in subsections and set a status class
    let locationAnswers = 0;
    let locationStatus = 'warn';
    locationAnswers += locationPrint ? 1 : 0;
    locationAnswers += sample.get('country') ? 1 : 0;
    if (locationAnswers == 2) {
      locationStatus = 'ok';
    }
    else if (!locationPrint && !sample.isGPSRunning()) {
      // We don't have a location and we are not waiting on GPS either.
      locationStatus = 'error';
    }
    let injuryAnswers = 0;
    injuryAnswers += occ.get('injury-symptoms') ? 1 : 0;
    injuryAnswers += occ.get('injury-colour') ? 1 : 0;
    injuryAnswers += occ.get('injury-location') ? 1 : 0;
    injuryAnswers += occ.get('injury-side') ? 1 : 0;
    injuryAnswers += occ.get('injury-age') ? 1 : 0;
    injuryAnswers += occ.get('injury-extent') ? 1 : 0;
    injuryAnswers += occ.get('injury-evidence') ? 1 : 0;
    let injuryStatus = (injuryAnswers == 7) ? 'ok' : 'warn';
    let weatherAnswers = 0;
    weatherAnswers += sample.get('weather-temp') ? 1 : 0;
    weatherAnswers += sample.get('weather-rain') ? 1 : 0;
    let weatherStatus = (weatherAnswers == 2) ? 'ok' : 'warn';
    let pollutionAnswers = 0;
    pollutionAnswers += sample.get('pollution-concentration') ? 1 : 0;
    pollutionAnswers += sample.get('pollution-duration') ? 1 : 0;
    let pollutionStatus = (pollutionAnswers == 2) ? 'ok' : 'warn';

    return {
      id: sample.cid,
      commonName: StringHelp.limit(commonName),
      isSynchronising: sample.getSyncStatus() === Indicia.SYNCHRONISING,
      'smp:date': DateHelp.print(sample.get('date'), true),
      'smp:activity': activityTitle,
      locks: attrLocks,
      locationAnswers,
      locationStatus,
      injuryAnswers,
      injuryStatus,
      weatherAnswers,
      weatherStatus,
      pollutionAnswers,
      pollutionStatus
    };
  },
});
