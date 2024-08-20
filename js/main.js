const carrito = true
while(carrito){
let menu = parseInt(prompt("ingrese 1 para ver el carrito, 2 para ver el total de su compra, ingrese 3 para ver elegir su metodo de pago, ingrese caulquier numero para confirmar su compra"))

switch (menu) {
    case 1:      
     console.log("jordan 3, adidas campus,jordan 2 Travis Scott");
        
     break;

        case 2:
            console.log("total de su compra:5.000usd");
            break;

            case 3:
                console.log("efectivo,credito,debito");
                break;

    default:

        console.log("confirmacion de compra");
        
        break;
}
let confirmacion = prompt("le gustaria hacer otra compra? (si/no)").toLowerCase()
if (confirmacion=="no") {
continuar = false
console.log("gracias por su compra");
}
}