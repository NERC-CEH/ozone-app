/** ****************************************************************************
 * Sample router.
 **************************************************************************** */
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import Device from 'helpers/device';
import App from 'app';
import radio from 'radio';
import savedSamples from 'saved_samples';
import userModel from 'user_model';
import appModel from 'app_model';
import ListController from './list/controller';
import ShowController from './show/controller';
import EditController from './edit/controller';
import EditLocationController from '../common/pages/location/controller';
import EditInjuryController from './edit/injury/controller';
import EditWeatherController from './edit/weather/controller';
import EditPollutionController from './edit/pollution/controller';
import EditAttrController from './attr/controller';
import ActivitiesController from '../common/pages/activities/controller';
import TaxonController from '../common/pages/radio_taxon/controller';
// import TaxonController from '../common/pages/taxon/controller';

App.samples = {};

let scroll = 0; // last scroll position
const $mainRegion = $('#main');

/**
 * Scroll to the last position
 */
radio.on('species:list:show', () => {
  if (Device.isIOS()) {
    // iOS scroll glitch fix
    setTimeout(() => {
      $mainRegion.scrollTop(scroll);
    }, 1);
  } else {
    $mainRegion.scrollTop(scroll);
  }
});

const Router = Marionette.AppRouter.extend({
  routes: {
    'samples(/)': {
      route: () => {
        ListController.show({
          scroll, // inform about the last scroll
        });
      },
      leave() {
        scroll = $mainRegion.scrollTop();
      },
    },
    'samples/new(/)': TaxonController.show,
    'samples/:id': ShowController.show,
    'samples/:id/edit(/)': EditController.show,
    'samples/:id/edit/location(/)': EditLocationController.show,
    'samples/:id/edit/injury(/)': EditInjuryController.show,
    'samples/:id/edit/weather(/)': EditWeatherController.show,
    'samples/:id/edit/pollution(/)': EditPollutionController.show,
    'samples/:id/edit/activity(/)': ActivitiesController.show,
    'samples/:id/edit/:attr(/)': EditAttrController.show,
    'samples/*path': () => {
      radio.trigger('app:404:show');
    },
  },
});

radio.on('samples:list', options => {
  App.navigate('samples', options);
  ListController.show();
});

radio.on('samples:show', (sampleID, options) => {
  App.navigate(`samples/${sampleID}`, options);
  ShowController.show(sampleID);
});

radio.on('samples:edit', (sampleID, options) => {
  App.navigate(`samples/${sampleID}/edit`, options);
  EditController.show(sampleID);
});

radio.on('samples:edit:attr', (sampleID, attrID, options = {}) => {
  App.navigate(`samples/${sampleID}/edit/${attrID}`, options);
  switch (attrID) {
    case 'location':
      EditLocationController.show(sampleID);
      break;
    case 'taxon':
      TaxonController.show(sampleID, options);
      break;
    case 'activity':
      ActivitiesController.show(sampleID);
      break;
    default:
      EditAttrController.show(sampleID, attrID);
  }
});

radio.on('sample:saved', (options) => {
  // After saving a sample, go to the sample list regardless of whether
  // the recording form was accessed from the home page or the list page.
  App.navigate('samples', options);
  ListController.show();
  radio.trigger('app:dialog', {
    title: 'Record submitted',
    body:
      'Your record has been successfully submitted to the database. ' +
      'Thanks for your help!',
    buttons: [
      {
        id: 'ok',
        title: 'OK',
        class: 'btn-positive',
        onClick: App.regions.getRegion('dialog').hide,
      },
    ],
  });

});

function syncSamples() {
  if (Device.isOnline() && appModel.get('autosync') && userModel.hasLogIn()) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      savedSamples.once('fetching:done', () => {
        Log('Samples:router: syncing all samples.');
        savedSamples.save(null, { remote: true });
      });
      return;
    }
    Log('Samples:router: syncing all samples.');
    savedSamples.save(null, { remote: true });
  }
}

userModel.on('login', syncSamples);

App.on('before:start', () => {
  Log('Samples:router: initializing.');
  App.samples.router = new Router();

  if (userModel.hasLogIn()) {
    syncSamples();
  }
});
