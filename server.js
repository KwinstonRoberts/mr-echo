const express = require('express');
const app = express();
const https = require('https');

app.post('/command/echo', async(req, res) => {
    try{
        const slackReqObj = req.body;
        console.log(slackReqObj);
        var url = 'https://www.pivotaltracker.com/services/v5/projects/2182748/iterations?token=' + process.env.pivitolToken;
        var bodyChunks = [];
        var tickets = https.get(url, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
          
            // Buffer the body entirely for processing as a whole.
            res.on('data', function(chunk) {
              // You can process streamed parts here...
              bodyChunks.push(chunk);
            }).on('end', function() {
              var body = Buffer.concat(bodyChunks);
              console.log('BODY: ' + body);
              return res.json;
            }).on('error', function(e) {
                console.log('ERROR: ' + e.message);
            });
        });
          
    
        const response = {
          response_type: 'ephemeral',
          text: 'Hello World:parrot:\n there are ' + tickets + ' stories in pivitol tracker'
        }
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });

    app.post('/command/thread', async(req, res) => {
        console.log(req);
        try{
           
        } catch (err) {
            console.error(err);
            return res.status(500).send('Something blew up. We\'re looking into it.');
          }
        });
app.listen(process.env.PORT || 3000);
