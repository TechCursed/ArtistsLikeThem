const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const http = require('http')

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
    let url = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=dd8013a2d0275a318511e02e3a3e2e4f&format=json`
    
    http.get(url, function(response){

        response.on('data', function(data){
            const apiData =  JSON.parse(data)
            const name = apiData.similarartists.artist[1].name
            console.log(name)
        })
    })
    res.redirect('/')
 })


app.listen(3030, function(){
    console.log("running at 3030")
})
