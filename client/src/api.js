import axios from 'axios';

export default function (endpoint) {
  return axios.get(`https://iview.abc.net.au/api/${endpoint}`, {
    params: {
      device: 'hbb', // have to use this device to get HTTP .mp4 stream
      appVer: 'appletv-tvml-dev',
    },
  });
}
