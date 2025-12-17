/*var btn_mostrar_tabla=document.getElementById('btn_mostrar_tabla');
var txt_resultado=document.getElementById('txt_resultado');

btn_mostrar_tabla.addEventListener('click',function(e){
    var txt_numero_1=parseInt(document.getElementById('txt_numero_1').value);
    if(txt_numero_1){
        var resultado="";
    for(let index=1; index<=12;index++){

        let res=`${txt_numero_1} X ${index} =${txt_numero_1*index}<br>`;
        resultado+=res;
    }

    txt_resultado.innerHTML=resultado;
    }else{
        txt_resultado.textContent='ingrese un numero por favor';
    }
})

document.getElementById('btn_limpiar').addEventListener('click', function(){
    document.getElementById('txt_numero_1').value='';
    txt_resultado.innerHTML='';
})*/

var txtNumero = document.getElementById("txt_numero_1");
var btnMostrar = document.getElementById("btn_mostrar_tabla");
var btnLimpiar = document.getElementById("btn_limpiar");

var colPares = document.getElementById("col_pares");
var colImpares = document.getElementById("col_impares");

btnMostrar.addEventListener("click", function (event) {

    let num = parseInt(txtNumero.value);

    let pares = "";
    let impares = "";

    for (let i = 1; i <= num; i++) {

        if (i % 2 === 0) {
            pares += `${i}<br>`;
        } else {
            impares += `${i}<br>`;
        }
    }

    colPares.innerHTML = pares;
    colImpares.innerHTML = impares;
});

btnLimpiar.addEventListener("click", function () {
    txtNumero.value = "";
    colPares.innerHTML = "";
    colImpares.innerHTML = "";
});