const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'accountingmanager';
// const dbName = 'nodetest1';

// Database Collection
const collectionName = 'annotation';
// const collectionName = 'usercollection';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    assert.equal(null, err);
    const db = client.db(dbName);
    // const collection  = client.db(dbName).collection(collectionName);
    // const collection2 = client.db(dbName).collection('annotation');
    const collection = db.collection(collectionName);
    const collection2 = db.collection('annotation');
    collection.find({}).toArray(function(err, items) {
        assert.equal(null, err);
        assert.equal(3, items.length);
        console.log('first element: '+ items[0].name);

        // client.close();
    });

    collection2.find({}).toArray(function(err, items) {
        assert.equal(null, err);
        assert.equal(3, items.length);
        console.log('second element: '+ items[1].name);
        // client.close();
    });

    // collection.insertOne({name:"test", type: 2, date: new Date(), amount: 10}, function(err, r){
    //     client.close();
    // });

    // createCapped(db, function() {
    //     var collection2 = db.collection("myCollection");
    //     // db.collection('myCollection').insertOne({myid:1}, function(err, r) {
    //     //     assert.equal(null, err);
    //     //     // assert.equal(1, r.insertedCount);
    //     //     console.log('first element: '+db.collection('myCollection').findOne().myid);
    //     //     client.close();
    //     // });
    //     collection2.insertOne({myid:2}, function(err, r) {
    //         assert.equal(null, err);
    //         // assert.equal(2, r.insertedCount);
    //         console.log('first element: '+collection2.findOne().myid);
    //         client.close();
    //     });
    //   });
});

// function createCapped(db, callback) {
//     db.createCollection("myCollection", { "capped": true, "size": 100000, "max": 5000},
//       function(err, results) {
//         console.log("Collection created.");
//         callback();
//       }
//     );
// };

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
