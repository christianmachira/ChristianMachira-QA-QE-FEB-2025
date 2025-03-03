// function getUsername(username: string | null) {
//   if (username !== null) {
//     return `User: ${username}`;
//   } else {
//     return "Guest";
//   }
// }
// const result = getUsername("Alice");
// console.log(result);
// const result2 = getUsername(null);
// console.log(result2);

// type Direction = "up" | "down" | "left" | "right";
function move(direction: "up" | "down" | "left" | "right", distance: number) {
    // Move the specified distance in the given direction
  }
move("up", 10); // OK
move("down", 10); // OK

function validateUsername(username:string | null): boolean{
    if(username === null){
        return false
    }
    if(username.length > 5){
        return true
    }
    return false
}
validateUsername("Christian") //true
validateUsername("Ben") //false
validateUsername(null) //false

//checking type of element
const appElement = document.getElementById("app");
if(!appElement){
    throw new Error("Element not found");
}
console.log(appElement);

type APIResponse =
  | {
      data: {
        id: string
      }
    }
  | {
      error: string
    }

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?

  if ('data' in response) {
    return response.data.id
  } else {
    throw new Error(response.error)
  }
}