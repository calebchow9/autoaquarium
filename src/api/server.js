var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 4000;
mongoose.connect("mongodb+srv://admin:autoaquarium@data.3v9bu.mongodb.net/data?retryWrites=true&w=majority",  { useNewUrlParser: true });

mongoose.connection.on('connected', function () {  
    console.log('MongoDB connected');
}); 

mongoose.connection.on('error',function (err) {  
    console.log('Error connecting to MongoDB: ' + err);
}); 

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./routes/profile.js'));

app.listen(port);
console.log('Server running on port ' + port);