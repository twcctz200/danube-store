const path = require('path')
const fs = require('fs')
const express = require('express')
var cors = require('cors')
// const history = require('connect-history-api-fallback')

const app = express()
const port = process.env.PORT || 5000

// app.use(history())

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/vue/dist'))
app.get(/.*/), (req,res) => res.sendFile(__dirname + '/vue/dist/index.html')

app.get('/books', (req, res) => {
    const rawData = fs.readFileSync('books.json')
    const books = JSON.parse(rawData)
    console.log(books)
    res.status('200').json(books)
})

app.get('*', (req, res) => {
    res.status('404').json({
        message: 'Page not found.',
        name: 'Danube'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))