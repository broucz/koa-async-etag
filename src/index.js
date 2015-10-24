import Stream from 'stream';
import calculate from 'etag';
import fs from 'mz/fs';

const eTag = async (ctx, next) => {
  await next();

  const {body, status, response} = ctx;
  if (!body || response.get('ETag')) return;
  if (2 != (status / 100 | 0)) return;

  if (body instanceof Stream) {
    if (!body.path) return;
    ctx.response.etag = calculate(await fs.stat(body.path));
  } else if (('string' == typeof body) || Buffer.isBuffer(body)) {
    ctx.response.etag = calculate(body);
  } else {
    ctx.response.etag = calculate(JSON.stringify(body));
  }
}

export default eTag;
