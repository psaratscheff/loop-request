var fs            = require('fs');                // for file reading/writing
var http          = require('http');
http.globalAgent.maxSockets = 5;

var letters = 'abcdefghijklmnopqrstuvwxyz';

var queries = [];

for (var a = 0; a < letters.length; a++) {
  for (var b = 0; b < letters.length; b++) {
    for (var c = 0; c < letters.length; c++) {
      queries.push(letters[a] + letters[b] + letters[c]);
    }
  }
}

var target = 'Nombre de dominio no existe.';

function nic_req_options(element) {
  return {
    host: 'www.nic.cl',
    path: '/registry/Whois.do?d=' + element
  };
}

function proc(data, query) {
  if (data.indexOf(target) == -1) {
    // console.log('used -> ' + query + '.cl');
  } else {
    console.log('===============> FREE! -> ' + query + '.cl');
    register_match(query + '.cl\n');
  }
}

for (var i = 0; i < queries.length; i++) {
  (function(query) {
    http.request(nic_req_options(query), function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        proc(str, query);
      });
    }).end();
  })(queries[i]);
}

var file = __dirname + '/matches.txt';
function register_match(match) {
  fs.appendFile(file, match, function (err) {
    if (err) return console.error(err);
  });
}
