// function to check whether a given string is a palindrome

// const isPalindrome = (str) =>{
//     for(let i = 0; i < Math.floor(str.length/2); i++){
//         if(str[i] !== str[str.length - 1 - i]){
//             return false;
//         }
//     }
//     return true;
// }
// const isPalindrome = (str) =>{
//     const len = str.length

//     for(let i=0; i < len/2; i++){
//         if(str[i] !== str[len -1 - i]){
//             return false;
//         }
//     }
//         return true;
// }
// const str1= "madam"
// const str2= "Was it a car or a cat I saw"
// const str3= "Hello world"

// console.log(isPalindrome(str1))
// console.log(isPalindrome(str2))
// console.log(isPalindrome(str3))

const isPalindrome = (str) =>{
    let cstr = str.toLowerCase().replace(/[^a-zA-Z0-9]+/g,'');
    let ccount = 0;

    if (str == "") {
        // console.log("Nothing found!");
        return false;
    }
    if ((ccount.length)% 2 === 0 ){
        ccount = (cstr.length) / 2
    }
    else{
        if(cstr.length == 1){
            // console.log("This is a palindrome")
            return true;
        }
        else{
            ccount = (cstr.length - 1) / 2;
        }
    }
    for(var x = 0; x < ccount; x++){
        if(cstr[x] != cstr.slice(-1-x)[0]){
            // console.log("This is not a palndrome")
            return false;
        }
    }
    // console.log("this is a palindrome")
    return true;
}
console.log(isPalindrome("A man, a plan, a canal, Panama"))
console.log(isPalindrome("Was it a car or a cat I saw"))
console.log(isPalindrome("Hello World"))

//function to reverse a string
const reverseString = (str) => {
    var rString = ""
    for(var i = str.length - 1; i >= 0; i--){
        rString += str[i]
    }
    return rString;
}
console.log(reverseString("Hello you"))

//function to check the longest palendromic substring in a given string
const longestPalindromicSubString = (s) =>{
    let longest = ""
    for(let i = 0; i < s.length; i++){
        for(let j = i + 1; j < s.length; j++){
            let subStr = s.slice(i , j);
        if(isPalindrome(subStr) && subStr.length > longest.length){
            longest = subStr
        }
        }
    }
    return longest
}
console.log(longestPalindromicSubString("babad"))
console.log(longestPalindromicSubString("cbbd"))

//function to check if two strings are anagrams
const areAnagrams = (str1, str2) => {
    str1 = str1.replace(/[^a-zA-Z0-9]/g, "")
    str2 = str2.replace(/[^a-zA-Z0-9]/g, "")
    return str1.split("").sort().join("") === str2.split("").sort().join("")
}
console.log(areAnagrams("listen", "silent"))
console.log(areAnagrams("hello", "world"))

//function to find and remove duplicates from a string
const removeDuplicates = (str) =>{
    let result = ""
    for(let i = 0; i < str.length; i++){
        if(result.indexOf(str[i]) < 0){
            result += str[i]
        }
    }
    return result
}
console.log(removeDuplicates("Programming"))
console.log(removeDuplicates("hello world"))
console.log(removeDuplicates("aaaa"))
console.log(removeDuplicates("abcd"))
console.log(removeDuplicates("aabbcc"))

//function to count palindromes in a string
// const countPalindromes = (str) => {
//     var rex = /[^a-z0-9]/gi;
//     var len = str.length
//     for(let i = 0; i < len/2; i++){
//         if(str[i] !== str[len -1 -i ]){
//             return false
//         }
//     }
//     return true
// }
// console.log(countPalindromes("ababa"))
// console.log(countPalindromes("racecar"))
// console.log(countPalindromes("aabb"))
// console.log(countPalindromes("a"))
// console.log(countPalindromes("abc"))

const countPalindromes = (str) => {
    let count = 0

    for(let i = 0; i < str.length; i++){
        for(let j = i + 1; j <= str.length; j++){
            let substr = str.slice(i, j)
            if(isPalindrome(substr)){
                count++
            }
        }
    }
    return count
}
console.log(countPalindromes("ababa"))
// console.log(countPalindromes("racecar"))
// console.log(countPalindromes("aabb"))
// console.log(countPalindromes("a"))
// console.log(countPalindromes("abc"))

//function to find the longest common prefix amongst an array of strings
const longestCommonPrefix = (strs) => {
    if(strs.length === 0){
        return "";
    }
    let prefix = strs[0]
    for(let i = 1; i < strs.length; i++){
        while(strs[i].indexOf(prefix) !== 0){
            prefix = prefix.substring(0, prefix.length - 1)
        }
    }
    return prefix
}
console.log(longestCommonPrefix(["flower", "flow", "flight"]))

//case insensitive palindrome
const isCaseInsensitivePalindrome = (str) => {
    str = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    return str === str.split("").reverse().join("")
}
console.log(isCaseInsensitivePalindrome("Aba"))
console.log(isCaseInsensitivePalindrome("Hello"))