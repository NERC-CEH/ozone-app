/** ****************************************************************************
 * Info router.
 **************************************************************************** */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import CONFIG from 'config';
import JST from 'JST';
import App from 'app';
import appModel from 'app_model';
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
        template: JST['common/accordion'],
        model: new Backbone.Model({
          title: 'Symptoms of ozone damage',
          subtitle: 'Ozone pollution enters leaves through small pores on the leaf surface and causes damage to leaf cells.',
          path: 'symptoms',
          data: symptomsData,
          branchTemplate: JST['common/accordion_branch'],
          leafTemplate: JST['common/accordion_leaf'],
          selected: appModel.get('infopath')
        }),
      });
    },
    'info/examples(/)': () => {
      CommonController.show({
        title: 'Examples',
        App,
        route: 'info/examples/main',
        template: JST['common/accordion'],
        model: new Backbone.Model({
          title: 'Examples of Ozone Injury',
          path: 'examples',
          data: examplesData,
          branchTemplate: JST['common/accordion_branch'],
          leafTemplate: JST['common/accordion_leaf'],
          selected: appModel.get('infopath')
        }),
      });
    },
    'info/other-causes(/)': () => {
      CommonController.show({
        title: 'Other Causes',
        App,
        route: 'info/other-causes/main',
        template: JST['common/accordion'],
        model: new Backbone.Model({
          title: 'Other causes of leaf damage',
          subtitle: 'There are other possible causes of leaf damage that may be mistaken for ozone injury, which should not be included in this survey.',
          path: 'other-causes',
          data: otherCausesData,
          branchTemplate: JST['common/accordion_branch'],
          leafTemplate: JST['common/accordion_leaf'],
          selected: appModel.get('infopath')
        }),
      });
    },

   'photo/:path/:group/:filename': PhotoController.show,


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
