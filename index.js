'use strict';

const postcss = require('postcss');

const constants = require('./constants');

module.exports = postcss.plugin('postcss-ie11-supports', ({
    ieSelector = constants.ieSelector,
} = {}) => root => {
    root.walkAtRules('supports', atRule => {
        if (/^not\b/.test(atRule.params)) {
            const newRules = atRule.clone();
            newRules.walkRules(rule => {
                rule.selector = `${ ieSelector }, ${ rule.selector }`;
            });
            atRule.after(newRules.nodes);
        }
    });
});
