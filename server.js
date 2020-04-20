const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient



app.listen(3000, function() {
    console.log('listening on 3000')
  })

  MongoClient.connect('mongodb+srv://rhoffmann:meme6149TOO@cluster0-ah1ec.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('testserver')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })
  
    app.post('/quotes', (req, res) => {
      console.log(req.body)
    }) 
  })
  .catch(error => console.error(error))



  