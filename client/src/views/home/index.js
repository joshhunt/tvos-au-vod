import homeTemplate from './template.tvml.jade';
import axios from 'axios';

const endpoint = 'https://iview.abc.net.au/api/home?device=ios-appletv&appver=dev';

export default function homeView(ctx) {
  axios.get(endpoint)
    .then(({ data }) => {
      const doc = homeTemplate(data);
      ctx.present(doc);
    });
}
