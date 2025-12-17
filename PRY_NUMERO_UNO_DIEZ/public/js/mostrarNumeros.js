var btn_mostrar_numeros=document.getElementById('btn_mostrar_numero');
var txt_resultado=document.getElementById('txt_resultado')

btn_mostrar_numeros.addEventListener('click', function(evento){
    let numeros="";
    for(let i=1; i<=10; i++){
        numeros+=`${i}<br>`;
    }

    txt_resultado.innerHTML=numeros;
})