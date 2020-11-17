/* eslint-disable no-unused-vars */
/* eslint-disable comma-spacing */
/* eslint-disable no-undef */
/* eslint-disable no-irregular-whitespace */
const express = require('express')
const app = express()
// Install cors to respont to request pages
const cors = require('cors')
app.use(cors())
app.set('view engine', 'ejs')
app.get('/',
    function (request, response) {
        response.send('<h1>Hello World</h1>')
    }
)
app.get('/test-param/:a', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end('<h1>' + request.params.a + '</h1>')
})
//

//
app.use(express.urlencoded())
const path = require('path')
app.get('/chair',
    function (request, response) {
        // __dirname is a superglobal with the absolute path to the server root
        // response.sendFile(__dirname + '\\public_html\\chair_response.html')
        response.sendFile(path.join(__dirname, 'public_html', 'chair_response.html'))
    }
)

app.get('/seasons', (req, res) => {
    const pageData = {}
    pageData.title = 'seasons'
    pageData.description = 'all the seasons'
    pageData.author = 'The blabla.com team'
    const seasons = [
        { id: 1, name: 'winter' },
        { id: 2, name: 'summer' },
        { id: 3, name: 'fall' }
    ]
    pageData.content = '<ul>'
    for (let i = 0; i < seasons.length; i++) {
        pageData.content += '<li>' + seasons[i].name + '</li>'
    }
    pageData.content += '</ul>'
    res.render('master_template', pageData)
})
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.static('public_html'))
// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' }) // 400 bad request
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})

app.get('/customers_list', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        let html = ''
        html += 'Number of customers: ' + customers.rowCount + '<br>'
        html += '<table>'
        for (let i = 0; i < customers.rowCount; i++) {
            html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Customers List-blabla.com'
        pageData.description = 'Customers Number and Name'
        pageData.author = 'The blabla.com team'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
})

const { Client } = require('pg')

const DB = new Client({
    host: 'localhost',
    port: 5432,
    database: 'classicmodels',
    user: 'postgres',
    password: 'postgres'
})

DB.connect((error) => {
    if (error) {
        console.log('ERROR: could not connect to database: ', error.stack)
    } else {
        console.log('OK connected to database')
        // execute query
    }
})

DB.query('SELECT * FROM customers', (error, result) => {
    if (error) {
        // display error
        console.log('ERROR in database query: ' + error.stack)
    } else {
        console.log(result) // the whole thing: all records + all info
        console.log('Number of records returned:' + result.rowCount)
        console.log(result.rows) // only the actual records returned, all records
        console.log(result.rows[0]) // first record only
        console.log(result.fields) // the table column metadatas
    }
})
app.get('/customers_search_form', function (request, response) {
    response.sendFile(path.join(__dirname, 'public_html', 'customer_search_form.html'))
})
app.post('/customer_search_id',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        const id = request.body.id
        const DB = require('./src/dao')
        DB.connect()
        DB.query('SELECT * from customers WHERE customernumber=' + id , function (customers) {
            let html = ''

            if (customers.rowCount === 1) {
                html += 'Customer id: ' + id + '<br>'
                html += 'Customer name: ' + customers.rows[0].customername + '<br>'
                html += 'Contact firstname: ' + customers.rows[0].contactfirstname + '<br>'
                html += 'Contact lastname: ' + customers.rows[0].contactlastname + '<br>'
                html += 'Customer phone: ' + customers.rows[0].phone + '<br>'
                html += 'Address line 1: ' + customers.rows[0].addressline1 + '<br>'
                html += 'Address line 2: ' + customers.rows[0].addressline2 + '<br>'
                html += 'Customer city: ' + customers.rows[0].city + '<br>'
                html += 'Customer state: ' + customers.rows[0].state + '<br>'
                html += 'Customer postalcode: ' + customers.rows[0].postalcode + '<br>'
                html += 'Customer country: ' + customers.rows[0].country + '<br>'
                html += 'Customer salesrepemployeenumber: ' + customers.rows[0].salesrepemployeenumber + '<br>'
                html += 'Customer creditlimit: ' + customers.rows[0].creditlimit + '<br>'
            } else {
                html += 'Customer not found <br>'
            }

            // use the page template of course to display the list
            const pageData = {} // initialize empty object
            pageData.title = 'Customers List-blabla.com'
            pageData.description = 'Customers Number and Name'
            pageData.author = 'The blabla.com team'
            // send out the html table
            pageData.content = html
            response.render('master_template', pageData)
            DB.disconnect()
        })
    }
)

// for AJAX tests, returns the list of customers in a JSON string
app.get('/customers', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers',function (customers) {
        const customersJSON = { customers: customers.rows }
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(customersJSONString)
    })
})

app.get('/employees', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from employees',function (employees) {
        const customersJSON = { employees: employees.rows }
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(customersJSONString)
    })
})

app.delete('/employees/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('DELETE from employees WHERE employeesnumber=$1',[id],function (employees) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK employer deleted')
    })
})

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('DELETE from customers WHERE customernumber=$1',[id],function (customers) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK customer deleted')
    })
})

app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
