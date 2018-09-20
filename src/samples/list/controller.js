/** ****************************************************************************
 * Sample List controller.
 **************************************************************************** */
import Indicia from 'indicia';
import radio from 'radio';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import ImageHelp from 'helpers/image';
import showErrMsg from 'helpers/show_err_msg';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import Sample from '../../common/models/sample';
import Occurrence from '../../common/models/occurrence';
import MainView from './main_view';
import LoaderView from '../../common/views/loader_view';
import HeaderView from './header_view';

const API = {
  show(options = {}) {
    Log(`Samples:List:Controller: showing ${savedSamples.length}.`);
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      savedSamples.once('fetching:done', () => {
        API.show.apply(this);
      });
      radio.trigger('app:main', new LoaderView());
    } else {
      API.showMainView(options);
    }

    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on('photo:upload', e => {
      const photo = e.target.files[0];
      API.photoUpload(photo);
    });

    // android gallery/camera selection
    headerView.on('photo:selection', API.photoSelect);
    headerView.on('create', () => API.createNewSample());
    headerView.on('surveys', () => {
      radio.trigger('surveys:list', { replace: true });
    });

    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  showMainView(options) {
    const training = appModel.get('useTraining');

    // get subcollection
    const collection = savedSamples.subcollection({
      filter: model =>
        !model.metadata.complex_survey && model.metadata.training === training,
    });
    collection.comparator = savedSamples.comparator;
    collection.sort();

    const mainView = new MainView({
      collection,
      scroll: options.scroll,
      appModel,
      userModel,
    });

    mainView.on('childview:create', () => API.createNewSample());
    mainView.on('childview:sample:edit:attr', (childView, attr) => {
      radio.trigger('samples:edit:attr', childView.model.cid, attr);
    });

    mainView.on('childview:sample:delete', childView => {
      API.sampleDelete(childView.model);
    });

    radio.trigger('app:main', mainView);
  },

  sampleDelete(sample) {
    Log('Samples:List:Controller: deleting sample.');

    const syncStatus = sample.getSyncStatus();
    let body =
      window.t("This record hasn't been saved to the database yet, " +
      'are you sure you want to remove it from your device?');

    if (syncStatus === Indicia.SYNCED) {
      body = t('Are you sure you want to remove this record from your device?' +
      '</br><i><b>Note:</b> it will remain in the database.</i>');
    }
    radio.trigger('app:dialog', {
      title: 'Delete',
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
          title: 'Delete',
          class: 'btn-negative',
          onClick() {
            sample.destroy();
            radio.trigger('app:dialog:hide');
            Analytics.trackEvent('List', 'sample remove');
          },
        },
      ],
    });
  },

  photoUpload(photo) {
    Log('Samples:List:Controller: photo upload.');

    // todo: show loader
    API.createNewSampleWithPhoto('general', photo);
  },

  photoSelect() {
    Log('Samples:List:Controller: photo select.');

    radio.trigger('app:dialog', {
      title: 'Choose a method to upload a photo',
      buttons: [
        {
          title: 'Camera',
          onClick() {
            ImageHelp.getImage()
              .then(entry => {
                entry &&
                  API.createNewSampleWithPhoto('general', entry.nativeURL);
              })
              .catch(showErrMsg);
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Gallery',
          onClick() {
            ImageHelp.getImage({
              sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
              saveToPhotoAlbum: false,
            })
              .then(entry => {
                entry &&
                  API.createNewSampleWithPhoto(
                    'general',
                    entry.nativeURL,
                    () => {}
                  );
              })
              .catch(showErrMsg);
            radio.trigger('app:dialog:hide');
          },
        },
      ],
    });
  },

  createNewSample() {
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

};

export { API as default };
