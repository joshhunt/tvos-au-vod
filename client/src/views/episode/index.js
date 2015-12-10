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
      const doc = template({...programData, related: data.index});
      ctx.present(doc);
    });
}
