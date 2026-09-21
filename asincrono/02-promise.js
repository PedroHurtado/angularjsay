class Customer {
    static get(id) {
        return new Promise((resolve, reject) => {
            if (id === 1) {
                resolve({ id })
            }
            else {
                reject("El cliente no tiene facturas")
            }
        })

    }
}

class Invoices {
    static get(clientId) {

        return new Promise((resolve, reject) => {
            if (clientId === 1) {
                resolve({ clientId, invoices: [] })
            }
            else {
                reject("El cliente no tiene facturas")
            }
        })

    }
}




/*function main(id){
    Customer.get(id,function(error,customer){
        if(customer){
            Invoices.get(customer.id,function(error,invoices){
                if(invoices){
                    console.log(invoices)
                }
                else{
                    console.log(error)
                }
            })
        }
        else{
            console.log(error)
        }
    })
}*/

// devuelve una promesa (resolve,reject)
//resolve ->then->(n)
//reject->catch(1)

function main(id){
    let _invoices;
    Customer.get(id)
          .then(customer=>Invoices.get(customer.id))
          .then(invoices=>_invoices=invoices)
          .catch(error=>console.log(error))
}

main(1)