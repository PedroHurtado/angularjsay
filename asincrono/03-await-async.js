class Customer {
    static async get(id) {
        if(id!==1){
            throw "El cliente no existe"            
        }
        return {id}

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

async function main(id){
    try{
        const customer = await Customer.get(id)
        const invoices = await Invoices.get(customer.id)
        console.log(invoices)
    }
    catch(error){
        console.log(error)
    }
}

main(1);
