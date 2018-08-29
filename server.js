const app = require('express');
const router = new app.Router();
router.post('/command/echo', async(req, res) => {
    console.log(req)
    try{
        const slackReqObj = req.body;
        const response = {
          response_type: 'ephemeral',
          text: 'Hello World:parrot-dance:',
        }
        return res.status(200).json(response);
    } catch (err) {
        log.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });
server.listen(port);
