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

    const species = {
      group: 3,
      common_name: $input.attr('value'),
      warehouse_id: $input.attr('id'),
      found_in_name: 'common_name'
    };
    this.trigger('taxon:selected', species);
  },

  serializeData() {
    return {
      branchTemplate: JST['common/branch'],
      leafTemplate: JST['common/radio_taxon/leaf'],
      data: examplesData,
    };
  },

});
