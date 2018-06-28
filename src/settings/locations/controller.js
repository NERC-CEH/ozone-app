/** ****************************************************************************
 * Settings Locations controller.
 **************************************************************************** */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import radio from 'radio';
import Log from 'helpers/log';
import StringHelp from 'helpers/string';
import Device from 'helpers/device';
import JST from 'JST';
import appModel from 'app_model';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show(options = {}) {
    Log('Settings:Locations:Controller: showing.');

    // MAIN
    const mainView = new MainView({
      model: appModel,
    });

    if (options && options.onSelect) {
      // check for options because for some reason a null is passed
      mainView.on('location:select', options.onSelect);
    }
    mainView.on('location:delete', API.deleteLocation);
    mainView.on('location:edit', API.editLocation);

    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Past Locations',
      }),
    });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  deleteLocation(model) {
    Log('Settings:Locations:Controller: deleting location.');

    const location = model;
    appModel.removeLocation(location);
  },

  editLocation(model) {
    Log('Settings:Locations:Controller: editing location.');

    const location = model;
    const EditView = Marionette.View.extend({
      template: JST['settings/locations/past_location_edit'],
      getValues() {
        return {
          name: StringHelp.escape(this.$el.find('#location-name').val()),
          favourite: this.$el.find('#favourite-btn').hasClass('active'),
        };
      },

      onAttach() {
        const $input = this.$el.find('#location-name');
        $input.focus();
        if (window.cordova && Device.isAndroid()) {
          window.Keyboard.show();
          $input.focusout(() => {
            window.Keyboard.hide();
          });
        }
      },
    });

    const editView = new EditView({ model: location });

    radio.trigger('app:dialog', {
      title: 'Edit Location',
      body: editView,
      buttons: [
        {
          title: 'Cancel',
          class: 'btn-clear',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Save',
          class: 'btn-positive',
          onClick() {
            // update location
            const locationEdit = editView.getValues();
            appModel.setLocation(location.set(locationEdit).toJSON());
            radio.trigger('app:dialog:hide');
          },
        },
      ],
    });
  },
};

export { API as default };
