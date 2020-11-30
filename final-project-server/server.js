'use strict'
// use strict forces variable declaration before use

// to use the express framework, must do npm install express
const express = require('express')
const app = express()

// Install CORS to respond to requests from pages not served by this server
// requires: npm install cors
const cors = require('cors')
app.use(cors())

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// path module is built-in, part of basic node, no need to install
// const path = require('path')

// serve static html/css/js files, images etc..
// good old web site files
// in folder public_html
app.use(express.static('public_html'))

//* * ROUTES ************************************************************/
// this is the home page localhost:8000
// if there is a file index.html in a static folder, it is index.html
// that will be served, not this path
app.get('/', function (req, res) {
    res.writeHead(200)// optional because 200 is the default response code
    res.end('<h1>Welcome to offices microservice API</h1>')
})

// SELECT ALL - GET
app.get('/tracks', (req, res) => {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from track',
        function (tracks) {
            if (tracks.rowCount > 0) {
                const officesJSON = { msg: 'OK', tracks: tracks.rows }
                const officesJSONString = JSON.stringify(officesJSON, null, 4)
                // set content type
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                res.end(officesJSONString)
            } else {
                // set content type
                const tracksJSON = { msg: 'Table empty, no track found' }
                const tracksJSONString = JSON.stringify(tracksJSON, null, 4)
                res.writeHead(404, { 'Content-Type': 'application/json' })
                // send out a string
                res.end(tracksJSONString)
            }

            DB.disconnect()
        }
    )
})

// DELETE
app.delete('/tracks/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()

    DB.queryParams('DELETE FROM track WHERE id=$1', [id], function (tracks) {
        const tracksJSON = { msg: 'OK track deleted' }
        const tracksJSONString = JSON.stringify(tracksJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(tracksJSONString)
        DB.disconnect()
    })
})

// INSERT - POST
app.post('/tracks',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const id = request.body.id
        const playlistid = request.body.playlistid
        const title = request.body.title
        const uri = request.body.uri
        const masterid = request.body.masterid

        const DB = require('./src/dao')
        DB.connect()

        DB.queryParams('INSERT INTO track VALUES ($1,$2,$3,$4,$5)',
            [id, playlistid, title, uri, masterid], function (tracks) {
                const tracksJSON = { msg: 'OK track added' }
                const tracksJSONString = JSON.stringify(tracksJSON, null, 4)
                // set content type
                response.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                response.end(tracksJSONString)
                DB.disconnect()
            })
    }
)

// go to http://localhost:8000
// listen to port 8000, the default is 80
app.listen(8000, function () {
    console.log('server listening to port 8000')
})
