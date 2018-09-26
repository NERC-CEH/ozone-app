/** ****************************************************************************
 * Radio-Taxon main view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import JST from 'JST';
import $ from 'jquery';
import examplesData from 'common/data/examples.data.json';
import './styles.scss';

export default Marionette.View.extend({
  template: JST['common/radio_taxon/main'],

  events: {
    'click input[type="radio"]': 'taxonSelected',
  },

  /*
    Function to return species info from the view.
    May be called when taxon is selected in main_view or
    exit is selected in header_view.
  */
  getSpecies() {
    const $speciesInput = this.$el.find('input:checked');
    const $otherInput = this.$el.find('#other-species input');

    const path = $speciesInput.attr('value');
    const common_name = path.substring(path.lastIndexOf('+') + 1);
    const otherSelected = (common_name.substring(0, 5) === 'Other');
    const warehouse_id = $speciesInput.attr('id');

    return {
      group: 3,
      path,
      common_name,
      warehouse_id,
      found_in_name: 'common_name',
      'other-species': otherSelected ? $otherInput.val() : '',
      otherSelected 
    };

  },
  
  taxonSelected() {
    let species = this.getSpecies()

    if (species.otherSelected) {
      // An 'other' species has been selected so show the text input.
      const $otherSpecies = this.$el.find('#other-species');
      const $otherMessage = $otherSpecies.find('p');
      let text = species.common_name + ': ';
      text += t('What is the species name?');
      // Prefix the question with the other-species type.
      $otherMessage.text(text);
      $otherSpecies.removeClass('hidden');
      // Grey out the accordion but leave it active.
      this.$el.find('#accordion').addClass('grey');
      this.$el.find('li .branch').addClass('grey');
      this.$el.find('li a').addClass('grey');
      this.$el.find('li .item-content').addClass('grey');
      // But let's not grey out the checked option.
      this.$el.find('li input:checked + div .item-content').removeClass('grey');
      // Set the focus to the other-species input.
      const $otherInput = $otherSpecies.find('input');
      $otherInput.focus();

    }
    else {
      // A known species from the list has been selected so initiate callback.
      this.trigger('taxon:selected', species);
    }
  },

  serializeData() {
    const taxon = this.model.getOccurrence().get('taxon');

    return {
      otherSelected: taxon && taxon.otherSelected,
      'other-species': taxon && taxon['other-species'],
      common_name: taxon && taxon.common_name,
      branchTemplate: JST['common/radio_taxon/branch'],
      leafTemplate: JST['common/radio_taxon/leaf'],
      data: examplesData,
      selected: taxon && taxon.path
    };
  },

});
