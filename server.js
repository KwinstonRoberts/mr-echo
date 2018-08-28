const express = require('express');

app.post('/command/echo', (req, res) => {
    res.send(200);
    res.send({
        "response_type": "in_channel",
        "text": "Hello World."
      });
});
