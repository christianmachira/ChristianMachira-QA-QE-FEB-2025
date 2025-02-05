##Declaring Variable
1. let age = 25
2. const schoolName = "Greenwood High"
3. const studentsList = []
4. let in JS lets you declare mutable, or changeable variables while const is used for immutable variables and var is the old way for declaring variables

##Naming Conventions
5. "let 1stPlace = "John";" is an invalid naming convention because it starts with a number.
6. the variable is wrong because it starts with a "#" which is invalid
7. let myVariableName = "JavaScript";

##Identifying Data Types
8. console.log(typeof "Hello"); => string
    console.log(typeof 99); => number/integer
    console.log(typeof true); => boolean
    console.log(typeof undefined); => undefined
9. Kenya => string, 34 => number, false=> boolean,         {country: USA} => object, null=> null
10. a Bigint is a number with a "n" at the end of it. eg   const networth = 10000000000000n

##Objects & Arrays
11. const person = {name, age, city};
12. person.email = "";
13. const fruits = ["apple", "banana", "orange"];
14. fruits[1];

##Type Coercion
15. console.log ("5"+ 2); => 52
    console.log ("5" - 2); => 3
16. const myString = "100";
    Number(myString);
17. const myNumber = 50;
    let myString = toString(myNumber);
18. console.log(5 + true); => 6