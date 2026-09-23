//asignacion
const array=[1,2,3,4,5,6]
const [a,b] = array // a=array[0] b=array[1]   

const [a,b,...rest] = array

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring

//clonar

const a1=[1,2,3]
const a2=[4,5,6]
const clon = [...a1,...a2]

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone

//desectructuing en funciones

const obj = {id:1,name:'pedro',phnne:6666}

function foo({id,name,...rest}){}

foo(obj)

//default parameters

function sum(a,b=4){
    return a+b
}

sum(5,3) //8

sum(5) //9

if(a===null){
    a.foo();
}

a && a.foo();
function foo(_options){
    const options = options || {}    
}

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//https://webassembly.org/

//false

//numero 0'
//cadnea ''
//null
//undefined
//false

//if(a)

//true
//!0
//!''
//null
//undefined
//true

//a==1   1=='1' //true   1==='1' /false

