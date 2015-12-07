import menuTemplate from './template.tvml.jade';

export default function menuView(ctx) {
  const doc = menuTemplate();
  ctx.present(doc);
}
