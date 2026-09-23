// Object.create()  null o un objeto inicializador que si es el prototipo más cercano.

const instance = {
    x:11,
    writer:function(){console.log(this.x)}
}

//<2015 ES6

function FooES3(x){
    this.x=x
}

FooES3.prototype.writer = function(){
    console.log(this.x)
}

const instanceFooES3 = new FooES3(11)

//2015 ES6

class FooES6{
    constructor(x){
        this.x = x;
    }
    writer(){
        console.log(this.x);
    }
}

const instanceFooES6 = new FooES6(11)
/*
   <div ng-controller="FooES6"><div>
*/
function createObject(ctor,...args){
    const instance = Object.create(ctor.prototype)
    ctor.apply(instance,args)
    return instance;    
}

createObject(FooES3,11)

function factory(id,name){
    return {
        id,name
    }
}


const instace = factory(1,"Antonio")


//https://tc39.es/

//Usuario->Browser(Frontend)-> | (Servidor(Backend)|c,c++,phyton,c#,java,node)->BB.DD, 
                          //rest->json

//Pintarlo bonito al cliente->Angularjs,Angular,React,Vue,Svelte,Qwick,Solid->framework de visualización


    //Angular,React,Vue,Svelte,Qwick,Solid->SSR(Controlador->request)
    //Angularjs->Solo es Browser


function asincrona(cb,timeout){
    setTimeout(cb("Hello"), timeout);
}

asincrona(console.log,2000) // impprime Hello despues de 2 segundos
