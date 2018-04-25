# `postcss-ie11-supports` [![Build Status][ci-img]][ci]

[PostCSS] plugin adding `@supports not` support for IE 11.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11-supports.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11-supports

The plugin makes IE skip all `@supports` blocks but apply all `@supports not` ones. Since `@supports` is generally used for APIs newer than IE 11 this is an acceptable solution.

The way it does this is by prepending a selector understood by IE 11 only to the existing selector, making all other browsers ignore this rule.

Example input:
```css
@supports (display: grid) {
    .box {
        /* Grid styles, applied to modern browsers. */
    }
}
@supports not (display: grid) {
    .box {
        /* Fallback styles, applied to older browsers, including IE 11. */
    }
}
```

Example output:
```css
@supports (display: grid) {
    .box {
        /* Grid styles, applied to modern browsers. */
    }
}
@supports not (display: grid) {
    .box {
        /* Fallback styles, applied to older browsers, including IE 11. */
    }
}
_:-ms-fullscreen, .box {
    /* Fallback styles, applied to older browsers, including IE 11. */
}
```

## Usage

```js
postcss([
    require('postcss-ie11-supports'),
])
```

### Advanced usage

This plugin relies on a behavior of CSS that if browsers don't recognize a certain selector they drop the whole rule even if other selectors after the unrecognized one match. The default selector used, `'_:-ms-fullscreen'`, is recognized only by IE 11. You can change it to a different one that is recognized by other browsers by passing a `ieSelector` option, e.g.:
```js
postcss([
    require('postcss-ie11-supports')({
        ieSelector: '_:-ms-lang(x)',
    }),
])
```
will match IE 10 and 11. Note, however, that IE 10 support is not official so bugs affecting only that browser (and not affecting IE 11) may not be fixed.

See [PostCSS] docs for examples for your environment.
