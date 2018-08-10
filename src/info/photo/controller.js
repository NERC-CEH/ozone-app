import Backbone from 'backbone';
import appModel from 'app_model';
import radio from 'radio';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';
import photoData from '../../common/data/photos.data.json';

const API = {
  show(path, group, filename) {
    //!!!BREAKPOINT
    const photo = photoData[filename];
    const mainView = new MainView({
      model: new Backbone.Model({
        title: photo.title,
        source: photo.source,
        file: filename + '.jpg'
      })
    });
    radio.trigger('app:main', mainView);

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: group,
      }),
    });
    radio.trigger('app:header', headerView);

    // Store branch of accordion from which photo came so it can be opened when going back.
    appModel.set('infopath', path + '+' + group);
  },


};

export { API as default };
