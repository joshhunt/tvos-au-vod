import { router } from 'lib';

import genericView from './generic';

import menuTemplate from './menu/template.tvml.jade';
import homeTemplate from './home/template.tvml.jade';
import categoriesTemplate from './categories/template.tvml.jade';
import allShowsTemplate from './allShows/template.tvml.jade';

import episodeView from './episode';

router('/', genericView({ template: menuTemplate }));
router('/home', genericView({ template: homeTemplate, endpoint: 'home' }));
router('/categories', genericView({ template: categoriesTemplate, endpoint: 'category' }));
router('/allShows', genericView({ template: allShowsTemplate, endpoint: 'index' }));
router('/programs/:programSlug/:episodeNumber', episodeView);

router('*', (ctx) => {
  console.log('...404 for route', ctx.path);
});
