const express = require('express');
const app = express();
const https = require('https');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://heroku_n0503mt5:hnl3j1m3olr852mmc4br24ceti@ds137812.mlab.com:37812/heroku_n0503mt5";

app.post('/command/echo', async(req, res) => {
    try{
        const slackReqObj = req.body;
        console.log(slackReqObj);
        var url = 'https://www.pivotaltracker.com/services/v5/projects/2182748/iterations?token=' + process.env.pivitolToken;
        var bodyChunks = [];
        var pivitRes = [];
        https.get(url, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
          
            // Buffer the body entirely for processing as a whole.
            res.on('data', function(chunk) {
              // You can process streamed parts here...
              bodyChunks.push(chunk);
            }).on('end', function() {
              pivotRes = Buffer.concat(bodyChunks);
              //console.log('BODY: ' + body);
            }).on('error', function(e) {
                console.log('ERROR: ' + e.message);
            });
        });
          
        console.log(pivotRes);
        const response = {
          response_type: 'ephemeral',
          text: 'There are ' + pivotRes[pivotRes.length-1] + ' stories in pivitol tracker'
        }
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });

    app.post('/command/house', async(req, res) => {
      try{
        console.log(req);
        const response = {
          response_type: 'ephemeral',
          text: ':parrot:Houses:\n' + genHouses()
        }
        return res.status(200).json(response);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });
  function genHouses(){
   houseString = ''
    MongoClient.connect(mongoUrl, function(err, db) {
      if (err) throw err;
      var dbo = db.db("heroku_n0503mt5");

      dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      dbo.collection("houses").find(query).toArray(function(err, result) {
        result.forEach((house)=>{
          houseString += house.name + ': ' + house.points + ' points\n'
        });
      });
    });
  });
} 
app.listen(process.env.PORT || 3000);
