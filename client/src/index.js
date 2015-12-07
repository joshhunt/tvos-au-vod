import 'babel-polyfill';
import { onLaunch, router } from 'lib';

// Load the views and their routes
import './views';

onLaunch((launchOptions) => {
  router.start('/', launchOptions);
});
