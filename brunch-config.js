/* eslint-env node */

'use strict';

var autoprefixer = require('autoprefixer')({remove: false, browsers: ['> 0%']});
var cssnano = require('cssnano')({safe: true});

module.exports = {
  npm: {
    styles: {'normalize.css': ['normalize.css']}
  },
  files: {
    javascripts: {
      joinTo: {
        'app.js': ['node_modules/auto-reload-brunch/vendor/auto-reload.js']
      },
      entryPoints: {
        'app/main.js': 'app.js',
        'app/CompilerWorker.js': 'CompilerWorker.js'
      }
    },
    stylesheets: {
      joinTo: 'app.css',
      order: {
        before: [
          'node_modules/normalize.css/normalize.css',
          'app/global.css'
        ]
      }
    }
  },
  modules: {
    autoRequire: {
      'app.js': ['app/main'],
      'CompilerWorker.js': ['app/CompilerWorker.js']
    },
    nameCleaner: function (path) {
      // Don't strip "app/" from module paths to ensure ability to require.
      // https://github.com/brunch/brunch/issues/1441#issuecomment-241268612
      return path;
    }
  },
  plugins: {
    postcss: {processors: [autoprefixer]}
  },
  watcher: {
    // Prevent Brunch from sometimes reading saved files as 0-byte files and
    // permanently losing track of their dependencies (e.g. when saving a file
    // in Emacs).  https://github.com/brunch/brunch/issues/971
    awaitWriteFinish: true
  },
  overrides: {
    production: {
      plugins: {
        postcss: {processors: [autoprefixer, cssnano]}
      }
    }
  }
};
