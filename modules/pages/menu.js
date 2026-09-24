const outlet = document.getElementById('outlet')

!function menu(){
    //router(SPA)
    document.addEventListener('click',async (ev)=>{       
        const node = ev.composedPath().find(n=>n.dataset && 'page' in n.dataset)
        if(node){
            ev.stopPropagation();
            ev.preventDefault();
            outlet.textContent = ''
            const {page} = node.dataset
            const url = `./page${page}.js`            
            const module = await import(url)
            module.default();
        }
    })
}()

//funcion autoejecutable
//import dinamico
//dataset->data-* html5
//event delegation
