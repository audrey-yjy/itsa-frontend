const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });

const handler = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const rawResEnd = res.end
    const data = await new Promise((resolve) => {
      res.end = (payload) => {
        resolve(res.statusCode === 200 && payload)
      }
      app.render(req, res, req.path, {
        ...req.query,
        ...req.params,
      })
    })
    res.end = rawResEnd
    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express();

   // Serving next data directly without the cache
   server.get('/_next/*', (req, res) => {
    handler(req, res);
  });

  server.get('*', (req, res) => {
    if (dev || req.query.noCache) {
      res.setHeader('X-Cache-Status', 'DISABLED');
      handler(req, res);
    } else {
      ssrCache({req, res, pagePath: req.path, queryParams: req.query});
    }
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
});