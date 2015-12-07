import homeTemplate from './template.tvml.jade';

export default function homeView(ctx) {
  const doc = homeTemplate();
  ctx.present(doc);
}
