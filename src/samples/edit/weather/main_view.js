/** ****************************************************************************
 * Sample Edit Weather main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';


export default Marionette.View.extend({
  template: JST['samples/edit/weather/main'],

  events: {
    'click button[data-rel="back"]': () => window.history.back()
  },

  serializeData() {
    const sample = this.model.get('sample');
    const appModel = this.model.get('appModel');

    const attrLocks = {
      'weather-temp': appModel.isAttrLocked(sample, 'weather-temp'),
      'weather-rain': appModel.isAttrLocked(sample, 'weather-rain'),
    };

    const surveyAttrs = sample.getSurvey().attrs;
    const attrLabels = {
      'weather-temp': surveyAttrs.smp['weather-temp'].question,
      'weather-rain': surveyAttrs.smp['weather-rain'].question
    };

    return {
      id: sample.cid,
      'weather-temp': sample.get('weather-temp'),
      'weather-rain': sample.get('weather-rain'),
      locks: attrLocks,
      labels: attrLabels
    };
  },
});
