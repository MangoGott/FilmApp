const express = require('express')
const MongoClient    = require('mongodb').MongoClient;
const assert         = require('assert');
const bodyParser     = require('body-parser');
const cors 	     = require('cors');
const db             = require('./config/db');

const corsOptions = {
    origin: "*",
};
// Create the server
const app = express();

app.use(cors(corsOptions));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const url = db.url;
const dbName = 'baloobaDB';
const collectionName = 'users';

//Fetch with get
app.get('/api/login/:user', cors(), (req, res)=>{
    console.log('does this happen 1')
    let userName = req.params.user;
    login(userName, (result)=>{
        res.json({result});
    });

})

//Fetch with post and a RAW json body
app.post('/api/update/:user', cors(), (req, res) => {
    console.log('does this happen 2')
    var content = req.body;
    findAndReplace({"user": req.params.user}, content, (success) => {
        res.send(success);
    });
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})

let insertInCollection = function(doc, callback){
    MongoClient.connect(url,function(err, client){
        assert.equal(null,err);
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        collection.insertOne(doc, (err, res) => {
            assert.equal(err,null);
            callback(res.ops);
        });
        client.close();
    });
};

let existsInCollection = function(doc, callback){
    MongoClient.connect(url, function(err, client){
        assert.equal(null,err);
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        collection.find(doc).toArray(function(err, docs){
            assert.equal(err, null);
            callback(docs.length > 0 ? true : false);
        });
        client.close();
    });
};

let login = function(userName, callback){
    findUser(userName, (user) => {
        console.log("HEY");
        user === null ?
            insertInCollection({user: userName, movieLists: [], allMovies : [], genres: genreList, favouriteGenre: []}, (res) => {
                //console.log(res[0].genres); To get genres
                callback(res[0]);
            }) :
            callback(user);
    });
};

let findAndReplace = function(from, to, callback){
    MongoClient.connect(url, function(err, client){
        assert.equal(null,err);
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        console.log("from",from);
        console.log("to", to);
        collection.findOneAndReplace(from, to, {upsert: true}, function(err, results){
            assert.equal(err, null);
            callback(true);
        });
        client.close();
    });
};

let findUser = function(userName, callback){
    MongoClient.connect(url, function(err, client){
        assert.equal(null,err);
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        collection.findOne({user: userName}, (err, res) => {
            assert.equal(err, null);
            callback(res);
        });
        client.close();
    });
};

let genreList = [
    {
        "id": 28,
        "name": "Action",
        "amount": 0
    },
    {
        "id": 12,
        "name": "Adventure",
        "amount": 0
    },
    {
        "id": 16,
        "name": "Animation",
        "amount": 0
    },
    {
        "id": 35,
        "name": "Comedy",
        "amount": 0
    },
    {
        "id": 80,
        "name": "Crime",
        "amount": 0
    },
    {
        "id": 99,
        "name": "Documentary",
        "amount": 0
    },
    {
        "id": 18,
        "name": "Drama",
        "amount": 0
    },
    {
        "id": 10751,
        "name": "Family",
        "amount": 0
    },
    {
        "id": 14,
        "name": "Fantasy",
        "amount": 0
    },
    {
        "id": 36,
        "name": "History",
        "amount": 0
    },
    {
        "id": 27,
        "name": "Horror",
        "amount": 0
    },
    {
        "id": 10402,
        "name": "Music",
        "amount": 0
    },
    {
        "id": 9648,
        "name": "Mystery",
        "amount": 0
    },
    {
        "id": 10749,
        "name": "Romance",
        "amount": 0
    },
    {
        "id": 878,
        "name": "Science Fiction",
        "amount": 0
    },
    {
        "id": 10770,
        "name": "TV Movie",
        "amount": 0
    },
    {
        "id": 53,
        "name": "Thriller",
        "amount": 0
    },
    {
        "id": 10752,
        "name": "War",
        "amount": 0
    },
    {
        "id": 37,
        "name": "Western",
        "amount": 0
    }
];