//funcion para descargar gifo

async function downloadGifos2(imgGifs) {

    let elementA = document.createElement('a');
    let response = await fetch(imgGifs.src);
    let file = await response.blob();
    elementA.download = 'newGif.gif';
    elementA.href = window.URL.createObjectURL(file);
    elementA.dataset.downloadurl = ['application/octet-stream', elementA.download, elementA.href].join(':');
    elementA.click();
};


/* slider-carousel */

let contenedor = document.querySelector('.container-slider');
let contenedorExpandirGifo_carrusel = document.querySelector('.containerExpandirGif_carrusel');
const closeExpandirGif_carrusel = document.getElementById('closeExpandirGifo_carrusel');

async function trendings() {
    let urlAppi = `https://api.giphy.com/v1/gifs/trending?api_key=${claveAppi}&q=mas/&limit=6`;
    let response = await fetch(urlAppi);
    let json = await response.json();
    let gifs = json.data;
    return gifs;


}
trendings()

    .then(imagen => {
        console.log(imagen);
        let ulTag = document.createElement('ul');
        ulTag.setAttribute('class', 'carousel');
        ulTag.setAttribute('id', 'carousel');

        for (img of imagen) {
            let liTag = document.createElement('li');
            liTag.setAttribute('class', 'li-contededorGif');


            let imgGifs = document.createElement('img');
            imgGifs.setAttribute('src', img.images.original.url);
            imgGifs.setAttribute('class', 'contededorGif');
            imgGifs.setAttribute('id', img.id);
            imgGifs.setAttribute('user', img.username);
            imgGifs.setAttribute('title', img.title);


            ulTag.appendChild(liTag);

            let div_Btn_hover = document.createElement('div');
            div_Btn_hover.id = 'div_Btn-hover';

            let div_img_gifs = document.createElement('div');
            div_img_gifs.id = 'carouselGifs';

            liTag.appendChild(div_Btn_hover);
            div_Btn_hover.appendChild(div_img_gifs);
            div_img_gifs.appendChild(imgGifs);

            let user1 = document.createElement('div');
            user1.classList.add('btnFavoritoscarruselOff');
            let parrafoUser = document.createElement('p');
            parrafoUser.setAttribute('class', 'parrafo_p');
            parrafoUser.innerHTML = (img.username);

            user1.appendChild(parrafoUser);

            let usuario_undefined = "Anonimo";

            if (img.username == '') {
                parrafoUser.innerHTML = (usuario_undefined)
            };

            let titulo_Gifo = document.createElement('div');
            titulo_Gifo.classList.add('btnFavoritoscarruselOff');
            let elemenTituloGifo = document.createElement('h4');
            elemenTituloGifo.setAttribute('class', 'title_gifo_n');
            elemenTituloGifo.innerHTML = (img.title);

            titulo_Gifo.appendChild(elemenTituloGifo);

            if (img.title == '') {
                elemenTituloGifo.innerHTML = (usuario_undefined)
            };

            let btnFavoritos = document.createElement('div'); //div para agregar la imagen de corazon
            btnFavoritos.classList.add('btnFavoritoscarruselOff');
            let corazon = document.createElement('img');
            corazon.setAttribute('class', 'btnFavorito');
            corazon.setAttribute('src', 'zip/assets/icon-fav.svg');

            corazon.id = 'img_iconocarrusel';

            let btnDescarga = document.createElement('div'); //div para agregar la imagen de descarga
            btnDescarga.classList.add('btnFavoritoscarruselOff');
            let descargaGifo = document.createElement('img');
            descargaGifo.setAttribute('class', 'btnDescarga');

            descargaGifo.id = 'img_iconocarrusel';

            //*****evento descargar gifo */
            descargaGifo.addEventListener('click', () => {
                return downloadGifos2(imgGifs)
            }, false);


            let btnexpandir = document.createElement('div'); //div para agregar la imagen de expandir
            btnexpandir.classList.add('btnFavoritoscarruselOff');
            let expandirGifo = document.createElement('img');
            expandirGifo.setAttribute('class', 'btnExpan');
            expandirGifo.id = 'img_iconocarrusel';

            div_Btn_hover.appendChild(user1);
            div_Btn_hover.appendChild(titulo_Gifo);
            div_Btn_hover.appendChild(btnFavoritos); //añadir el boton corazon al div botones
            btnFavoritos.appendChild(corazon);

            div_Btn_hover.appendChild(btnDescarga); //añadir el btn descarga al div botones
            btnDescarga.appendChild(descargaGifo);

            div_Btn_hover.appendChild(btnexpandir); //añadir el divexpandir al div botones
            btnexpandir.appendChild(expandirGifo);

            div_Btn_hover.classList.add('contededorGif');
            div_img_gifs.classList.add('contededorGif');

            //---------botones cuando se expande--------------
            let favExpandirGifo_carrusel = document.createElement('div');
            favExpandirGifo_carrusel.setAttribute('class', 'favExpandirGifo_carrusel');
            let imgfavExpandirGifo_carrusel = document.createElement('img');
            imgfavExpandirGifo_carrusel.setAttribute('src', 'zip/assets/icon-fav.svg');
            favExpandirGifo_carrusel.appendChild(imgfavExpandirGifo_carrusel);

            let downExpandirGifo_carrusel = document.createElement('div');
            downExpandirGifo_carrusel.setAttribute('class', 'downExpandirGifo_carrusel');
            let imgdownExpandirGifo_carrusel = document.createElement('img');
            imgdownExpandirGifo_carrusel.setAttribute('src', 'zip/assets/icon-download.svg');
            downExpandirGifo_carrusel.appendChild(imgdownExpandirGifo_carrusel);


            //***********función expandr gif**************** */
            function gif_expand() {

                let img_expandir = document.getElementById('img-expandir');
                img_expandir.setAttribute('class', 'expGifNuevoDiv');
                let p_expandir = document.getElementById('user_gif');
                let h4 = document.getElementById('tituloGifExpandir');

                contenedorExpandirGifo_carrusel.appendChild(favExpandirGifo_carrusel);
                contenedorExpandirGifo_carrusel.appendChild(downExpandirGifo_carrusel);

                img_expandir.setAttribute('src', imgGifs.src);
                p_expandir.innerHTML = (imgGifs.user);
                //console.log(p_expandir)
                h4.innerHTML = (imgGifs.title);

                let usuario_undefined = "Anonimo";

                if (imgGifs.user == undefined) {
                    p_expandir.innerHTML = (usuario_undefined)
                };

                if (imgGifs.title == undefined) {
                    h4.innerHTML = (usuario_undefined)
                };

            };

            //***********evento expandir******* */

            btnexpandir.addEventListener('click', () => {
                contenedorExpandirGifo_carrusel.classList.toggle('move');
                gif_expand();
            }, false);


            //*******evento descargar gif en el expandido***** */

            imgdownExpandirGifo_carrusel.addEventListener('click', () => {
                downloadGifos2(imgGifs);
            }, false);

            //****funcion sessionstorage en expandir para pasar a favoritos******** */
            function sessionStorageExpandir() {
                if (imgfavExpandirGifo_carrusel.src == linkCorazonActive) {
                    arraySessionSTorage.push(imgGifs.src);
                    console.log(arraySessionSTorage);
                } else {
                    arraySessionSTorage.pop(imgGifs.src);
                    console.log(arraySessionSTorage);
                }
                var arraySession = JSON.stringify(arraySessionSTorage);
                sessionStorage.setItem('nuevoArray', arraySession);
            };

               //***********evento favorito en el expandido********* */

               imgfavExpandirGifo_carrusel.addEventListener('click', () => {
                if (imgfavExpandirGifo_carrusel.src == linkCorazonActive) {

                    imgfavExpandirGifo_carrusel.setAttribute('src', 'zip/assets/icon-fav.svg');
                    imgfavExpandirGifo_carrusel.setAttribute('class', 'btnFavorito');

                } else {
                    imgfavExpandirGifo_carrusel.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                    imgfavExpandirGifo_carrusel.setAttribute('class', 'btnFavoritoActive');

                }

            }, false);

            imgfavExpandirGifo_carrusel.addEventListener('click', () => {
                sessionStorageExpandir();
               
            }, false);


            //***************guardar gifs en array para sessionstorage del carrusel********************* */

            //****funcion sessionstorage para pasar a favoritos******** */
            function sessionStorage2() {
                if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                    arraySessionSTorage.push(imgGifs.src);
                    //console.log(arraySessionSTorage);
                } else {
                    arraySessionSTorage.pop(imgGifs.src);
                    //console.log(arraySessionSTorage);
                }
                var arraySession = JSON.stringify(arraySessionSTorage);
                sessionStorage.setItem('nuevoArray', arraySession);
            };


            corazon.addEventListener('click', () => {
                if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg' ) {

                    corazon.setAttribute('src', 'zip/assets/icon-fav.svg');
                    corazon.setAttribute('class', 'btnFavorito');

                } else {
                    corazon.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                    corazon.setAttribute('class', 'btnFavoritoActive');

                }                       

            }, false);

            corazon.addEventListener('click', () => {
                sessionStorage2();
            }, false);


            //evento mouseover y mouseout sobre cada gif para que aparezcan los botones de favorito, descarga y expandir----------
            div_Btn_hover.addEventListener('mouseover', () => {

               user1.classList.toggle('btnFavoritoscarruselOff');
                user1.classList.toggle('parrafoUsuario');

                titulo_Gifo.classList.toggle('btnFavoritoscarruselOff');
                titulo_Gifo.classList.toggle('usuarioHover');

                div_Btn_hover.classList.toggle('btnFavoritohover');
                div_img_gifs.classList.toggle('opacidad');

                btnFavoritos.classList.toggle('btnFavoritoscarruselOff');
                btnFavoritos.classList.toggle('btnFavoritoscarruselOn');


                //evento mouseover para cambiar el hover del icono favorito

                btnFavoritos.addEventListener('mouseover', () => {
                    if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                        corazon.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                        corazon.setAttribute('class', 'btnFavoritoActive');

                    } else {

                        corazon.setAttribute('src', 'zip/assets/icon-fav-hover.svg');
                        corazon.setAttribute('class', 'btnFavorito_Hover');

                    }

                }, false);

                btnFavoritos.addEventListener('mouseout', () => {
                    if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                        corazon.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                        corazon.setAttribute('class', 'btnFavoritoActive');
                    } else {
                        corazon.setAttribute('src', 'zip/assets/icon-fav.svg');
                        corazon.setAttribute('class', 'btnFavorito');
                    }

                }, false);


                btnDescarga.classList.toggle('btnFavoritoscarruselOff');
                btnDescarga.classList.toggle('btnFavoritoscarruselOn');

                //evento mouseover para cambiar el hover del icono descarga

                btnDescarga.addEventListener('mouseover', () => {
                    descargaGifo.setAttribute('class', 'btnDescargaHover');

                }, false);

                btnDescarga.addEventListener('mouseout', () => {
                    descargaGifo.setAttribute('class', 'btnDescarga');

                }, false);

                btnexpandir.classList.toggle('btnFavoritoscarruselOff');
                btnexpandir.classList.toggle('btnFavoritoscarruselOn');

                //evento mouseover para cambiar el hover del icono expandir
                btnexpandir.addEventListener('mouseover', () => {
                    expandirGifo.setAttribute('class', 'btnExpanHover');

                }, false);

                btnexpandir.addEventListener('mouseout', () => {
                    expandirGifo.setAttribute('class', 'btnExpan');

                }, false);

            })

            div_Btn_hover.addEventListener('mouseout', () => {
                div_Btn_hover.classList.toggle('btnFavoritohover');
                div_img_gifs.classList.toggle('opacidad');

                user1.classList.toggle('btnFavoritoscarruselOff');
                user1.classList.toggle('parrafoUsuario');

                titulo_Gifo.classList.toggle('btnFavoritoscarruselOff');
                titulo_Gifo.classList.toggle('usuarioHover');

                btnFavoritos.classList.toggle('btnFavoritoscarruselOn');
                btnFavoritos.classList.toggle('btnFavoritoscarruselOff');

                btnDescarga.classList.toggle('btnFavoritoscarruselOn');
                btnDescarga.classList.toggle('btnFavoritoscarruselOff');

                btnexpandir.classList.toggle('btnFavoritoscarruselOn');
                btnexpandir.classList.toggle('btnFavoritoscarruselOff');

            }, false)

            //************evento touch version Mobile */

          imgGifs.addEventListener('touchstart', () => {

                contenedorExpandirGifo_carrusel.classList.toggle('move');
                gif_expand();
            
            }, false);

        }

        contenedor.appendChild(ulTag);
        allcarousel()
    })
    .catch(console.error)
 

closeExpandirGif_carrusel.addEventListener('click', () => {
    if (contenedorExpandirGifo_carrusel.lastChild) {
        contenedorExpandirGifo_carrusel.removeChild(contenedorExpandirGifo_carrusel.lastChild);
    }
    contenedorExpandirGifo_carrusel.classList.toggle('move');
}, false)


//funcion para recorrer la imagenes con las flechas

function allcarousel() {
    const carousel = document.getElementById('carousel');
    const flechaLeft = document.getElementById('but-left');
    const flechaRight = document.getElementById('but-right');

    flechaRight.addEventListener('click', () => {

        carousel.scrollLeft += 400;

    });

    flechaLeft.addEventListener('click', () => {
        carousel.scrollLeft -= 400;

    });
}
