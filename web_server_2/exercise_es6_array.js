const USER_ARRAY = [
    { id: 1, name: 'Martin', age: 45 },
    { id: 2, name: 'Pierre', age: 15 },
    { id: 3, name: 'Josee', age: 14 },
    { id: 4, name: 'Melanie', age: 32 },
    { id: 5, name: 'Sonia', age: 24 }
]

// Q1
// const NEW_USER_ARRAY = USER_ARRAY.map(USER_ARRAY => {
//     delete USER_ARRAY.age
//     return USER_ARRAY
// })

// console.log(NEW_USER_ARRAY)

// Q2
const NEW_USER_ARRAY = USER_ARRAY.filter(function (e) {
    return e.age > 15
})

console.log(NEW_USER_ARRAY)

// Q3
function avgAge (total, oneUser) {
    return total + oneUser.age
}
let q3Answer = USER_ARRAY.reduce(avgAge, 0)
q3Answer = q3Answer / USER_ARRAY.length
console.log(q3Answer)
