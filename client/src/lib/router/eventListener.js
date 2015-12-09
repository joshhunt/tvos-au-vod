import router from './index';
import { PRIVATE } from './standardMiddleware';

export default function routeEventListener(event) {
  const ele = event.target;
  const route = ele.getAttribute('route');

  // Because we listen to the events on the root of the document, we're only
  // interested in when select has been called on an element with the route
  // attribute
  if (!route) {
    return;
  }

  // We can't put properties directly onto the ctx
  // object, so put them onto state 'privately'
  router.goTo(route, { [PRIVATE]: {event} }); // eslint-disable-line
}
