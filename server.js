const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://heroku_n0503mt5:hnl3j1m3olr852mmc4br24ceti@ds137812.mlab.com:37812/heroku_n0503mt5";


const stickers = {
  "House of Flying Daggers": ':dagger_knife:',
  "Sierra Sierra Charlie": ':smoking:',
  "Stasis Haven": ':cloud:',
  "District Dynamite": ':bomb:'
};
var text_args;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/command/echo', async (req, res) => {
  try {
    const slackReqObj = req.body;
    console.log(slackReqObj);
    var url = 'https://www.pivotaltracker.com/services/v5/projects/2182748/iterations?token=' + process.env.pivitolToken;
    var bodyChunks = [];
    var pivitRes = [];
    https.get(url, function (res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));

      // Buffer the body entirely for processing as a whole.
      res.on('data', function (chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function () {
        pivotRes = Buffer.concat(bodyChunks);
        //console.log('BODY: ' + body);
      }).on('error', function (e) {
        console.log('ERROR: ' + e.message);
      });
    });

    console.log(pivotRes);
    const response = {
      response_type: 'ephemeral',
      text: 'There are ' + pivotRes[pivotRes.length - 1] + ' stories in pivitol tracker'
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});

app.post('/command/house', (req, res) => {
  try {
    text_args = null;
    var housePromise = new Promise(function (resolve, reject) {
      MongoClient.connect(mongoUrl, function (err, db) {
        var houseString = '';
        if (err) throw err;
        var dbo = db.db("heroku_n0503mt5");
        text_args = req.body.text.split('-');
        console.log(text_args[0]);
        if (text_args[1] && (text_args[1] === 's' || text_args[1] === 'a')) {
          let changePoints = parseInt(text_args[1].split(' ')[1]);
          console.log(changePoints, text_args[0]);
          if (changePoints[0] == '-a') {
            dbo.collection("houses").updateOne({ "name": text_args[0].trim() }, { $inc: { 'points': changePoints } });
            resolve(text_args);
          } else if (changePoints[0] === '-s') {
            dbo.collection("houses").updateOne({ "name": text_args[0].trim() }, { $inc: { 'points': changePoints - (changepoints * 2) } });
            resolve(text_args);
          }
        } else {


          dbo.collection("houses").find({}).sort({points:-1}).toArray(function (err, result) {
            result.forEach((house) => {
              houseString += stickers[house.name] + house.name + ': ' + house.points + ' points\n'

            });

            if (err) throw err;
            console.log(result, houseString);
            db.close();
            resolve([houseString, result]);
          });
        }
      });

    });
    housePromise.then((result) => {
      if (text_args && text_args.constructor === Array && (text_args[1] === "a" || text_args === "s")) {
        response = {
          response_type: result === 'p' ? 'in_channel' : 'ephemeral',
          text: 'points have been modified'
        }
      } else {
        response = {
          response_type: req.body.text && text_args[1] === 'p' ? 'in_channel' : 'ephemeral',
          text: ':parrot:House Tournament:parrot:\n-------------------------------\n' + result[0]
        }
      }
      return res.json(response);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Something blew up. We\'re looking into it.');
  }
});
app.listen(process.env.PORT || 3000);
