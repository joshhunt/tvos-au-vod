import api from '../../api';
import template from './template.tvml.jade';

export default function (ctx) {
  let programData;

  api(ctx.path)
    .then(({ data }) => {
      programData = data;
      return api(programData.related);
    })
    .then(({data}) => {
      const streamItems = programData.streams.http;
      const streamUrl = streamItems[streamItems.length - 1];

      // We pass the data, as JSON, as the querystring. This might not be very good
      const streamRoute = '/_player?' + encodeURIComponent(JSON.stringify({...programData, streamUrl}));

      const doc = template({
        ...programData,
        streamRoute,
        related: data.index,
      });

      ctx.present(doc);
    });
}
