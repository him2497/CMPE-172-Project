const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/', { target: 'http://localhost:8000', changeOrigin: true }));
  app.use(proxy('/user/', { target: 'http://localhost:8000', changeOrigin: true }));
  app.use(proxy('/check/', { target: 'http://localhost:8000', changeOrigin: true }));
  app.use(proxy('/admin/', { target: 'http://localhost:8000', changeOrigin: true }));

};