const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello K8!'));
app.listen(port, () => console.log('App running on port ${port}'));

module.exports = app;