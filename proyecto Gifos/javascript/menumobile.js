//menu hamburguesa

let burger = document.getElementById('btn-menu');

function menu() {
    let mostrarMenu = document.getElementById('menuNav');

    if (mostrarMenu.classList.contains("disabled_menu")) {

        mostrarMenu.classList.remove("disabled_menu"); //ocultar opciones
        mostrarMenu.classList.add("enabled_menu");


    } else {

        mostrarMenu.classList.remove("enabled_menu"); //mostrar opciones
        mostrarMenu.classList.add("disabled_menu");

    }

}

burger.addEventListener('click', menu, false);