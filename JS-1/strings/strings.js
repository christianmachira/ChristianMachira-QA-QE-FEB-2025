const { CLIENT_IGNORE_SIGPIPE } = require("mysql/lib/protocol/constants/client")

const myName = ""//empty string;
const myBook = "intro to JS"
const myFirstName = "Christian"
const myLastName = "Machira"

console.log(myFirstName.concat(" " + myLastName))//adding a space to a concatenated string in ES5
console.log(myFirstName.concat(` ${myLastName}`)) //concat using ES6 template literals

const lname ="Wairuhi Machira"
console.log(lname.indexOf("M")) //finding the index
console.log(lname.includes("Machira")) //true
console.log(lname.includes("Christian")) //false
console.log("CHRISTIAN".toLowerCase()) //lowercase
console.log("christian".toUpperCase())

console.log(lname.split("")) //splitting the string into an array
console.log(lname.split(" ")) //splitting the string into an array
console.log(lname.split("").reverse()) //splitting the string into an array of characters and reversing it
console.log(lname.split(" ").reverse()) //splitting the string into an array and reversing it

let sentence = "I am a good boy" //i am a g
console.log(sentence.substring(0 ,8)) //returns or extracts a substring from the start index to the end index minus 1 eg(0, 8) will return string 0 -7

console.log(sentence.substr(8 ,5)) //substr(startingIndex, numberOfCharacters)
console.log(sentence.substr(2 ,8))

let sent = "          i am a good man"
console.log(sent.trim(0))// removes white spaces
console.log(sent.trimStart()) //removes white spaces from the beginning

let sent1="i am a good man.     "
console.log(sent1.trimEnd()) //removes whitespaces from the end

    
