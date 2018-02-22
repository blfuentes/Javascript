const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'accountingmanager';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
    // Create a collection we want to drop later
    const col = client.db(dbName).collection('annotation');
    // Show that duplicate records got dropped
    col.find({}).toArray(function(err, items) {
        test.equal(null, err);
        test.equal(3, items.length);
        console.log('first element: ' + items[0].name)
        client.close();
    });
});