var txtInicio = document.getElementById("txt_inicio");
var txtFinal = document.getElementById("txt_final");
var btnMostrar = document.getElementById("btn_mostrar_resultado");
var txtResultado = document.getElementById("txt_resultado");

btnMostrar.addEventListener("click", function () {

    let inicio = parseInt(txtInicio.value);
    let fin = parseInt(txtFinal.value);

    let resultados = "";

    // se limita para que el sistema no se cuelgue al imprimir demasiados numeros
    if (inicio > 999 || fin > 999) {
        txtResultado.innerHTML = "Por favor, ingrese números entre 0 y 999.";
        return;
    }

    if (inicio > fin) {
        txtResultado.innerHTML = "El número de inicio debe ser menor o igual al número final.";
        return;
    }
    for (let i = inicio; i <= fin; i++) {
        resultados += `${i}<br>`;
    }

    txtResultado.innerHTML = resultados;
});