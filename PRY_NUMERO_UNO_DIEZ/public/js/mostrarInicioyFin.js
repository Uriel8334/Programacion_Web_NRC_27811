var txtInicio = document.getElementById("txt_inicio");
var txtFinal = document.getElementById("txt_final");
var btnMostrar = document.getElementById("btn_mostrar_resultado");
var txtResultado = document.getElementById("txt_resultado");

btnMostrar.addEventListener("click", function() {

    let inicio = parseInt(txtInicio.value);
    let fin = parseInt(txtFinal.value);

    let resultados = "";

    for (let i = inicio; i <= fin; i++) {
        resultados+=`${i}<br>`;
    }

    txtResultado.innerHTML = resultados;
});