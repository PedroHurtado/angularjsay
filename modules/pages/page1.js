

const outlet = document.getElementById('outlet')

function drawData(data){
    
    //TemplateSintax

    /*<div class="list" ngfor="let item of items">
        <div>{{item.id}}</div>
        <div>{{item.name}}</div>
    </div>*/

   data.forEach(person=>{
        const divId = document.createElement('div')
        divId.textContent = person.id

        const divName = document.createElement('div')
        divName.textContent = person.name

        const divContainer = document.createElement('div')
        divContainer.className = "list"
        divContainer.appendChild(divId)
        divContainer.appendChild(divName)
        outlet.appendChild(divContainer)
   })
}
async function getData(){
    //http
    const response = await fetch("data.json");
    drawData(await response.json())
}

export default function pagina1(){
    getData();
}