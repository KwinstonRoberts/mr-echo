const app = require('express');
const router = new app.Router();
router.post('/command/echo', async(req, res) => {
    try{
        const slackReqObj = req.body;
        const response = {
          response_type: 'ephemeral',
          text: 'Hello World:slightly_smiling_face:',
        }
        return res.json(response);
    } catch (err) {
        log.error(err);
        return res.status(500).send('Something blew up. We\'re looking into it.');
      }
    });
server.listen(port);
