/** ****************************************************************************
 * Info router.
 **************************************************************************** */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import CONFIG from 'config';
import JST from 'JST';
import App from 'app';
import radio from 'radio';
import CommonController from '../common/controller';
import HomeController from './home/controller';
import InfoMenuController from './menu/controller';
import WelcomeController from './welcome/controller';
import PhotoController from './photo/controller';
import symptomsData from '../common/data/symptoms.data.json'
import examplesData from '../common/data/examples.data.json'
import otherCausesData from '../common/data/other_causes.data.json'
import './help/swipe_record.png';
import './credits/sponsor_logo.png';

App.info = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    '': HomeController.show,
    home: HomeController.show,

    'info(/)': InfoMenuController.show,
    'info/welcome(/)': WelcomeController.show,

    'info/about(/)': () => {
      CommonController.show({
        title: 'About',
        App,
        route: 'info/about/main',
        model: new Backbone.Model({
          version: CONFIG.version,
          build: CONFIG.build,
        }),
      });
    },
    'info/help(/)': () => {
      CommonController.show({
        title: 'Help',
        App,
        route: 'info/help/main',
        model: new Backbone.Model({
          site_url: CONFIG.site_url,
        }),
      });
    },
    'info/privacy(/)': () => {
      CommonController.show({
        title: 'Privacy Policy',
        App,
        route: 'info/privacy/main',
      });
    },
    'info/terms(/)': () => {
      CommonController.show({
        title: 'T&Cs',
        App,
        route: 'info/terms/main',
      });
    },
    'info/credits(/)': () => {
      CommonController.show({
        title: 'Credits',
        App,
        route: 'info/credits/main',
      });
    },
    'info/symptoms(/)': () => {
      CommonController.show({
        title: 'Symptoms',
        App,
        route: 'info/symptoms/main',
        model: new Backbone.Model({
          data: symptomsData,
          branchTemplate: JST['common/branch'],
          leafTemplate: JST['common/leaf']
        }),
      });
    },
    'info/examples(/)': () => {
      CommonController.show({
        title: 'Examples',
        App,
        route: 'info/examples/main',
        model: new Backbone.Model({
          data: examplesData,
          branchTemplate: JST['common/branch'],
          leafTemplate: JST['common/leaf']
        }),
      });
    },
    'info/other-causes(/)': () => {
      CommonController.show({
        title: 'Other Causes',
        App,
        route: 'info/other-causes/main',
        model: new Backbone.Model({
          data: otherCausesData,
          branchTemplate: JST['common/branch'],
          leafTemplate: JST['common/leaf']
        }),
      });
    },

   'photo/:group/:filename': PhotoController.show,


    'info/*path': () => {
      radio.trigger('app:404:show');
    },
  },
});

// home page
App.on('home', () => {
  App.navigate('home');
  HomeController.show();
});

radio.on('info:welcome', options => {
  App.navigate('info/welcome', options);
  WelcomeController.show();
});

App.on('before:start', () => {
  Log('Info:router: initializing.');
  App.info.router = new Router();
});
