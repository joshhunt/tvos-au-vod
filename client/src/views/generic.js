import api from '../api';

export default function viewFactory({ template, endpoint }) {
  return function allShowsView(ctx) {
    const present = ({ data }) => {
      const doc = template(data);
      ctx.present(doc);
    };

    if (endpoint) {
      api(endpoint).then(present);
    } else {
      present({});
    }
  };
}
