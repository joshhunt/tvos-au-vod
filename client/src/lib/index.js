/* globals App, navigationDocument */

import router from './router';
export { router };

import loadingTemplate from './templates/loading.tvml.jade';

export function onLaunch(func) {
  App.onLaunch = func;
}

export function presentLoader(message) {
  const doc = loadingTemplate({ message });
  navigationDocument.presentModal(doc);
}

export function dismissModal() {
  navigationDocument.dismissModal();
}
