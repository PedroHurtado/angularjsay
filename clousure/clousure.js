function sum(a){
    return function(b){
        debugger;
        return a+b
    }
}

//¿Como obtengo el 8 invocando a sum y pasaando el 5 y 3?

const total= sum(5)(3)

const obj=sum(5)  //que se ha creado un objeto con un atributo privado no accesible con valor 5 y se le a asingando a "a"


function events(node,event,cb){
    node.addEventListener(event,cb)
    return ()=>node.removeEventListener(event,cb)
}

const dispose = events(document,'click',console.log)

//framework reactividad signal

function signal(initialValue){   //clase
    let value = initialValue;
    const fn=()=>value;  //getter
    fn.set=(newValue)=>{   //setter
        if(Object.is(newValue,value)) return;
            value = newValue
        //Modifica a todos tus subscriptores
    }
}


const result = signal(30)


//generators

function filter(array, predicado){
    const newArray = [];
    for (const item of array) {
        if(predicado(item)){
            newArray.push(item)
        }        
    }
    return newArray
}


//¿Quie problemas veis en este código?

    //1. Menoria  1000000 v%2===0(pares) 500.000
    //2.Bloqueante hasta que no termine no tienes los resultados


function* filter(array, predicado){
    
    for (const item of array) {
        if(predicado(item)){
            yield item
        }        
    }
    
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
