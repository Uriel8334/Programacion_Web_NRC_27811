// public/js/agregarProducto.js

var btn_agregar = document.getElementById('btn_agregar');
var txt_nombre_producto = document.getElementById('txt_nombre_producto');
var lista_producto_low = document.getElementById('lista_productos_low');
var lista_producto_up = document.getElementById('lista_productos_up');

// Función para adjuntar el evento de eliminación al botón
function configurarBotonEliminar(btn, listItem) {
    btn.addEventListener('click', function () {
        // Al hacer clic en un botón de una lista (ej. mayúsculas), 
        // necesitamos encontrar y eliminar su 'gemelo' en la otra lista.

        // 1. Obtener el texto del producto para identificar el 'gemelo'.
        // Usamos el texto en minúsculas para la identificación.
        var textoNormalizado = listItem.querySelector('span').textContent.toLowerCase().trim();

        // 2. Determinar en qué lista estamos y cuál es la lista "hermana".
        var listaActual = listItem.parentNode;
        var listaHermana = (listaActual.id === 'lista_productos_up') ? lista_producto_low : lista_producto_up;

        // 3. Eliminar el elemento actual.
        listItem.remove();

        // 4. Buscar y eliminar el 'gemelo' en la lista hermana.
        var itemsHermana = listaHermana.querySelectorAll('li');
        itemsHermana.forEach(function (item) {
            var itemTexto = item.querySelector('span').textContent.toLowerCase().trim();
            if (itemTexto === textoNormalizado) {
                item.remove();
            }
        });
    });
}

// Función para crear un <li> con un botón de eliminar
function crearElementoLista(texto) {
    var elementoLI = document.createElement('li');
    // Clases para estilo y alineación con Bootstrap
    elementoLI.classList.add('list-group-item', 'mt-1', 'mb-1', 'ms-1', 'me-1', 'text-dark', 'rounded-3', 'border', 'border-primary');

    // Contenedor para el texto
    var spanTexto = document.createElement('span');
    spanTexto.textContent = texto;


    // Botón de eliminar (Bootstrap close button)
    var btnEliminar = document.createElement('button');
    btnEliminar.setAttribute('type', 'button');
    btnEliminar.classList.add('btn-close');
    btnEliminar.setAttribute('aria-label', 'Close');

    elementoLI.appendChild(spanTexto);
    elementoLI.appendChild(btnEliminar);

    // Configurar la lógica de eliminación para este elemento
    // Nota: La lógica de eliminación está ahora dentro de una función 
    // y busca el elemento "hermano" para eliminarlo también.
    configurarBotonEliminar(btnEliminar, elementoLI);


    return elementoLI;
}


// Listener del botón 'AGREGAR'
btn_agregar.addEventListener('click', function (event) {
    var producto_value = txt_nombre_producto.value.trim();

    if (producto_value !== '') {
        // 1. Crear elemento para MAYÚSCULAS y agregarlo a su lista
        var itemUp = crearElementoLista(producto_value.toUpperCase());
        lista_producto_up.appendChild(itemUp);

        // 2. Crear elemento para MINÚSCULAS y agregarlo a su lista
        // Es esencial crear un nuevo elemento DOM, no reutilizar 'itemUp'.
        var itemLow = crearElementoLista(producto_value.toLowerCase());
        lista_producto_low.appendChild(itemLow);



        // 3. Limpiar el input
        txt_nombre_producto.value = '';
        txt_nombre_producto.focus();
    } else {
        console.log("POR FAVOR INGRESE UN PRODUCTO VÁLIDO!");
    }
});