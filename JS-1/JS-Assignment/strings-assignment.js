// a function to check whether an input is a string or not
const is_string =(input)=>{
    return typeof input === "string"
}
console.log(is_string("Christian")) //true
console.log(is_string(1,2,3,4))

//function to check whether a string is blank or not

const is_blank = (input)=>{
    return input.trim()  === ""
}
console.log(is_blank("")) 

//function to split a string and convert it into an array of words

const string_to_array = (input =>{
    return input.split(" ")
})
console.log(string_to_array("JS is confusing 🫤"))

//function to extract a specified number of characters from a string
const truncate_string = (input,number)=>{
    return input.slice(0,number)
}
console.log(truncate_string("I am a really good developer", 10))

//function to convert a string into abbreviated form
const abbrev_name = (input)=>{
    const name=input.split(" ")
    console.log(name)
    return `${name[0]} ${name[1][0]}.`
}
console.log(abbrev_name("Christian Machira"))

//function to hide email address to prevent unauthorised access
const protect_email = (input) =>{
    const email = input.split("@")
    console.log(email)
    return `${email[0].substring(0,3)}...@${email[1]}`
}
console.log(protect_email("christianmachira@gmail.com"))

//function to parameterize a string
const string_parameterize = (input)=>{
    return input.toLowerCase().split(" ").join("-")
}
console.log(string_parameterize("I am a Christian Machira"))

//function to capitalize the first letter of a string
const capitalize = (input)=>{
    return input.charAt(0).toUpperCase() + input.slice(1)
}
console.log(capitalize("js string exercises"))

//function to capitalize the first letter of each word in a string
const capitalize_words = (input) =>{
    return input.split(" ").map(capitalize).join(" ");
};
console.log(capitalize_words("js string exercises"))

//function to swap case
const swapcase = (input)=>{
    return input.split("").map((char)=>{
        return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    }).join("")
}  
console.log(swapcase("AaBbc"))

//function to convert a string to camel case
