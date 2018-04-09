'use strict';

const postcss = require('postcss');

const plugin = require('../');

const run = (input, output, opts = {}) =>
    postcss([plugin(opts)]).process(input, {from: undefined})
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });

module.exports = {run};
