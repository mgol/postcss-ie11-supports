'use strict';

const {ieSelector} = require('../lib/constants');
const {run} = require('./utils');

it('doesn\'t touch regular blocks', () =>
    run(
        'a { color: black; }',
        'a { color: black; }',
    ),
);

it('doesn\'t touch "@support" blocks', () =>
    run(
        `
            @supports (display: grid) {
                a { color: black; }
            }
            @supports   (display: grid) {
                a { color: green; }
            }
            @supports(display: grid) {
                a { color: red; }
            }
        `,
        `
            @supports (display: grid) {
                a { color: black; }
            }
            @supports   (display: grid) {
                a { color: green; }
            }
            @supports(display: grid) {
                a { color: red; }
            }
        `,
    ),
);

it('transforms "@support not" blocks', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            @supports   not   (display: grid) {
                a { color: green; }
            }
            @supports not(display: grid) {
                a { color: red; }
            }
        `,
        // For some reason the first at-rule gets extra spaces for its appended cloned nodes.
        `
            @supports not (display: grid) {
                a { color: black; }
            }
                ${ ieSelector }, a { color: black; }
            @supports   not   (display: grid) {
                a { color: green; }
            }
            ${ ieSelector }, a { color: green; }
            @supports not(display: grid) {
                a { color: red; }
            }
            ${ ieSelector }, a { color: red; }
        `,
    ),
);

it('accepts the ieSelector parameter', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
        `,
        `
            @supports not (display: grid) {
                a { color: black; }
            }
                :-ms-lang(x), a { color: black; }
        `,
        {ieSelector: ':-ms-lang(x)'},
    ),
);
