'use strict'

console.log('NodeJs Interpreter starts executing Javascript code')

// function add (a, b) {
//     return a + b
// }

// const val1 = 2
// const val2 = 6
// const result = add(val1, val2)
// console.log('Hello World')
// console.log('Add function result: ' + result)

// const fs = require('fs')
// function logMsg (msg) {
//     if (!fs.existsSync('log')) {
//         fs.mkdirSync('log')
//         // eslint-disable-next-line no-irregular-whitespace
//         console.log('Directory created: ', 'log')
//     }
//     // eslint-disable-next-line no-undef
//     fs.appendFile('./log/server_log.log', msg + '\n',
//         function (err) {
//             if (err) throw err
//             else {
//                 console.log('ok')
//             }
//         })
// }
// logMsg('Hi How are you?')

// testing myfirstmodule
const myModule = require('./src/myfirstmodule/index.js')
console.log(myModule.myHello())
