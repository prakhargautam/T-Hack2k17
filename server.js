const express= require('express');
const bodyParser= require('body-parser')
const app= express();
const MongoClient= require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

app.use("/styles",express.static(__dirname + "/styles"));

var db 

MongoClient.connect('mongodb://prakhar:mongo123@ds149329.mlab.com:49329/thack2k17', (err, database) => {
    if(err) return console.log(err)
    db= database
    app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', function(req, res){
    db.collection('quotes').find().toArray((err, result) => {
        if(err) return console.log(err)
        res.render(__dirname + '/index.ejs', {quotes: result})
    })
})

//app.post('/quotes', (req, res) => {
//    db.collection('quotes').save(req.body, (err, result) => {
//    if(err) return console.log(err)
//    
//    console.log('saved to database')
//    res.redirect('/')
//    })
//})