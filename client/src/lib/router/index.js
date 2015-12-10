/* globals navigationDocument */

import page from 'page';
import { PRIVATE } from './standardMiddleware';

import standardMiddleware from './standardMiddleware';

const router = (...args) => {
  // Maybe in the future we might want to check if the first arg is string
  // and the last is function?

  // Insert our middleware as the first one (at index 1)
  args.splice(1, 0, standardMiddleware);

  // Register route with page.js
  page(...args);
};

router.goTo = (route, context = {}) => {
  page(route, context);
};

router.start = (firstRoute = '/') => {
  router.goTo(firstRoute);
};

// We can't just save route into router.currentRoute in router.goTo() because
// the current document changes in ways we can't know about. So we look at
// the router context we save onto documents, for the current document
// to determine the current route
router.getCurrentRoute = () => {
  let currentDocument = navigationDocument.documents[navigationDocument.documents.length - 1];

  // If the current document in the nav stack is a menuBar, get the active
  // document from inside the menu.
  if (currentDocument.getElementsByTagName('menuBar').length) {
    const menuFeature = currentDocument.getElementsByTagName('menuBar').item(0).getFeature('MenuBarDocument');
    currentDocument = menuFeature.getDocument(menuFeature[PRIVATE].currentMenuItem);
  }

  return currentDocument[PRIVATE].context.path;
};

_globals.router = router;

export default router;
