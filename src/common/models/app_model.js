/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import CONFIG from 'config';
import Log from 'helpers/log';
import pastLocationsExtension from './app_model_past_loc_ext';
import attributeLockExtension from './app_model_attr_lock_ext';

const AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    showWelcome: true,
    language: 'EN',

    locations: [],
    attrLocks: { general: {}, complex: {} },
    autosync: true,
    useGridRef: true,
    useGridMap: true,

    useExperiments: false,
    useGridNotifications: false,
    gridSquareUnit: 'monad',

    feedbackGiven: false,
    taxonGroupFilters: [],
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the object.
   */
  initialize() {
    Log('AppModel: initializing');

    this.fetch();
    this.checkExpiredAttrLocks();
  },

  toggleTaxonFilter(filter) {
    const taxonGroupFilters = this.get('taxonGroupFilters');
    const index = taxonGroupFilters.indexOf(filter);
    if (index >= 0) {
      taxonGroupFilters.splice(index, 1);
    } else {
      taxonGroupFilters.push(filter);
    }

    this.save();
  },
});

// add previous/pased saved locations management
const AppModelLocations = AppModel.extend(pastLocationsExtension);
// add sample/occurrence attribute management
const AppModelLocationsLock = AppModelLocations.extend(attributeLockExtension);

const appModel = new AppModelLocationsLock();
export { appModel as default, AppModelLocationsLock as AppModel };
