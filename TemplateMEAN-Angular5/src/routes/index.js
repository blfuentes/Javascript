var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.getCollection('test', function(items){
        res.json(items);
    });
    // res.send('index');
    // res.render('index');
});

module.exports = router;
