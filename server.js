const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const Cache = require('lru-cache');

const ssrCache = new Cache({
  max: 20, // not more than 20 results will be cached
  maxAge: 1000 * 60 * 5, // 5 mins
});


async function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url;
  // if page is in cache, server from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }
  try {
    // if not in cache, render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath,
      queryParams);

    // if something wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

app.prepare().then(() => {
  const server = express();
  server.get('*', (req, res) => handle(req, res));
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🤘 on http://localhost:${port}`);
  });
});
