# `postcss-ie11-supports` [![Build Status][ci-img]][ci]

[PostCSS] plugin adding "@supports not" support for IE 11.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11-supports.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11-supports

```css
.foo {
    /* Input example */
}
```

```css
.foo {
    /* Output example */
}
```

## Usage

```js
postcss([
    require('postcss-ie11-supports'),
])
```

See [PostCSS] docs for examples for your environment.
