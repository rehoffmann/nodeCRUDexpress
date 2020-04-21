const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient


app.set('view engine', 'ejs')
app.listen(3000, function() {
    console.log('listening on 3000')
  })

  MongoClient.connect('mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('testserver')
    const testCollection = db.collection('test')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      db.collection('test').find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs', {test:results})
      })
      .catch(error => console.error(error))
      
    })
  
    app.post('/quotes', (req, res) => {
        testCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
  })
  .catch(error => console.error(error))



  