class Customer{
    static get(id,cb){
        if(id===1){
            cb(null,{id})
        }
        else{
            cb("Se ha producido un error", null)
        }
    }
}

class Invoices{
    static get(clientId){
        if(clientId===1){
            cb(null,{clientId,invoices:[]})
        }
        else{
            cb("El cliente no tiene facturas",null)
        }
    }
}

function main(id){
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
}

main(1)