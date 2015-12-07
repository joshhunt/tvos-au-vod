/* globals navigationDocument */
import page from 'page';

const PRIVATE = Symbol('sssh, private!');
const MENU_ITEM = 'menuItem';

const getDataAttributes = (ele) => {
  const attributes = {};

  for (let i = 0; i < ele.attributes.length; i++) {
    const att = ele.attributes[i];

    if (att.name.indexOf('data-') === 0) {
      attributes[att.name.replace(/^data-/, '')] = att.value;
    }
  }

  return attributes;
};

const routeEventListener = (event) => {
  const ele = event.target;
  const route = ele.getAttribute('route');

  if (!route) {
    return;
  }

  // We can't put properties directly onto the ctx
  // object, so put them onto state 'secretly'
  router.goTo(route, { [PRIVATE]: {event} }); // eslint-disable-line
};

const presentDocument = function (doc) {
  doc.addEventListener('select', routeEventListener);
  doc.addEventListener('play', routeEventListener);

  if (this.menuFeature) {
    this.menuFeature.setDocument(doc, this.menuItem);
  } else {
    navigationDocument.pushDocument(doc);
  }
};

// We use this to add extra data and fields directly onto the ctx object
const standardMiddleware = (ctx, next) => {

  ctx.present = presentDocument.bind({});

  // Add the event (if it exists)
  if (ctx.state[PRIVATE]) {
    ctx.event = ctx.state[PRIVATE].event;
  }

  // If there's and event, and it happened on a <menuItem />, then bind
  // presentDocument with what it needs to present a document inside
  // the menuItem
  if (ctx.event && ctx.event.target.nodeName === MENU_ITEM) {
    const menuItem = ctx.event.target;
    const menuFeature = menuItem.parentNode.getFeature('MenuBarDocument');
    ctx.present = ctx.present.bind({ menuItem, menuFeature });
  }

  next();
};

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

export default router;
