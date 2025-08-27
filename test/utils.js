import assert from 'node:assert';
import postcss from 'postcss';

import plugin from 'postcss-ie11-supports';

export const run = (input, output, opts = {}) =>
    postcss([plugin(opts)]).process(input, {from: undefined})
        .then(result => {
            assert.strictEqual(result.css, output, 'Output matches');
            assert.strictEqual(result.warnings().length, 0, 'Warnings count OK');
        });
