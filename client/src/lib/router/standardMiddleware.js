/* globals navigationDocument */
import routeEventListener from './eventListener';

const PRIVATE = Symbol('sssh, private!');
const MENU_ITEM = 'menuItem';

function presentDocument(doc) {
  // Let every select and play event bubble up to the root of the document,
  // and invoke the event listener on them to handle future navigation
  doc.addEventListener('select', routeEventListener);
  doc.addEventListener('play', routeEventListener);

  // If this was bound with menuFeature, it must mean presentDocument has
  // been called to show a menu item. Otherwise, just push the document
  // into the nav stack
  if (this.menuFeature) {
    this.menuFeature.setDocument(doc, this.menuItem);
  } else {
    navigationDocument.pushDocument(doc);
  }
}

// We use this to add extra data and fields directly onto the ctx object
export default function standardMiddleware(ctx, next) {
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
    ctx.present = presentDocument.bind({ menuItem, menuFeature });
  }

  next();
}
