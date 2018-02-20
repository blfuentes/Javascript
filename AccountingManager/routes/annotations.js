var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
    var tmpCollection = getAllAnnotations();
  
    res.render('annotation', { title: 'Annotations', count: tmpCollection.length });
});

// functions
function getAllAnnotations(){
    // var annotations = db.get().collection('annotation');
    var annotations = db.get().collection('annotation');
    annotations.find().toArray(function(err, docs){
        return docs;
    });
}


module.exports = router;