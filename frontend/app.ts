var http = require('http');
var fs = require('fs');

var clusters: Array<any>;

export default function showClusters(classes) {
  clusters = classes;

  http.createServer( (req, res) => {
    console.log('Works');
    var file = fs.readFileSync('/frontend/views/index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(file);
  }).listen(3000, function () {
    console.log('Server running');
  });
}