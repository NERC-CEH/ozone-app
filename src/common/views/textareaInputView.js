/**
 * Textarea view.
 */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import StringHelp from 'helpers/string';
import Device from 'helpers/device';

export default Marionette.View.extend({
  template: JST['common/textarea'],

  triggers: {
    'click button[data-rel="back"]': 'save'
  },

  initialize() {
    const config = this.options.config || {};

    this.model = new Backbone.Model({
      value: this.options.default || config.default,
      message: this.options.info || config.info,
      done: this.options.done || config.done,
    });
  },

  getValues() {
    const value = this.$el.find('textarea').val();
    return value && StringHelp.escape(value);
  },

  onAttach() {
    const $input = this.$el.find('textarea').focus();
    if (window.cordova && Device.isAndroid()) {
      window.Keyboard.show();
      $input.focusout(() => {
        window.Keyboard.hide();
      });
    }
  },
});
