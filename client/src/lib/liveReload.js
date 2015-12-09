/* globals App */

import io from 'socket.io-client';
import * as router from './router';

function resume({ lastLocation }) {
  if (!lastLocation) { return; }

  router.goTo(lastLocation);
}

export default function connect(launchOptions = {}) {
  const socket = io(launchOptions.BASE_URL);

  socket.on('connect', () => console.debug('Live reload: connected'));
  socket.on('compile', () => console.debug('Live reload: compiling, prepare for reload'));

  socket.on('live-reload', () => {
    App.reload({ when: 'now' }, { lastLocation: router.currentLocation });
  });

  if (launchOptions.reloadData) {
    resume(launchOptions.reloadData || {});
  }
}
