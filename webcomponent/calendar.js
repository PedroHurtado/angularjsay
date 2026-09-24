export class Button extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
           <button> 
              <slot></slot>
            </button>
        `
        console.log("Acabo de nacer")

    }
    connectedCallback(){
      console.log("Tengo padre")
    }
    disconnectedCallback(){
       console.log("Dejo de estar en el dom y no tengo padre")
    }
}

customElements.define('app-button', Button)