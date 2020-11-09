/* eslint-disable no-irregular-whitespace */
// eslint-disable-next-line no-irregular-whitespace

// eslint-disable-next-line no-undef
function myHello () { // notice the exports keyword was removed
    return 'Hello World'
}

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-irregular-whitespace
// eslint-disable-next-line no-undef
myByeBye = function (a) {
    return 'Bye Bye ' + a
}

const a = 350 // private, not exported
const length = a / 300 // public, see export statement below

// exports statements separate from function and property
// and grouped at the end of the file
// eslint-disable-next-line no-undef
exports.myHello = myHello
// eslint-disable-next-line no-undef
exports.myByeBye = myByeBye

exports.length = length
// We can use a different name for the outside public
exports.L1 = length // outside users can also use L1 to get length property value
