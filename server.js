const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();
const connectionString = 'mongodb+srv://meepmeep:ESgw1aiyVNPUUrJr@starwars.hfrvd.mongodb.net/starWarsQuotes?retryWrites=true&w=majority'


// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
	// All your handlers here...
//app.get('/', (req, res) => {/*...*/})
//app.post('/quotes', (req, res) => {/*...*/})


// Use JS Promise to connect to MongoDB
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('starWarsQuotes')
    const quotesCollection = db.collection('quotes')
    
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
    
    app.set('view engine', 'ejs')
    /*  app.get('/', (req, res) => {
        const cursor = db.collection('quotes').find()
        console.log(cursor)
        // ...
      })
    
   
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            console.log(results)
          })
          .catch(error => console.error(error))
      })
    */
      app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch(/* ... */)
      })


    app.post('/quotes', (req, res) => {
        console.log('Hellooooooooooooooooo!')
      })

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

})




.catch(console.error)
