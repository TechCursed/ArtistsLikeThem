const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const https = require('https')
const { ALL } = require('dns')
require('dotenv').config()


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const port = process.env.PORT || 3030
let arr = []
let links = []

app.get('/', (req,res) => {
        while(arr.length > 0) {
        arr.pop();
    }

    while(links.length > 0) {
        links.pop();
    }

        res.render('home')
})

app.get('/results', (req,res) => {
    res.render('results', {arr: arr, links:links, artistName: artistName})
  })

app.post('/results', (req,res) => {

    while(arr.length > 0) {
        arr.pop();
    }

    while(links.length > 0) {
        links.pop();
    }

    let api = process.env.API_KEY
    artistName = req.body.searchInput
    let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${api}&format=json`
    
    https.get(url, function (response) { 

        let chunks="";
        let res
        response.on("data", function (chunk) {
            chunks+=chunk;
        });
        response.on("end", function(){

            res = JSON.parse(chunks);

            for(let i=0; i<30; i++)
            {
                arr.push(res.similarartists.artist[i].name)
                links.push(res.similarartists.artist[i].url)
            }
           arr.toString
        });
        
});
  res.redirect('/results')
 })


app.listen(port, function(){
    console.log("running at "+port)
})
