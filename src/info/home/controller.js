import Backbone from 'backbone';
import radio from 'radio';
import savedSamples from 'saved_samples';
import appModel from '../../common/models/app_model';
import Sample from '../../common/models/sample';
import Occurrence from '../../common/models/occurrence';
import MainView from './main_view';

const API = {
  show() {
    const mainView = new MainView({
      model: new Backbone.Model({ savedSamples }),
    });
    radio.trigger('app:main', mainView);
    mainView.on('sample', API.sample);
    mainView.on('list', API.list);

    // HEADER
    radio.trigger('app:header:hide');

    // FOOTER
    radio.trigger('app:footer:hide');

    // Clear the history of where we have navigated in the accordion views
    // for symptoms, examples, and other-causes.
    appModel.set('infopath', '');
  },

  // Add new record
  sample() {
    // create new sample
    const sample = new Sample();
    const occurrence = new Occurrence();
    sample.addOccurrence(occurrence);
    sample.save().then(() => {
      savedSamples.add(sample);

      sample.startGPS();

      appModel.set('draftSampleID', sample.cid);

      // navigate to sample edit
      radio.trigger('samples:edit', sample.cid);
    });
  },

  // List records
  list() {
    radio.trigger('samples:list', { replace: true });
  }
};

export { API as default };
