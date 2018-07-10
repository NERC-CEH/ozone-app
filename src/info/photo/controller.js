import Backbone from 'backbone';
import radio from 'radio';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';
import photoData from '../../common/data/photos.data.json';

const API = {
  show(group,filename) {
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
  },


};

export { API as default };
