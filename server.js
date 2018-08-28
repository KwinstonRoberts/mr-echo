const express = require('express');

app.get('/command/echo', (req, res) => {
    res.send(200);
    res.send({
        "response_type": "ephemeral",
        "text": "Hello World."
      });
});
