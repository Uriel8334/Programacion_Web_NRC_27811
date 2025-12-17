// obtenemos el valor de los radios que sean con nombre color
var no_seleccionado = document.querySelectorAll('input[name="color"]');

var txt_resultado = document.getElementById('txt_resultado');



if (txt_resultado) {
    txt_resultado.textContent = "POR FAVOR SELECCIONE UNA OPCION.";
}
no_seleccionado.forEach(elemento => {
    // console.log(elemento);
    elemento.addEventListener('click', function () {
        // console.log(event);
        let color = elemento.value;
        if (color == 'rojo') {
            txt_resultado.textContent = "DETENGASE!!!";
            console.log("DETENGASE!!!");
        } else if (color == 'amarillo') {
            txt_resultado.textContent = "CUIDADO!!!";
            console.log("CUIDADO!!!");
        } else if (color == 'verde') {
            txt_resultado.textContent = "AVANCE!!!";
            console.log("AVANCE!!!");
        }
    });

    if (elemento.checked) {
        elemento.click(); 
    }
});





