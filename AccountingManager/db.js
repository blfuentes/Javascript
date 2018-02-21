var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
    name: null,
    _embeddedDb: null
}

exports.connect = function(url, databasename, done){
    if(state.db) return done();

    MongoClient.connect(url, function(err, db){
        if(err) return done(err);
        
        state.db = db;
        state.name = databasename;

        state._embeddedDb = state.db.db(databasename);

        done();
    });
}

exports.get = function(){
    return state.db;
}

exports.close = function(done){
    if (state.db){
        state.db.close(function(err, result){
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}

exports.getCollection = function(collectionName){
    if(state.db){
        return state._embeddedDb.collection(collectionName);
    }
}