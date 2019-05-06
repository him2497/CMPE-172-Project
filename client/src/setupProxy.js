const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/', { target: 'http://ec2-54-241-156-232.us-west-1.compute.amazonaws.com:8000/', changeOrigin: true }));
  app.use(proxy('/user/', { target: 'http://ec2-54-241-156-232.us-west-1.compute.amazonaws.com:8000/', changeOrigin: true }));
  app.use(proxy('/check/', { target: 'http://ec2-54-241-156-232.us-west-1.compute.amazonaws.com:8000/', changeOrigin: true }));
  app.use(proxy('/admin/', { target: 'http://ec2-54-241-156-232.us-west-1.compute.amazonaws.com:8000/', changeOrigin: true }));

};