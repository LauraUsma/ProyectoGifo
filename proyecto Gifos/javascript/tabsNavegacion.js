//Server
//let server = serverGitHub;
//http://127.0.0.1:5502/'
//let serverGitHub = 'https-github.com-LauraUsma.github.io';


let arraySessionSTorage = [];
let guardarenPanelFavoritos = [];

const containerExpan_Favoritos = document.querySelector('.containerExpan_Favoritos');
const closeExpan_favoritos = document.getElementById('closeExpan_favoritos');
const linkCrearGifoActive = 'file:///C:/Users/laura%20usma/Documents/Laura/acamica/javascrit/for-while/proyecto%20Gifos/zip/assets/CTA-crear-gifo-active.svg'
//const linkCrearGifoActive = server + 'zip/assets/CTA-crear-gifo-active.svg'


let btnGifoPrincipal = document.getElementById('icono');
let misFavorito = document.getElementById('favorito');
let misGifos = document.getElementById('misGifos');

let panelCarrusel = document.getElementById('contenedorCarrusel');
let mainCrearGifos = document.getElementById('mainCrearGifos');
let crearTusPropiosGifos = document.getElementById('crearTusPropiosGifos');

let mainFavoritos = document.getElementById('mainFavoritos');
let contenedorCrearGifo = document.getElementById('contenedorCrearGifo');


let btnCrearNewGifos = document.getElementById('crearNewGifs');
let imgCrearGifoNew = document.createElement('img')
imgCrearGifoNew.setAttribute('class', 'crearDiurno');
imgCrearGifoNew.setAttribute('src', 'zip/assets/button-crear-gifo.svg')
btnCrearNewGifos.appendChild(imgCrearGifoNew);



//***************guardar gifos con corazon en favoritos */
let favSinContenido = document.getElementById('favSinContenido');
let divFavorito = document.createElement('div');
divFavorito.classList.add('div-favorito');
mainFavoritos.appendChild(divFavorito);

//******funcion para eliminar gifs repetidos********

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
//******funcion para descargar gifo */
async function downloadGifos3(guardarFavorito) {

    let elementA = document.createElement('a');
    let response = await fetch(guardarFavorito.src);
    let file = await response.blob();
    elementA.download = 'newGif.gif';
    elementA.href = window.URL.createObjectURL(file);
    elementA.dataset.downloadurl = ['application/octet-stream', elementA.download, elementA.href].join(':');
    elementA.click();
};

//*******btn Ver Mas *******/
let btnVerMasFavoritos = document.createElement('div');
btnVerMasFavoritos.setAttribute('class', 'btnVerMasFav');

let grabar_Video = document.getElementById('grabarVideo');
let cuadro_paso3 = document.getElementById('cuadro_paso3')


//NAVEGACION POR TABS


btnGifoPrincipal.addEventListener('click', () => {
    document.getElementById('mainBotonGifos').style.display = 'block';
    document.getElementById('contenedorCarrusel').style.display = 'block';
    document.getElementById('mainCrearGifos').style.display = 'none';
    document.getElementById('mainMisGifos').style.display = 'none';
    document.getElementById('mainFavoritos').style.display = 'none';

});
document.getElementById('mainBotonGifos').style.display = 'block';
document.getElementById('mainMisGifos').style.display = 'none';
document.getElementById('mainFavoritos').style.display = 'none';
document.getElementById('contenedorCarrusel').style.display = 'block';
document.getElementById('mainCrearGifos').style.display = 'none';


btnCrearNewGifos.addEventListener('click', () => {

    document.getElementById('mainCrearGifos').style.display = 'block';
    document.getElementById('mainBotonGifos').style.display = 'none';
    document.getElementById('mainMisGifos').style.display = 'none';
    document.getElementById('mainFavoritos').style.display = 'none';
    document.getElementById('contenedorCarrusel').style.display = 'none';

    document.getElementById('titulosCrearGifo').style.display = 'block';

    grabar_Video.setAttribute('class', 'displayNone');
    document.getElementById('btnCrearNuevoGifo').style.display = 'block';
    cuadro_paso3.setAttribute('class', 'cuadro_paso3');

});



misFavorito.addEventListener('click', () => {

    document.getElementById('mainFavoritos').style.display = 'block';
    document.getElementById('contenedorCarrusel').style.display = 'block';
    document.getElementById('mainBotonGifos').style.display = 'none';
    document.getElementById('mainMisGifos').style.display = 'none';
    document.getElementById('mainCrearGifos').style.display = 'none';



    //********funcion para guardar los gifos con corazon en favoritos */
    guardarenPanelFavoritos = JSON.parse(sessionStorage['nuevoArray']);
    guardarenPanelFavoritos.filter(onlyUnique);

    if (guardarenPanelFavoritos.length == 0) {

        favSinContenido.setAttribute('class', 'displayBlock');
        divFavorito.setAttribute('class', 'displayNone');
        console.log(guardarenPanelFavoritos.length);
    }
    if (guardarenPanelFavoritos.length >= 1) {
        favSinContenido.setAttribute('class', 'displayNone');
        divFavorito.setAttribute('class', 'div-favorito');
        console.log(guardarenPanelFavoritos.length);
        // while vacia la caja cada vez que se vuelve a favoritos antes de llenarla de vuelta
        while (divFavorito.firstChild) {
            divFavorito.removeChild(divFavorito.firstChild);
        }
    }



    function mostrarFavoritosenNuevoDiv(num) {


        for (let i = 0; i <= guardarenPanelFavoritos.length - 1 && i < num; i++) {

            let devImg = document.createElement('div');

            let div_uno = document.createElement('div');

            let guardarFavorito = document.createElement('img');
            guardarFavorito.setAttribute('src', guardarenPanelFavoritos[i]);
            guardarFavorito.setAttribute('user', guardarenPanelFavoritos[i].username);
            guardarFavorito.setAttribute('title', guardarenPanelFavoritos[i].title);
            guardarFavorito.classList.add('favoritosSeleccionados');
            div_uno.appendChild(guardarFavorito);

            let btnFavoritos1 = document.createElement('div'); //div para agregar la imagen de corazon
            btnFavoritos1.classList.toggle('displayNone');
            let corazon1 = document.createElement('img');
            corazon1.setAttribute('class', 'btnFavoritoActive');
            corazon1.setAttribute('src', 'zip/assets/icon-fav-active.svg');
            btnFavoritos1.appendChild(corazon1);

            let btnDescarga1 = document.createElement('div'); //div para agregar la imagen de descarga
            btnDescarga1.classList.toggle('displayNone');
            let descargaGifo1 = document.createElement('img');
            descargaGifo1.setAttribute('class', 'btnDescarga');
            btnDescarga1.appendChild(descargaGifo1);


            let btnexpandir1 = document.createElement('div'); //div para agregar la imagen de expandir
            btnexpandir1.classList.toggle('displayNone');
            let expandir_Gifo1 = document.createElement('img');
            expandir_Gifo1.setAttribute('class', 'btnExpan');
            btnexpandir1.appendChild(expandir_Gifo1);

            let user1 = document.createElement('div');
            user1.classList.add('displayNone');
            let parrafoUser1 = document.createElement('p');
            parrafoUser1.setAttribute('class', 'parrafo_p');
            parrafoUser1.innerHTML = (guardarenPanelFavoritos[i].username);
            user1.appendChild(parrafoUser1);


            let titulo_Gifo1 = document.createElement('div');
            titulo_Gifo1.classList.add('displayNone');
            let elemenTituloGifo1 = document.createElement('h4');
            elemenTituloGifo1.setAttribute('class', 'title_gifo_n');
            elemenTituloGifo1.innerHTML = (guardarenPanelFavoritos[i].title);

            titulo_Gifo1.appendChild(elemenTituloGifo1);

            devImg.appendChild(div_uno);
            devImg.appendChild(btnFavoritos1);
            devImg.appendChild(btnDescarga1);
            devImg.appendChild(btnexpandir1);
            devImg.appendChild(user1);
            devImg.appendChild(titulo_Gifo1);

            divFavorito.appendChild(devImg);
            divFavorito.appendChild(btnVerMasFavoritos);


            devImg.addEventListener('mouseover', () => {
                devImg.classList.toggle('botonesHover');
                div_uno.classList.toggle('opacidad');

                btnFavoritos1.classList.toggle('displayNone');
                btnFavoritos1.classList.toggle('btnesdelHoverCorazon');

                btnDescarga1.classList.toggle('displayNone');
                btnDescarga1.classList.toggle('btnesdelHover');

                btnexpandir1.classList.toggle('displayNone');
                btnexpandir1.classList.toggle('btnesdelHover');

                user1.classList.toggle('displayNone');
                user1.classList.toggle('parrafoUsuario_1');

                titulo_Gifo1.classList.toggle('displayNone');
                titulo_Gifo1.classList.toggle('usuarioHover_1');


            })

            devImg.addEventListener('mouseout', () => {
                div_uno.classList.toggle('opacidad')
                devImg.classList.toggle('botonesHover');

                btnFavoritos1.classList.toggle('btnesdelHoverCorazon');
                btnFavoritos1.classList.toggle('displayNone');

                btnDescarga1.classList.toggle('btnesdelHover');
                btnDescarga1.classList.toggle('displayNone');

                btnexpandir1.classList.toggle('btnesdelHover');
                btnexpandir1.classList.toggle('displayNone');

                user1.classList.toggle('parrafoUsuario_1');
                user1.classList.toggle('displayNone');

                titulo_Gifo1.classList.toggle('usuarioHover_1');
                titulo_Gifo1.classList.toggle('displayNone');
            })
                //*******evento click en corazon activo******* */

                btnFavoritos1.addEventListener('click', () => {
                    if (corazon1.src != linkCorazonActive) {
                        corazon1.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                        corazon1.setAttribute('class', 'btnFavoritoActive');

                    } else {
                        corazon1.setAttribute('src', 'zip/assets/icon-fav.svg');
                        corazon1.setAttribute('class', 'btnFavorito');

                    }

                })

           
                //*************evento mouseover btn descargar***** */
                btnDescarga1.addEventListener('mouseover', () => {
                    descargaGifo1.setAttribute('class', 'btnDescargaHover');
                }, false);

                btnDescarga1.addEventListener('mouseout', () => {
                    descargaGifo1.setAttribute('class', 'btnDescarga');
                }, false)


                //*************evento mouseover btn expandir*********** */
                btnexpandir1.addEventListener('mouseover', () => {
                    expandir_Gifo1.setAttribute('class', 'btnExpanHover');
                }, false);

                btnexpandir1.addEventListener('mouseout', () => {
                    expandir_Gifo1.setAttribute('class', 'btnExpan');
                }, false);

                //********evento click en el btn descargar******** */
                descargaGifo1.addEventListener('click', () => {
                    downloadGifos3(guardarFavorito)
                }, false);

                //*****evento click en el boton expandir********* */

                //--------botones que van en el expandir--------------
                let favExpandirFavorito = document.createElement('div');
                favExpandirFavorito.setAttribute('class', 'favActExpandir');
                let corazon_expandirFavorito = document.createElement('img');
                corazon_expandirFavorito.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                favExpandirFavorito.appendChild(corazon_expandirFavorito);

                let downExpandirGifoFavorito = document.createElement('div');
                downExpandirGifoFavorito.setAttribute('class', 'downExpandirGifo_carrusel');
                let descargar_expandirFavorito = document.createElement('img');
                descargar_expandirFavorito.setAttribute('src', 'zip/assets/icon-download.svg');
                downExpandirGifoFavorito.appendChild(descargar_expandirFavorito);

                //*******funcion expandir gif************ */

                function gif_expandFavorito() {

                    let img_expandirFavoritos = document.getElementById('img-expandirfavoritos');
                    img_expandirFavoritos.setAttribute('class', 'expGifNuevoDiv');
                    let p_expan1 = document.getElementById('user_giffavoritos');
                    let subti_expan1 = document.getElementById('tituloGifExpandirfavoritos');

                    containerExpan_Favoritos.appendChild(favExpandirFavorito);
                    containerExpan_Favoritos.appendChild(downExpandirGifoFavorito);

                    img_expandirFavoritos.setAttribute('src', guardarFavorito.src);
                    p_expan1.innerHTML = (guardarFavorito.user);
                    subti_expan1.innerHTML = (guardarFavorito.title);

                    let usuario_undefined = "Anonimo";

                    if (guardarFavorito.user == undefined) {
                        p_expan1.innerHTML = (usuario_undefined)
                    };

                    if (guardarFavorito.title == undefined) {
                        subti_expan1.innerHTML = (usuario_undefined)
                    };

                };

                expandir_Gifo1.addEventListener('click', () => {
                    containerExpan_Favoritos.classList.toggle('move');
                    gif_expandFavorito();
                }, false);

                downExpandirGifoFavorito.addEventListener('click', () => {
                    downloadGifos3(guardarFavorito);
                }, false);


           
            //************evento touch version Mobile */
            guardarFavorito.addEventListener('touchstart', () => {
                containerExpan_Favoritos.classList.toggle('move');
                gif_expandFavorito();
            }, false);


        }


    };


    let num = 12;
    const limitePage = 12;
    mostrarFavoritosenNuevoDiv(num);

    btnVerMasFavoritos.addEventListener('click', () => {
        while (divFavorito.firstChild) {
            divFavorito.removeChild(divFavorito.firstChild);
        }
        num = num + limitePage;
        mostrarFavoritosenNuevoDiv(num);

    })

});

closeExpan_favoritos.addEventListener('click', () => {
    if (containerExpan_Favoritos.lastChild) {
        containerExpan_Favoritos.removeChild(containerExpan_Favoritos.lastChild);
    }

    containerExpan_Favoritos.classList.toggle('move');

}, false)


misGifos.addEventListener('click', () => {
    document.getElementById('mainMisGifos').style.display = 'block';
    document.getElementById('contenedorCarrusel').style.display = 'block';
    document.getElementById('mainBotonGifos').style.display = 'none';
    document.getElementById('mainFavoritos').style.display = 'none';
    document.getElementById('mainCrearGifos').style.display = 'none';
});


//*******evento para que el btn de crear gifos quede activo******* */
imgCrearGifoNew.addEventListener('click', () => {
    if (imgCrearGifoNew.src == linkCrearGifoActive) {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/button-crear-gifo.svg');
        imgCrearGifoNew.setAttribute('class', 'crearDiurno');


    } else {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/CTA-crear-gifo-active.svg');
        imgCrearGifoNew.setAttribute('class', 'crearGifoActive');

    }

    misGifos.setAttribute('class', 'favoritoColor');
    misFavorito.setAttribute('class', 'favoritoColor'); //violeta
}, false);


//*******evento mouseover para el boton crear gifos */

btnCrearNewGifos.addEventListener('mouseover', () => {
    if (imgCrearGifoNew.src == linkCrearGifoActive) {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/CTA-crear-gifo-active.svg');
        imgCrearGifoNew.setAttribute('class', 'crearGifoActive');


    } else {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/CTA-crear-gifo-hover.svg');
        imgCrearGifoNew.setAttribute('class', 'crear_gifo_hover');

    }
}, false);

btnCrearNewGifos.addEventListener('mouseout', () => {
    if (imgCrearGifoNew.src == linkCrearGifoActive) {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/CTA-crear-gifo-active.svg');
        imgCrearGifoNew.setAttribute('class', 'crearGifoActive');

    } else {
        imgCrearGifoNew.setAttribute('src', 'zip/assets/button-crear-gifo.svg');
        imgCrearGifoNew.setAttribute('class', 'crearDiurno');

    }
}, false);



//***cambiar de color los Li********* */

misFavorito.addEventListener('click', () => {
    misFavorito.setAttribute('class', 'cambiarColor');
    if (misGifos.addEventListener('click', () => {
            misGifos.setAttribute('class', 'cambiarColor'); //gris
            misFavorito.setAttribute('class', 'favoritoColor'); //violeta
            imgCrearGifoNew.setAttribute('src', 'zip/assets/button-crear-gifo.svg');
            imgCrearGifoNew.setAttribute('class', 'crearDiurno')

        }));


}, false);

misGifos.addEventListener('click', () => {
    misGifos.setAttribute('class', 'cambiarColor');
    if (misFavorito.addEventListener('click', () => {
            misFavorito.setAttribute('class', 'cambiarColor');
            misGifos.setAttribute('class', 'favoritoColor');
            imgCrearGifoNew.setAttribute('src', 'zip/assets/button-crear-gifo.svg');
            imgCrearGifoNew.setAttribute('class', 'crearDiurno')

        }));
}, false);