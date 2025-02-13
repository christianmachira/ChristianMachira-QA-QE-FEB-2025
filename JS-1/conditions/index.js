let mark = 0
let grade = ""
function marks (mark){
    if (mark > 70 && mark <= 100){
        grade = 'A'
    }
    else if (mark <= 70 && mark > 60){
        grade = 'B'
    }

    else if (mark <= 60 && mark > 50){
        grade = 'C'
    }
    else if (mark <= 50 && mark > 40){
        grade = 'D'
    }
    else if (mark < 40){
        grade = 'E'
    }
        else{
            console.log("Invalid marks")
        }    
        return grade      
}

console.log(marks(10))