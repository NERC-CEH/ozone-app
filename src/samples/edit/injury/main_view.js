/** ****************************************************************************
 * Sample Edit Laboratory main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import CONFIG from 'config';
import JST from 'JST';
import StringHelp from 'helpers/string';


export default Marionette.View.extend({
  template: JST['samples/edit/injury/main'],

  serializeData() {
    const sample = this.model.get('sample');
    const occ = sample.getOccurrence();
    const appModel = this.model.get('appModel');

    const attrLocks = {
      'injury-symptoms': appModel.isAttrLocked(occ, 'injury-symptoms'),
      'injury-colour': appModel.isAttrLocked(occ, 'injury-colour'),
      'injury-location': appModel.isAttrLocked(occ, 'injury-location'),
      'injury-side': appModel.isAttrLocked(occ, 'injury-side'),
      'injury-age': appModel.isAttrLocked(occ, 'injury-age'),
      'injury-extent': appModel.isAttrLocked(occ, 'injury-extent'),
      'injury-evidence': appModel.isAttrLocked(occ, 'injury-evidence'),
      'injury-evidence-other': appModel.isAttrLocked(occ, 'injury-evidence-other')
    };

    const surveyAttrs = sample.getSurvey().attrs;
    const attrLabels = {
      'injury-symptoms': surveyAttrs.occ['injury-symptoms'].question,
      'injury-colour': surveyAttrs.occ['injury-colour'].question,
      'injury-location': surveyAttrs.occ['injury-location'].question,
      'injury-side': surveyAttrs.occ['injury-side'].question,
      'injury-age': surveyAttrs.occ['injury-age'].question,
      'injury-extent': surveyAttrs.occ['injury-extent'].question,
      'injury-evidence': surveyAttrs.occ['injury-evidence'].question,
      'injury-evidence-other': surveyAttrs.occ['injury-evidence-other'].question
    };

    return {
      id: sample.cid,
      'injury-symptoms': occ.get('injury-symptoms'),
      'injury-colour': occ.get('injury-colour'),
      'injury-location': occ.get('injury-location'),
      'injury-side': occ.get('injury-side'),
      'injury-age': occ.get('injury-age'),
      'injury-extent': occ.get('injury-extent'),
      'injury-evidence': occ.get('injury-evidence'),
      'injury-evidence-other': StringHelp.limit(occ.get('injury-evidence-other')),
      locks: attrLocks,
      labels: attrLabels,
    };
  },
});
