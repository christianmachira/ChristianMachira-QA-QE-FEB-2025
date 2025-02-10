let salary = 90000;
console.log(salary++)
console.log(salary)

let salary_1 = 90000
console.log(++salary_1)

let num = 9
console.log(num--)
console.log(num)

let num1 = 9
console.log(--num1)
console.log(num1)
console.log(Math.PI * num1)
console.log(Math.sqrt(num1))

let nums = [1,2,3,4,5]
// nums.foreach((num)=> console.log(Math.max(num)))
console.log(Math.max(...nums)) //returns maximum numbers
console.log(Math.min(...nums)) //returns the minimum number

console.log(Math.floor(6.9)) //rounds down to the nearest integer
console.log(Math.ceil(6.1)) //rounds up to the nearest integer
console.log(Math.round(6.9)) //rounds to the nearest integer