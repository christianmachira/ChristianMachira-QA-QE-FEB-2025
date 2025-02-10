// let actualPassword = "pa$$w0rd";
// let myInputPassword;
// do {
//   let passwordInputValue = prompt("Enter a password");
//   myInputPassword = passwordInputValue;
// } while (myInputPassword !== actualPassword);

const marks = [12, 34, 45, 56, 78, 79];
console.log('The length of the array is ', marks.length);

for (let index = 0; index < marks.length; index++) {
  console.log(marks[index]); // Outputs all values in the marks array
  if (index >= 5) {
    console.log('The program will break if index is greater or equal to 5');
    break; // Exits the loop if index is 5 or more
  }
}
const person = {
    name: "GUVI",
    age: 10,
    city: "Chennai, Tamil Nadu"
  };
  
  for (let key in person) {
    console.log(`${key}: ${person[key]}`);
  }
const languages = ["JavaScript", "Python", "HTML"];

for (let lang of languages) {
  console.log(lang); // Outputs each language in the array
}