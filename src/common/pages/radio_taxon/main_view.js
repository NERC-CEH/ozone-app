/** ****************************************************************************
 * Radio-Taxon main view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import JST from 'JST';
import $ from 'jquery';
import examplesData from 'common/data/examples.data.json';

export default Marionette.View.extend({
  template: JST['common/radio_taxon/main'],

  events: {
    'click input[type="radio"]': 'taxonSelected',
  },

  taxonSelected(event) {
    const $input = $(event.target);
    const path = $input.attr('value');

    const species = {
      group: 3,
      path: path,
      common_name: path.substring(path.lastIndexOf('+') + 1),
      warehouse_id: $input.attr('id'),
      found_in_name: 'common_name'
    };
    this.trigger('taxon:selected', species);
  },

  serializeData() {
    const taxon = this.model.getOccurrence().get('taxon');

    return {
      branchTemplate: JST['common/radio_taxon/branch'],
      leafTemplate: JST['common/radio_taxon/leaf'],
      data: examplesData,
      selected: taxon && taxon.path
    };
  },

});
