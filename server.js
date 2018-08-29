const app = require('express');

app.post('/command/echo', (req, res) => {
    res.send(200);
    res.send({
        "text": "Hello World."
      });
});
