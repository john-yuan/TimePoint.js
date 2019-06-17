var builder = require('@john-yuan/dev-browserify-builder');

builder.build('lib/index.js', 'dist/timepoint.min.js', {
    standalone: 'timepoint',
    debug: false,
    detectGlobals: false
}, {
    compress: {
        drop_console: true
    }
});
