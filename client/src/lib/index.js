/* globals App */

import router from './router';
export { router };

export function onLaunch(func) {
  App.onLaunch = func;
}
