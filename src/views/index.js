import { router, genericView } from 'lib';

import menuView from './menu';
import homeView from './homeView';

router('/', menuView);
router('/home', homeView);
router('/shows', genericView({template: require('./shows.tvml.jade'), endpoint: '/shows'}));
