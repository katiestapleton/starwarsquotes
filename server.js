const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();
const connectionString = 'mongodb+srv://meepmeep:ESgw1aiyVNPUUrJr@starwars.hfrvd.mongodb.net/starWarsQuotes?retryWrites=true&w=majority'


	
	// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
	
	// All your handlers here...
app.get('/', (req, res) => {/*...*/})
app.post('/quotes', (req, res) => {/*...*/})
-------------------------------------




// Use JS Promise to connect to MongoDB
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('starWarsQuotes')
    const quotesCollection = db.collection('quotes')

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

})




.catch(console.error)
