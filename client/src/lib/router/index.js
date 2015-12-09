import page from 'page';

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
  router.currentLocation = route;
  page(route, context);
};

router.start = (firstRoute = '/') => {
  router.goTo(firstRoute);
};

export default router;
