import http from 'http';
import path from 'path';
import nodeStatic from 'node-static';

const root = path.resolve(__dirname);
const srcRoot = path.resolve(root, 'src');
const distRoot = path.resolve(root, 'dist');

function exts(...args) {
  const extRegexString = '\\.(' + args.join('|') + ')$';
  return new RegExp(extRegexString);
}

let io;

module.exports = {
  context: srcRoot,
  stats: { children: false },
  entry: path.resolve(srcRoot, 'index.js'),

  output: {
    path: distRoot,
    filename: 'bundle.js',
    publicPath: `http://localhost:8123/`,
  },

  module: {
    loaders: [
      {
        test: exts('js'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: exts('tvml.jade'),
        loaders: [`${srcRoot}/lib/tvml-loader`, `jade?root=${srcRoot}/templates`],
      }, {
        test: exts('styl'),
        loaders: ['raw-loader', 'stylus-loader'],
      }, {
        test: exts('jpeg', 'jpg', 'png'),
        loader: 'file-loader',
      },

      // We're in neither a browser or node environment, so shim some modules so
      // they'll place nice. Lets hope this doesnt backfire
      {
        test: require.resolve('page'),
        loader: 'imports?document=>{},history=>{pushState: function() {}}',
      }, {
        test: /socket\.io\-client/,
        loader: `imports?window=>{},navigator=>{userAgent: 'tvos'}`,
      },
    ],
  },

  resolve: {
    extensions: ['', '.json', '.js'],
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  plugins: [
    function() {
      this.plugin('compile', x => io.emit('compile'));
      this.plugin('done', x => io.emit('live-reload'));
    },
  ],

};


// Start up a static file server to serve the bundled files
// TODO: Disable (or enable) this via args
const file = new nodeStatic.Server(distRoot);

const server = http.createServer((req, res) => {
  req.addListener('end', file.serve.bind(file, req, res)).resume();
});

server.listen(8123, () => {
  console.log('Server started');
});

io = require('socket.io')(server);
io.serveClient(false);

io.on('connection', (socket) => {
  console.log('socket.io connection');

  socket.on('event', (data) => {
    console.log('socket.io data:', data);
  });

  socket.on('disconnect', () => {
    console.log('socket.io disconnect');
  });
});
