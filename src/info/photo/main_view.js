/** ****************************************************************************
 * Info Menu main view.
 **************************************************************************** */

import Marionette from 'backbone.marionette';
import JST from 'JST';
import './images/symptoms/bronze-spots-hornbeam.jpg';
import './images/symptoms/cream-spots-clover.jpg';
import './images/symptoms/lower-surface-elm.jpg';
import './images/symptoms/older-leaves-birch.jpg';
import './images/symptoms/upper-surface-elm.jpg';

import './images/examples/wheat.jpg';
import './images/examples/durum-wheat.jpg';
import './images/examples/maize.jpg';
import './images/examples/rice.jpg';
import './images/examples/finger-millet.jpg';
import './images/examples/pearl-millet.jpg';
import './images/examples/soybean.jpg';
import './images/examples/potato.jpg';
import './images/examples/french-bean.jpg';
import './images/examples/pinto-bean.jpg';
import './images/examples/turtle-bean.jpg';
import './images/examples/mung-bean.jpg';
import './images/examples/peas.jpg';
import './images/examples/onion.jpg';
import './images/examples/tomato.jpg';
import './images/examples/grape.jpg';
import './images/examples/watermelon.jpg';
import './images/examples/muskmelon.jpg';
import './images/examples/courgette.jpg';
import './images/examples/lettuce.jpg';
import './images/examples/spinach.jpg';
import './images/examples/chard.jpg';
import './images/examples/chicory.jpg';
import './images/examples/parsley.jpg';
import './images/examples/birch.jpg';
import './images/examples/beech.jpg';
import './images/examples/ash.jpg';
import './images/examples/narrow-leaved-ash.jpg';
import './images/examples/flowering-ash.jpg';
import './images/examples/sessile-oak.jpg';
import './images/examples/poplar.jpg';
import './images/examples/field-maple.jpg';
import './images/examples/italian-maple.jpg';
import './images/examples/white-mulberry.jpg';
import './images/examples/aleppo-pine.jpg';
import './images/examples/hawthorn.jpg';
import './images/examples/honeysuckle.jpg';
import './images/examples/wayfaring-tree.jpg';
import './images/examples/white-clover.jpg';
import './images/examples/red-clover.jpg';
import './images/examples/ribwort-plantain.jpg';
import './images/examples/brown-knapweed.jpg';
import './images/examples/black-knapweed.jpg';
import './images/examples/strawberry-tree.jpg';
import './images/examples/myrtle.jpg';
import './images/examples/mastic-tree.jpg';
import './images/examples/turpentine-tree.jpg';

import './images/other-causes/fungal-tomato.jpg';
import './images/other-causes/mildew-ash.jpg';
import './images/other-causes/mildew-ash-2.jpg';
import './images/other-causes/virus-melon.jpg';
import './images/other-causes/miner-beech.jpg';
import './images/other-causes/mite-bean.jpg';
import './images/other-causes/mite-willow.jpg';

export default Marionette.View.extend({
  template: JST['info/photo/main'],
 });
