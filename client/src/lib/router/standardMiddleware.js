/* globals navigationDocument */
import routeEventListener from './eventListener';

export const PRIVATE = Symbol('sssh, private!');
export const MENU_ITEM = 'menuItem';

function presentDocument(doc) {
  // Let every select and play event bubble up to the root of the document,
  // and invoke the event listener on them to handle future navigation
  doc.addEventListener('select', routeEventListener);
  doc.addEventListener('play', routeEventListener);

  // Set the route's context on the document so we can look it up later via navigationDocument
  // This is the only reliable way to get the current path
  doc[PRIVATE] = { context: this.context };

  // If this was bound with menuFeature, it must mean presentDocument has
  // been called to show a menu item. Otherwise, just push the document
  // into the nav stack
  if (this.menuFeature) {
    this.menuFeature.setDocument(doc, this.menuItem);

    // We need an easy way to determin which menuItem is active, so we have
    // to resort to setting it ourself on the menuFeature. This is used later
    // by getCurrentRoute()
    this.menuFeature[PRIVATE] = { currentMenuItem: this.menuItem };
  } else {
    navigationDocument.pushDocument(doc);
  }
}

// We use this to add extra data and fields directly onto the ctx object
export default function standardMiddleware(ctx, next) {
  ctx.present = presentDocument.bind({ context: ctx });

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

    const currentDocForItem = menuFeature.getDocument(menuItem);

    // There's already an active document for this menu item, so we don't
    // want to run the view again - just recycle the current one
    if (currentDocForItem) {
      return;
    }

    ctx.present = presentDocument.bind({ menuItem, menuFeature, context: ctx });
  }

  next();
}
