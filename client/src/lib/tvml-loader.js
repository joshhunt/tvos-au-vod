/* eslint-disable */

module.exports = function(source) {
  var source = source.replace(/module\.exports/, 'var templateFunc');
  source += ';\n';
  source += 'module.exports = function(locals) {';
  source += '  var parser = new DOMParser();';
  source += '  var template = templateFunc(locals);';
  // source += '  console.log(template);'
  source += '  return parser.parseFromString(template, "application/xml");';
  source += '}';

  return source;
};
