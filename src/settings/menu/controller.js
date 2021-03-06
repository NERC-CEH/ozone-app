/** ****************************************************************************
 * Settings Menu controller.
 **************************************************************************** */
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show() {
    Log('Settings:Menu:Controller: showing.');

    const mainView = new MainView({
      model: appModel,
    });
    mainView.on('setting:toggled', (setting, on) => {
      Log('Settings:Menu:Controller: setting toggled.');

      appModel.set(setting, on);
      appModel.save();
    });

    mainView.on('samples:submit:all', API.sendAllSamples);
    mainView.on('samples:delete:all', API.deleteAllSamples);
    mainView.on('app:reset', () => {
      radio.trigger('app:dialog', {
        title: 'Reset',
        class: 'error',
        body: `${t(
          'Are you sure you want to reset the application to its initial state?'
        )}<p><b>${t(
          'This will wipe all the locally stored app data!'
        )}</b></p>`,
        buttons: [
          {
            title: 'Cancel',
            class: 'btn-clear',
            onClick() {
              radio.trigger('app:dialog:hide');
            },
          },
          {
            title: 'Reset',
            class: 'btn-negative',
            onClick() {
              // delete all
              API.resetApp(() => {
                radio.trigger('app:dialog', {
                  title: 'Done!',
                  timeout: 1000,
                });
              });
            },
          },
        ],
      });
    });

    radio.trigger('app:main', mainView);

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Settings',
      }),
    });
    radio.trigger('app:header', headerView);
  },

  deleteAllSamples() {
    const body = `${t(
      'Are you sure you want to remove all successfully synchronised local records?'
    )}<p><i><b>${t('Note')}:</b> ${t(
      'records on the server will not be touched.'
    )}</i></p>`;

    radio.trigger('app:dialog', {
      title: 'Remove All',
      body,
      buttons: [
        {
          title: 'Cancel',
          class: 'btn-clear',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Remove',
          class: 'btn-negative',
          onClick() {
            Log('Settings:Menu:Controller: deleting all samples.');

            // delete all
            savedSamples
              .removeAllSynced()
              .then(() => {
                radio.trigger('app:dialog', {
                  title: 'Done!',
                  timeout: 1000,
                });
              })
              .catch(err => {
                Log(err, 'e');
                radio.trigger('app:dialog:error', err);
              });
            Analytics.trackEvent('Settings', 'delete all');
          },
        },
      ],
    });
  },

  sendAllSamples() {
    radio.trigger('app:dialog', {
      title: 'Submit All',
      body: 'Are you sure you want to set all valid records for submission?',
      buttons: [
        {
          title: 'Cancel',
          class: 'btn-clear',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Submit',
          class: 'btn-positive',
          onClick() {
            Log('Settings:Menu:Controller: sending all samples.');
            savedSamples
              .setAllToSend()
              .then(() => {
                radio.trigger('app:dialog', {
                  title: 'Done!',
                  timeout: 1000,
                });
              })
              .catch(err => {
                Log(err, 'e');
                radio.trigger('app:dialog:error', err);
              });
            Analytics.trackEvent('Settings', 'send all');
          },
        },
      ],
    });
  },

  resetApp(callback) {
    Log('Settings:Menu:Controller: resetting the application!', 'w');

    appModel.clear().set(appModel.defaults);
    appModel.save();

    userModel.clear().set(userModel.defaults);
    userModel.save();

    savedSamples
      .destroy()
      .then(callback)
      .catch(err => {
        Log(err, 'e');
        callback && callback(err);
      });

    Analytics.trackEvent('Settings', 'reset app');
  },
};

export { API as default };
