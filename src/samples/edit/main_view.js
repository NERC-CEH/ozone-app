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

    return {
      id: sample.cid,
      commonName: StringHelp.limit(commonName),
      isLocating: sample.isGPSRunning(),
      isSynchronising: sample.getSyncStatus() === Indicia.SYNCHRONISING,
      'smp:location': StringHelp.limit(locationPrint),
      'smp:date': DateHelp.print(sample.get('date'), true),
      'smp:activity': activityTitle,
      locks: attrLocks,
    };
  },
});
