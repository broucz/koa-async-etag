# Koa Async ETag

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

+/- the async version of [koa-etag](https://github.com/koajs/etag).

:bulb:**This middleware is designed for [Koa](https://github.com/koajs/koa) v2.x.x and use [Babel](https://babeljs.io/) for ES5 compatibility.**

:wrench:**This middleware is a work-in-progress**. Feedback / PR are welcome and encouraged. If you'd like to collaborate on this project, let me know.

## Installation

```
$ npm install --save koa-async-etag
```

## Usage

```js
import Koa from 'koa';
import eTag from 'koa-async-etag';

const app = new Koa();

app.use(eTag);

app.use(async (ctx, next) => {
  await next();
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/koa-async-etag.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-async-etag
[travis-image]:https://img.shields.io/travis/broucz/koa-async-etag.svg?style=flat-square
[travis-url]: https://travis-ci.org/broucz/koa-async-etag
[coveralls-image]: https://img.shields.io/coveralls/broucz/koa-async-etag.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/broucz/koa-async-etag?branch=master
[david-image]: https://img.shields.io/david/broucz/koa-async-etag.svg?style=flat-square
[david-url]: https://david-dm.org/broucz/koa-async-etag
[download-image]: https://img.shields.io/npm/dm/koa-async-etag.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-async-etag
