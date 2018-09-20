/** ****************************************************************************
 * Sample List header view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import JST from 'JST';
import App from 'app';

export default Marionette.View.extend({
  id: 'samples-header',
  tagName: 'nav',
  template: JST['samples/list/header'],

  triggers: {
    'click #surveys-btn': 'surveys',
    'click #create-new-btn': 'create',
  },

  events: {
    'change input': 'photoUpload',
    'click a[data-rel="back"]': 'navigateHome',
  },

  photoUpload(e) {
    this.trigger('photo:upload', e);
  },

  navigateHome() {
    // Navigate home rather than back because the sample list can
    // be accessed from the home menu or after record submission.
    // I don't want to go back to the record entry.
    App.triggerMethod('home');
  },

  onAttach() {
    // create camera/gallery selection
    if (window.cordova) {
      this.$el.find('.img-picker input').remove();

      this.$el.find('.img-picker').on('click', () => {
        this.trigger('photo:selection');
      });
    }
  },

  serializeData() {
    const activity = this.model.getAttrLock('smp:activity');

    return {
      training: this.model.get('useTraining'),
      activity_title: activity ? activity.title : null,
    };
  },
});
