const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require('./routes/todos');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.send('Hi there');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});