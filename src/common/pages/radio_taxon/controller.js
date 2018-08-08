/** ****************************************************************************
 * Radio-Taxon controller.
 **************************************************************************** */
import Backbone from 'backbone';
import App from 'app';
import radio from 'radio';
import appModel from 'app_model';
import Log from 'helpers/log';
import MainView from './main_view';
import HeaderView from 'common/views/header_view';

const API = {
  show(options = {}) {

    Log(`Radio-Taxon:Controller: showing.`);
  
    // MAIN
    const mainView = new MainView();
    mainView.on('taxon:selected', options.onSuccess, this);
    radio.trigger('app:main',mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Species',
      }),
    });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');

  },
};

export { API as default };
