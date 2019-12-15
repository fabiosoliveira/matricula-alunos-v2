const _ = require('lodash')

// M
var fruitsOriginal = ["M"];
var fruitsChanged = ["M","B"]

// addFruit "C"
// removeFruit "M"

let addFruit, removeFruit

addFruit = fruitsChanged.filter(fruit => !fruitsOriginal.includes(fruit))

console.log('addFruit: ', addFruit)
console.log(_.difference(fruitsChanged, fruitsOriginal))

removeFruit = fruitsOriginal.filter(fruit => !fruitsChanged.includes(fruit))

console.log('removeFruit: ', removeFruit)
console.log(_.difference(fruitsOriginal, fruitsChanged))