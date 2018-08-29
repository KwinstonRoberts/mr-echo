const express = require('express');
const app = express();
const https = require('https');

app.post('/command/echo', async(req, res) => {
    res.send(200);
    console.log(req)
    try{
        const slackReqObj = req.body;
        if(slackReqObj.item === "burndown"){

            var options = {
                host: 'www.google.com',
                path: '/index.html'
              };
            var bodyChunks = [];
            var burndown = http.get(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
              
                // Buffer the body entirely for processing as a whole.
                res.on('data', function(chunk) {
                  // You can process streamed parts here...
                  bodyChunks.push(chunk);
                }).on('end', function() {
                  var body = Buffer.concat(bodyChunks);
                  console.log('BODY: ' + body);
                  // ...and/or process the entire body here.
                })
              });
              
              burndown.on('error', function(e) {
                console.log('ERROR: ' + e.message);
              });

        }
        const response = {
          response_type: 'ephemeral',
          text: 'Hello World:parrot:',
        }
        return res.json(response);
    } catch (err) {
        log.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });
app.listen(process.env.PORT || 3000);
