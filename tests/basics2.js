

function add(a,b){
    return a+b
}

let result = add(2,3)
console.log(result)

// some functions do not have name and we call them as anonymous function
//anonymous functions can be assigned to a veriable just like below
let sumofintegers = function(c,d){
    return c+d
}

//reducing anonymous function using fat pipe operator
let sumofintegers1 = (c,d)=> c+d

console.log(sumofintegers1(2,2))

//learnin about strings
let day ='tuesday '
console.log(day.length)//8
let subday = day.slice(0,4)
console.log(subday)
console.log(day[1])//u
//tue day
let splitday = day.split('s')
console.log(splitday[1].length)
console.log(splitday[1].trim().length)

//convert string into number
let date = '23'
let nextdate = '27'
let diff = parseInt(nextdate-date)
console.log(diff)
diff.toString()

//concatenation
let newday = day +"is funday"
console.log(newday)
//if u wanna search where day keyword is
let val = newday.indexOf("day")
//if u wanna search second day make it skip first day4
let val1 = newday.indexOf("day",5)//this will search from 5th letter which is ay
