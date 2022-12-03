const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const https = require('https')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

let arr = []

app.get('/', (req,res) => {
  res.render('home', {arr: arr})
  console.log(arr)
})

// app.post('/home', (req,res) => {
//    artistName = req.body.searchInput
//    arr.push(artistName)
//    res.redirect('/')
// })

app.post('/home', (req,res) => {
    artistName = req.body.searchInput
    let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=dd8013a2d0275a318511e02e3a3e2e4f&format=json`
    

    https.get(url, function (response) { 

        let chunks="";
        response.on("data", function (chunk) {
            chunks+=chunk;
        });
        response.on("end", function(){
            // console.log("API Data recieved");

            let res = JSON.parse(chunks);
            //console.log(res.similarartists.artist[6].name)
            // code after parse string into JSON format
            for(let i=0; i<10; i++)
            {
               // console.log(res.similarartists.artist[i].name)
                arr.push(res.similarartists.artist[i].name)
            }
           // console.log(arr)
        });

});

    res.redirect('/')
 })


app.listen(3030, function(){
    console.log("running at 3030")
})
