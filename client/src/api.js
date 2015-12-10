import axios from 'axios';

export default function (endpoint) {
  return axios.get(`https://iview.abc.net.au/api/${endpoint}`, {
    params: {
      device: 'appletv-tvml',
      appVer: 'dev',
    },
  });
}
