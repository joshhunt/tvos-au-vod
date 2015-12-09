import 'babel-polyfill';
import { onLaunch, router } from 'lib';
import liveReload from 'lib/liveReload';

// Load the views and their routes
import './views';

onLaunch((launchOptions) => {
  router.start('/', launchOptions);
  liveReload(launchOptions);
});
