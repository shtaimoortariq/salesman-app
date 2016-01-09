/**
 * Created by Taimoor tariq on 1/1/2016.
 */

var express = require("express");
var path = require("path");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var SALT_WORK_FACTOR = 10;
app.use(morgan("short"));

mongoose.connect('mongodb://localhost/salesman');

var SalesSchema = new mongoose.Schema({

    fName: String,
    lName: String,
    email: String,
    pass: String,
    phone: Number,
    address: String,
    updated_at: {type: Date, default: Date.now}

});


SalesSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pass')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.pass, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.pass = hash;
            next();
        });
    });
});


var SalesMan = mongoose.model('SalesMan', SalesSchema);

var dirPath = path.resolve(__dirname, "client");
app.use(express.static(dirPath));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(dirPath + "/index.html");
});

app.post("/signup", function (req, res) {

    var salesman = new SalesMan({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        pass: req.body.pass,
        phone: req.body.phone,
        address: req.body.address

    });

    salesman.save(function (err) {
        if (err)
            console.log(err);
        else
            console.log(salesman);
    });

    res.send(req.body);

});


app.post("/login", function (req, res) {

    var query = {email: req.body.email};

    SalesMan.findOne(query, function (err, doc) {
        if (doc) {
            console.log("True User");
            console.log(doc);
            res.send(doc);
        }

        else {

            console.log("False User");
            console.log(err);
            res.send(err);
        }
    });

});

app.listen(3000, function () {
    console.log("App started on port 3000");
});