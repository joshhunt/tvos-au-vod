import 'babel-polyfill';
import {onLaunch, router} from 'lib';
import routes from './views';

router.connect(routes);

onLaunch((launchOptions) => {
  router.start()
});
