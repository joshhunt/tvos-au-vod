import { router } from 'lib';

import menuView from './menu';
import homeView from './home';

router('/', menuView);
router('/home', homeView);
