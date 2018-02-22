const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/';

// Database Name
// const dbName = 'accountingmanager';
const dbName = 'nodetest1';

// Database Collection
// const collection = 'annotation';
const collectionName = 'usercollection';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log('first element: '+collection.find()[0]);

    createCapped(db, function() {
        var collection2 = db.collection("myCollection");
        // db.collection('myCollection').insertOne({myid:1}, function(err, r) {
        //     assert.equal(null, err);
        //     // assert.equal(1, r.insertedCount);
        //     console.log('first element: '+db.collection('myCollection').findOne().myid);
        //     client.close();
        // });
        collection2.insertOne({myid:2}, function(err, r) {
            assert.equal(null, err);
            // assert.equal(2, r.insertedCount);
            console.log('first element: '+collection2.findOne().myid);
            client.close();
        });
      });
});

function createCapped(db, callback) {
    db.createCollection("myCollection", { "capped": true, "size": 100000, "max": 5000},
      function(err, results) {
        console.log("Collection created.");
        callback();
      }
    );
};

// mongoose !!! THIS WORKS!
///////////////////////////////////////////////////////////////////////////
// var mongoose = require('mongoose');
// mongoose.connect(url+dbName);

// var connection = mongoose.connection;
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function(){
//     connection.db.collection("annotation", function(err, collection){
//         collection.find({}).toArray(function(err, data){
//             console.log(data); // it will print your collection data
//         })
//     });
// });
///////////////////////////////////////////////////////////////////////////