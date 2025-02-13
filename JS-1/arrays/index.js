const siz = ["chris","james","jimmy","joe","john"];
console.log(siz.splice(1,0,'thomas','timmy')); //will add, at index one which is James, for thomas and timmy
console.log(siz);

console.log(siz.splice(1,2,'sarah','susan'))//will replace. at index 1 and 2, which is thomas and timmy, with sarah and susan
console.log(siz)

console.log(siz.splice(1))//;will remove all elements from index 1 to the end
console.log(siz)

//foEach method is used to loop through array elements and execute functions on each individual element without creating a new array. it has no return value
let classMates = ["ben","james","jimmy","joe","john"];
classMates.forEach(function(classMate){
    console.log(`${classMate} is studying JavaScript`)
})
let total = 0;
let marks = [23, 45, 56, 67, 78, 90];
let size = marks.length;

marks.forEach((mark) => {
    total += mark;
    console.log(`Your average mark is ${total / size}`);
});
//filter method is used to create a new array from an existing array. it has a return value. the new array is created after if passes the test impelemented by the callback function
const availableFoods = [
    { id: "qwe234dfh", name: "Burger", image: "🍔🍔", price: 234 },
    { id: "qwe2356dxh", name: "Pizza", image: "🍕🍕", price: 400 },
    { id: "qwe2456yh", name: "Meat", image: "🍖🍖", price: 500 },
    { id: "qwe2785yh", name: "Chicken", image: "🍗🍗", price: 1200 },
];

const filteredPrices = availableFoods.filter(function (filteredFoodObj) {
    return filteredFoodObj.price > 450;
});

console.log(filteredPrices);
console.log(availableFoods.filter(function(food){
    return food
}))

//map method is used to create a new array from an existing array. it has a return value. the new array is created after the callback function is executed on each element of the existing array. it is immutable since it doesn't modify the existing array
let runners = ["Kiplimo", "Kipchumba", "Koskei"];
let newRunnerMsg = runners.map(function (runner) {
  return `${runner} runs a 100 meters`;
});
console.log(runners)
console.log(newRunnerMsg);

const initialFoodPrices = [
    { image: "🍕", name: "pizza", price: 1000 },
    { image: "🍔", name: "burger", price: 800 },
    { image: "🥪", name: "sandwich", price: 600 },
  ];
  
  initialFoodPrices.map((foodObj) => {
      console.log(foodObj.image);
      console.log(foodObj.name)
      console.log(foodObj.price)
  });

//reduce method is used to reduce an array to a single value. it has a return value. the return value is the accumulated value of the callback function executed on each element of the array. the accumulated value is stored in the accumulator. useful for accumulating values in an array
  const reducedVals = [1, 2, 3, 4, 5, 6].reduce((prev, next) => {
    console.log(`prev: ${prev} next: ${next}`);
    return prev + next;
});

console.log(reducedVals);  // 21
const myDinner = [
    { image: "🍕", name: "pizza", price: 1000 },
    { image: "🍔", name: "burger", price: 800 },
    { image: "🥪", name: "sandwich", price: 600 },
];

// Extract prices using map
const totalArray = myDinner.map(foodObj => foodObj.price);
console.log(totalArray);  // [1000, 800, 600]

// Calculate total bill using reduce
const totalBil = totalArray.reduce((prev, next) => prev + next);
console.log(totalBil);  // 2400
const totalBill2 = myDinner
                    .map(foodObj => foodObj.price)
                    .reduce((prev, next) => prev + next);

console.log(`My total bill is: ${totalBill2}`);  // My total bill is: 2400