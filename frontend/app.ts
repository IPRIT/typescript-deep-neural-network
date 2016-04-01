var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

export function showClusters(_clusters) {
  clusters = _clusters;

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '/app')));

  app.get('/partials\/*:filename', function compileStaticTemplate(req, res) {
    var filename = req.params[0];
    if (!filename) return;
    res.render('../app/partials/' + filename.replace(/(\.htm|\.html)$/i, ''));
  });

  var clusters: Array<any>;

  app.get('/', function (req, res) {
    res.render('index/index');
  });

  app.get('/getClusters', function (req, res) {
    res.json(clusters);
  });

  app.all('/*', function(req, res, next) {
    // Just send the index.jade for other files to support html5 mode in angular routing
    res.render('index/index');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
}