//console.log("Hello world");
//to declare variable we use var/let in the ES5 engine and after hat we usse let/ const keywords

const { markAsUncloneable } = require("node:worker_threads")

const a= 4
// console.log(a)
// console.log(typeof(a))

const b = 2.12

const myname= 'Sadaf Khan'
// console.log(typeof(myname))

const bool = true
// console.log (typeof(bool))
//you can also reverse true to false using exclamation 'not' mark
// console.log(!bool)

const c= a+b
// console.log (c)
// we cannot redeclare let keyword but u can with var, like var c is sadaf khan then var c =a+b is allowed but not let 
//reassigning is allowed with let keyword let c='sadaf' then c= a+b is allowed coz u are not defining again u are re assigning, var allows both re declare and re assign
//const is constant so re assigned is also not allowed, use in program when u think it wont b changed.
// if u feel a variable wont b re assigned use const
//if u feel a variable wont be redeclared use let
//---------------------------------------------------------------------------// now we learn some more basics

var array1 = [2,3,4,5,6]
var sum = 0
for(i=0 ; i< array1.length;i++){

     sum = sum +array1[i]
}
console.log(sum)
//reduce filter map
let total = array1.reduce((sum,array1)=>sum+array1,0)
console.log(total)

var scores=[12,13,14,16]
var evennos =[]
for(k=0;k<scores.length;k++)
    {
if(scores[k] % 2 ==0)
{
evennos.push(scores[k])
}
}
console.log(evennos)
//simple way of checking even nos with .filter 
let newevenscores = scores.filter(score => score%2 ==0)
console.log(newevenscores)

// when u want to replace the array values with new values like eg, find out even nos and then multiply by 3
//newevenscores gave us even values of array now we expect [36,42,48]


let mappedarray = newevenscores.map(score => score*3)
console.log(mappedarray)

// now if u want to add the results[36+42+48] then use reduce

let addedmapppedarray = mappedarray.reduce((sum,val)=> sum+val,0)
console.log(addedmapppedarray)

var scores1 = [12,13,14,16]

let filtermapreduceresult =scores1.filter(score=>score%2 ==0).map(score=>score*3).reduce((sum,val) =>sum+val,0 )
console.log(filtermapreduceresult)

let fruits =["banana","mango","pomegranate","apple"]
console.log(fruits.sort())
console.log(fruits.reverse())

//make 3 as 003 and the .sort will fail so do bubble sort as shown below

var scores1 = [12,3,19,16,14]
console.log(scores1.sort(function(a,b){
    return a-b
}))

//remove function add => and remove return
console.log(scores1.sort((a,b)=>a-b))


