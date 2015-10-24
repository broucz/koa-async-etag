import request from 'supertest';
import {expect} from 'chai';
import Koa from 'koa';
import Stream from 'stream';
import fs from 'fs';
import eTag from '../src';

describe('koa-async-etag', () => {
  it(`should not add ETag when body is missing`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(next => next());

    request(app.listen())
      .get('/')
      .end((err, res) => {
        expect(res.headers['etag']).to.equal(undefined)
        done(err);
      });
  });
  it(`should not add ETag when status != 2xx`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      ctx.status = 304;
      await next();
      ctx.body = 'Hello World';
    });

    request(app.listen())
      .get('/')
      .end((err, res) => {
        expect(res.headers['etag']).to.equal(undefined)
        done(err);
      });
  });
  it(`should not add ETag when body is a stream without a .path`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      await next();
      const s = new Stream.Readable();
      s.push('hello');
      s.push(null);
      ctx.body = s;
    });

    request(app.listen())
      .get('/')
      .end((err, res) => {
        expect(res.headers['etag']).to.equal(undefined)
        done(err);
      });
  });
  it(`should not add ETag when ETag is already set`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use((ctx, next) => {
      ctx.etag = 'already_set_etag';
      return next();
    });

    request(app.listen())
      .get('/')
      .expect('ETag', '"already_set_etag"')
      .end(done);
  });
  it(`should add ETag when body is a string`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      await next();
      ctx.body = 'Hello World';
    });

    request(app.listen())
      .get('/')
      .expect('ETag', '"b-sQqNsWTgdUEFt6mb5y4/5Q"')
      .end(done);
  });
  it(`should add ETag when body is a Buffer`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      await next();
      ctx.body = new Buffer('Hello World');
    });

    request(app.listen())
      .get('/')
      .expect('ETag', '"b-sQqNsWTgdUEFt6mb5y4/5Q"')
      .end(done);
  });
  it(`should add ETag when body is a JSON`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      await next();
      ctx.body = {hello: 'world'};
    });

    request(app.listen())
      .get('/')
      .expect('ETag', '"11-+8JLzHoXlHWPwTJ/z+va9g"')
      .end(done);
  });
  it(`should add ETag when body is a stream with a .path`, done => {
    const app = new Koa();

    app.use(eTag);

    app.use(async (ctx, next) => {
      await next();
      ctx.body = fs.createReadStream('package.json');
    });

    request(app.listen())
      .get('/')
      .end((err, res) => {
        expect(res.headers['etag']).to.be.a('string');
        done(err);
      });
  });
});
