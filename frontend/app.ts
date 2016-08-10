import { CLASSES_CONF } from "../Neuro/config";
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

let clusters: Array<any>;
let onAction: Function;
let isServerAlreadyRunning: boolean = false;

export function showClusters(_clusters, _onAction: Function = ()=>{}) {
  clusters = _clusters;
  onAction = _onAction;
  runServerInstance();
}

function runServerInstance() {
  if (isServerAlreadyRunning) {
    return;
  }
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '/app')));

  app.get('/partials\/*:filename', function compileStaticTemplate(req, res) {
    var filename = req.params[0];
    if (!filename) return;
    res.render('../app/partials/' + filename.replace(/(\.htm|\.html)$/i, ''));
  });

  app.get('/', function (req, res) {
    res.render('index/index');
  });

  app.get('/getClusters', function (req, res) {
    res.json(clusters);
  });

  app.get('/getSettings', function (req, res) {
    res.json(CLASSES_CONF);
  });

  app.post('/classifyPoint', function (req, res) {
    let point = req.body.point;
    onAction({
      type: 'classify',
      data: {
        point
      }
    }, (err, result) => {
      if (err) {
        return res.json({ error: err.toString() });
      }
      res.json({ result });
    });
  });

  app.all('/*', function(req, res, next) {
    // Just send the index.jade for other files to support html5 mode in angular routing
    res.render('index/index');
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    isServerAlreadyRunning = true;
  });
}
