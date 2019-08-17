const express = require('express');
const http = require('http');

const app = express();

const targetUrl = process.env.TARGET_URL || 'http://localhost:4000/ping'


app.get('/fuck', function(request, response) {
    http.get(targetUrl, function(resp) {
        let data = '';
    
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        resp.on('end', () => {
            response.send(data);
        });
    
    }).on("error", (err) => {
        response.send("Error: " + err.message);
    });
});

app.use(express.static(__dirname + '/www'));

app.set('port', process.env.APP_PORT || 4000);

let server = app.listen(app.get('port'), function() {
    console.log('server started : ' + server.address().port);
});