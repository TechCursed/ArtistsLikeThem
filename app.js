const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const https = require('https')
const { ALL } = require('dns')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

let arr = []
let links = []
//let apiData = []

app.get('/', (req,res) => {
        res.render('home')
        //console.log(apiData)
})

app.get('/results', (req,res) => {
    res.render('results', {arr: arr, links:links})
  })

// app.post('/home', (req,res) => {
//    artistName = req.body.searchInput
//    arr.push(artistName)
//    res.redirect('/')
// })

app.post('/results', (req,res) => {
    artistName = req.body.searchInput
    let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=dd8013a2d0275a318511e02e3a3e2e4f&format=json`
    
    https.get(url, function (response) { 

        let chunks="";
        let res
        response.on("data", function (chunk) {
            chunks+=chunk;
        });
        response.on("end", function(){
            // console.log("API Data recieved");

            res = JSON.parse(chunks);
            //console.log(res.similarartists.artist[6].name)
            // code after parse string into JSON format
            // const len = res.similarartists.artist.name.length

            for(let i=0; i<10; i++)
            {
                arr.push(res.similarartists.artist[i].name)
                links.push(res.similarartists.artist[i].url)
            }

           arr.toString
           //apiData.push(arr)
           //console.log("len is : " +len)
           //console.log(apiData)

        });
        
        //apiData.push(arr)
});
  res.redirect('/results')
 })


app.listen(3030, function(){
    console.log("running at 3030")
})
