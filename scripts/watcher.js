var watcher = require('@john-yuan/dev-browserify-watcher');

var watch = function () {
    watcher.watch({
        entry: 'lib/index.js',
        output: 'dist/timepoint.js',
        paths: 'lib/**/*.js',
        browserifyOptions: {
            standalone: 'timepoint',
            debug: true,
            detectGlobals: false,
        }
    });
};

exports.watch = watch;
