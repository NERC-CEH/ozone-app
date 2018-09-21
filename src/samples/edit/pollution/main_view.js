/** ****************************************************************************
 * Sample Edit Pollution main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';


export default Marionette.View.extend({
  template: JST['samples/edit/pollution/main'],

  serializeData() {
    const sample = this.model.get('sample');
    const appModel = this.model.get('appModel');

    const attrLocks = {
      'pollution-concentration': appModel.isAttrLocked(sample, 'pollution-concentration'),
      'pollution-duration': appModel.isAttrLocked(sample, 'pollution-duration'),
    };

    const surveyAttrs = sample.getSurvey().attrs;
    const attrLabels = {
      'pollution-concentration': surveyAttrs.smp['pollution-concentration'].question,
      'pollution-duration': surveyAttrs.smp['pollution-duration'].question
    };

    return {
      id: sample.cid,
      'pollution-concentration': sample.get('pollution-concentration'),
      'pollution-duration': sample.get('pollution-duration'),
      locks: attrLocks,
      labels: attrLabels
    };
  },
});
