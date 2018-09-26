/** ****************************************************************************
 * Radio-Taxon controller.
 **************************************************************************** */
import Backbone from 'backbone';
import radio from 'radio';
import savedSamples from 'saved_samples';
import Log from 'helpers/log';
import MainView from './main_view';
import HeaderView from 'common/views/header_view';

const API = {
  show(sampleID, options = {}) {

    Log(`Radio-Taxon:Controller: showing.`);
  
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      savedSamples.once('fetching:done', () => {
        API.show.apply(this, [sampleID]);
      });
      return;
    }

    let sample = savedSamples.get(sampleID);

    // Not found
    if (!sample) {
      radio.trigger('app:404:show', { replace: true });
      return;
    }
  
    // MAIN
    const mainView = new MainView({
      model: sample
    });

    // Event handler following species selection.
    // The callback function is updateTaxon in samples/edit/controller
    mainView.on('taxon:selected', options.onSuccess, this);
    
    radio.trigger('app:main',mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Species',
      }),
      onExit() {
        options.onSuccess(mainView.getSpecies());
      },
    });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');

  }
};

export { API as default };
