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

const string_to_array = (input) =>{
    return input.split(" ")
}
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
const camelize = (str) =>{
    return str
    .split(/[-_\s]+/)
    .map((word, index)=>{
        if(index == 0){
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("");
}
console.log(camelize("JavaScript Exercises"));

//function to uncamelize a string
const uncamelize = (str, separator) => {
    if(typeof(separator) == "undefined"){
        separator = " ";
    }
    var str = str.replace(/[A-Z]/g, function (letter)
{
    return separator + letter.toLowerCase();
});
return str.replace("/^" + separator + "/",'');
}
console.log(uncamelize("helloWorld"));

//fucntion to repeat a string
const strRepeat = "Ha!";
console.log(strRepeat.repeat(3));

//write a js function that inserts a string in another string at a given position
const str = "we are doing some exercises";
const substr = "JavaScript ";
const pos = 18;
const result = str.slice(0, pos ).concat(substr,str.slice(pos));

console.log(result);

//function that returns humanized numbers
const humanize_format = (num) =>{
    if(num == "underfined")return;

if(num % 100>=11 && num % 100<=13)
    return num + "th";
switch(num % 10){
    case 1: return num + "st";
    case 2: return num + "nd";
    case 3: return num + "rd";
}
return nu + "th";
}
console.log(humanize_format(301));

//function to truncate a strign a append "..."
const text_truncate = (str, maxLength)=>{
    if(str.length>maxLength){
        return str.slice(0,maxLength-3)+"!!";
    }
    return str;
}
const str1 = "We are doing JS string exercises";
const truncatedString = text_truncate(str1, 15);
console.log(truncatedString);

//function to chop strings into chunks
const string_chop = (str, size) => {
    if(str == null)return[];
    str = String(str);
    size = ~~size;

    return size > 0 ? str.match(new RegExp('.{1,'+ size + '}', "g")) : [str];
}
console.log(string_chop("w3resource",3));

// function to count occurences of a substring in a string
const count_occurrences = (str, subStr) => {
    return str.split(subStr).length - 1;
}
console.log(count_occurrences("The quick brown fox jumps over the lazy dog", "the"));

const count = (main_str, sub_str) => {
    main_str += "";
    sub_str += "";

    if(sub_str.length <= 0){
        return main_str.length + 1;
    }
    sub_str = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (main_str.match(new RegExp(sub_str, 'gi')) || []).length;
}
console.log(count("The quick brown fox jumped over the lazy dog","the"));

//js function that reverses the binary representation of a number and returns its decimal form
const reverse_binary = (n) =>{
    return parseInt(n.toString(2).split("").reverse().join(""),2);
}

console.log(reverse_binary(100));

//fucntion to pad a string to a specified length

const formatted_string = (pad, usr_str, pad_pos) =>{
    if(usr_str == undefined)return pad;
    if(pad_pos == "l"){
        return (pad + usr_str).slice(-pad.length);
    }
    else{
        return(usr_str + pad).substring(0,pad.length)
    }
}
console.log(formatted_string("0000",123,"l"));