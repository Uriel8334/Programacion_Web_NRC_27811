// console.log('Se cargo el archivos de arreglos js');

//declaramos un arreglo
//se puede usar comillas simple o dobles ""  ''
//posiciones    0       1        2
var frutas = ["UVA", 'PERA', 'MANZANA'];

// console.log(frutas);
// console.log(frutas[0]); //uva
// console.log(frutas[1]); //pera
// console.log(frutas[2]); //manzana

// AGREGA AL FINAL
console.log("===================");
frutas.push('BANANA');
console.log("agregando BANANA al final");
console.log(frutas);

// AGREGA AL INICIO
console.log("===================");
frutas.unshift('GUACAMOTE');
console.log("agregando GUACAMOTE al inicio");
console.log(frutas);

//ELIMINA EL ULTIMO ELEMENTO
console.log("===================");
frutas.pop();
console.log("eliminando el ultimo elemento");
console.log(frutas);

//ELIMINA EL PRIMER ELEMENTO
console.log("===================");
frutas.shift();
console.log("eliminando el primer elemento");
console.log(frutas);

//metodo para saber cuanto es el tamanio

let tamanio_arreglo_frutas = frutas.length;
console.log("===================");
console.log("imprimiendo el tamanio del arreglo");
console.log(tamanio_arreglo_frutas);

// NO SIRVE PARA DEVOLVER DATOS 
// usando forEach
console.log("===================");
console.log("imprimiendo con forEach");
let frutas_forEach = frutas.forEach(function (fruta) {
    console.log(fruta);

    // NO RETORNA EL VALOR EN EL forEach
    // return fruta.toUpperCase();
});


// PARA MODIFICAR O EDITAR ALGO DEL ARREGLO
console.log("===================");
console.log("imprimiendo con map");
let frutas_map = frutas.map(function (fruta) {
    // console.log(fruta);
    // console.log(fruta.toLowerCase() + "CONCATENADA")
    return fruta.toUpperCase();
});

console.log(frutas_forEach);
console.log(frutas_map);





