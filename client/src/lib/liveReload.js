/* globals App */

import io from 'socket.io-client';
import router from './router';

function resume({ lastRoute }) {
  if (!lastRoute) { return; }

  router.goTo(lastRoute);
}

export default function connect(launchOptions = {}) {
  const socket = io(launchOptions.BASE_URL);

  socket.on('connect', () => console.debug('Live reload: connected'));
  socket.on('compile', () => console.debug('Live reload: compiling, prepare for reload'));

  socket.on('live-reload', () => {
    App.reload({ when: 'now' }, { lastRoute: router.getCurrentRoute() });
  });

  if (launchOptions.reloadData) {
    resume(launchOptions.reloadData || {});
  }
}
