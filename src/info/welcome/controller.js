import App from 'app';
import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import MainView from './main_view';

const API = {
  show() {
    const mainView = new MainView({ model: appModel });
    radio.trigger('app:main', mainView);

    mainView.on('exit', API.exit);

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');
  },

  exit() {
    Log('Info:Welcome:Controller: exit.');
    appModel.save({ showWelcome: false });
    App.trigger('home');

  },
};

export { API as default };
