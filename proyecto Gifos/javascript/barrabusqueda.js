// todos los eventos de busqueda que se realizan en la barra de busqueda****


// variables Barra de Busqueda

let inputField = document.getElementById('buscar_texto1');
let search = document.getElementById('search');
let divbtnVerMas = document.getElementById('divMoreResultId');
let buscar = document.getElementById('btn-buscar');
let listaUl = document.getElementById('box-search');
let iconoLupa = document.getElementsByClassName('btn');
const contenedorExpandirGifo = document.querySelector('.containerExpandirGif');
const closeExpandirGif = document.getElementById('closeExpandirGifo')


const linkCorazonActive = 'file:///C:/Users/laura%20usma/Documents/Laura/acamica/javascrit/for-while/proyecto%20Gifos/zip/assets/icon-fav-active.svg'
const claveAppi = "Klh9bWjqkTnuKjIcwmSyb8Dob4QeCTtb";


let btnOff = document.createElement('button');
btnOff.setAttribute('class', 'btnX');


listaUl.addEventListener('focus', () => {
    listaUl.classList.toggle('list-Active');
    listaUl.classList.toggle('list-sugerencia');
    btnOff.appendChild(sugerencias);

})


// función crear titulo

function crearTitle() {
    let divTitleId = document.getElementById("divTitleId");
    let textSearchCopyValue = document.createTextNode(document.getElementById('buscar_texto1').value);
    divTitleId.appendChild(textSearchCopyValue);
    divTitleId.setAttribute("class", "div-centraltitle");
}

//función crear boton Ver Mas

function crearbtnVerMas() {
    divbtnVerMas.setAttribute("class", "divMoreResultId");
}

//funcion busqueda sin resultado

function loreImpsumVisible() {
    let loremIpsum = document.getElementById('divloremIpsum');
    loremIpsum.setAttribute('class', 'lorem-visible');
}

//---------------sugerencias barra de busqueda-----------------------

//focus  X en el buscador

inputField.addEventListener('focus', () => {
    buscar.classList.toggle('btn');
    buscar.classList.toggle('btnX');
}, false);

inputField.addEventListener('focusout', () => {
    buscar.classList.toggle('btn');
    buscar.classList.toggle('btnX');
}, false);


//click en la x para cerrar sugerencias

buscar.addEventListener('click', () => {
    inputField.value = '';
    listaUl.classList.toggle('list-Active');
    listaUl.classList.toggle('list-sugerencia');
}, false);


//buscador focus

inputField.addEventListener('focus', () => {
    listaUl.classList.toggle('list-Active');
    listaUl.classList.toggle('list-sugerencia');
}, false);

inputField.addEventListener('keyup', (busqueda) => {
    busqueda = inputField.value;
    barraSugerencias(busqueda);
}, false)

//-------función para crear sugerencias en la barra de busqueda--------------

async function barraSugerencias(busqueda_ingresada) {
    let urlSuguerencias = `https://api.giphy.com/v1/gifs/search/tags?api_key=${claveAppi}&q=${busqueda_ingresada}&limit=4`;

    listaUl.innerHTML = '';
    if (busqueda_ingresada != null) {

        fetch(urlSuguerencias)
            .then(res => res.json())
            .then(dataSug => {
             
                for (let res of dataSug.data) {
                    
                    let sugerenciaLI = document.createElement('li');
                    sugerenciaLI.setAttribute('id', 'li-' + res.name);
                    sugerenciaLI.innerHTML = `<i class = "btn" id="btn-buscar" ></i>${res.name}`;

                    sugerenciaLI.addEventListener('click', () => {

                        busqueda(res.name);

                        let divTitleInitial = document.getElementById('divTitleId');
                        divTitleInitial.innerHTML = '';
                        document.getElementById('buscar_texto1').value = res.name;
                        crearTitle()
                        crearbtnVerMas();
                    }, false);

                    listaUl.appendChild(sugerenciaLI);

                }
            })
            .catch(err => {
                console.error('ha fallado', err);

            });
    }

}

//********funcion para descargar gifo*******

async function downloadGifos(img) {

    let elementA = document.createElement('a');
    let response = await fetch(img.src);
    let file = await response.blob();
    elementA.download = 'newGif.gif';
    elementA.href = window.URL.createObjectURL(file);
    elementA.dataset.downloadurl = ['application/octet-stream', elementA.download, elementA.href].join(':');
    elementA.click();
};


//********función para llamar los Gifos de la barra de busqueda*******


function busqueda(value, pagina) {

    let urlAppi = `https://api.giphy.com/v1/gifs/search?api_key=${claveAppi}&q=${value}&limit=12&offset=${pagina}`;

    if (value != null) {
        fetch(urlAppi)
            .then(res => res.json())
            .then(dataImg => {

                numeroResultados = 0;
                for (let res of dataImg.data) {
                    numeroResultados += 1;
                    console.log('dentro for ' + numeroResultados);
                    console.log(dataImg.data);

                    let img = document.createElement('img');
                    img.setAttribute('class', 'img_barra_busqueda');
                    img.setAttribute('src', res.images.original.url);
                    img.setAttribute('id', res.id);
                    img.setAttribute('title', res.title);
                    img.setAttribute('user', res.username);

                    let divBtneshover = document.createElement('div'); // div donde aparecen los botones
                    divBtneshover.id = 'divBtneshover';

                    let divimg = document.createElement('div'); //div donde van los gifs
                    divimg.id = 'imagenGifs';

                    search.appendChild(divBtneshover);
                    divBtneshover.appendChild(divimg);
                    divimg.appendChild(img);

                    //*********agregar ususario en el hover********** */
                    let user = document.createElement('div');
                    user.classList.add('btnFavoritosOff');
                    let parrafoUser = document.createElement('p');
                    parrafoUser.setAttribute('class', 'parrafo_p');
                    parrafoUser.innerHTML = (res.username);

                    user.appendChild(parrafoUser);

                    let usuarioAnonimo = "Anonimo";

                    if (res.username == '') {
                        parrafoUser.innerHTML = (usuarioAnonimo)
                    };

                    //**********agregar tituloen el hover******* */
                    let titulo_Gifo = document.createElement('div');
                    titulo_Gifo.classList.add('btnFavoritosOff');
                    let elemenTituloGifo = document.createElement('h4');
                    elemenTituloGifo.setAttribute('class', 'title_gifo_n');
                    elemenTituloGifo.innerHTML = (res.title);

                    titulo_Gifo.appendChild(elemenTituloGifo);

                    if (res.title == '') {
                        elemenTituloGifo.innerHTML = (usuarioAnonimo)
                    };

                    //agregar btn favorito en el hover************
                    let btnFavoritos = document.createElement('div'); 
                    btnFavoritos.classList.toggle('btnFavoritosOff');
                    let corazon = document.createElement('img');
                    corazon.setAttribute('class', 'btnFavorito');
                    corazon.setAttribute('src', 'zip/assets/icon-fav.svg');

                    corazon.id = 'img_iconosenhover';

                    //***********agregar btn descarga en el hover******** */
                    let btnDescarga = document.createElement('div'); 
                    btnDescarga.classList.toggle('btnFavoritosOff');
                    let descargaGifo = document.createElement('img');
                    descargaGifo.setAttribute('class', 'btnDescarga');

                    descargaGifo.id = 'img_iconosenhover';

                    descargaGifo.addEventListener('click', () => {
                        return downloadGifos(img)
                    }, false);

                    //***********agregar btn expandir en el hover******** */
                    let btnexpandir = document.createElement('div'); 
                    btnexpandir.classList.toggle('btnFavoritosOff');
                    let expandirGifo = document.createElement('img');
                    expandirGifo.setAttribute('class', 'btnExpan');

                    expandirGifo.id = 'img_iconosenhover';

                    divBtneshover.appendChild(user);
                    divBtneshover.appendChild(titulo_Gifo);


                    divBtneshover.appendChild(btnFavoritos); //añadir btn corazon al div de botones
                    btnFavoritos.appendChild(corazon);


                    divBtneshover.appendChild(btnDescarga); //añadir el btn descarga al div botones
                    btnDescarga.appendChild(descargaGifo);


                    divBtneshover.appendChild(btnexpandir); //añadir el divexpandir al div botones
                    btnexpandir.appendChild(expandirGifo);

                    divBtneshover.classList.add('img_barra_busqueda');
                    divimg.classList.add('img_barra_busqueda');

                    //--------botones que van en el expandir--------------
                    let favExpandirGifo = document.createElement('div');
                    favExpandirGifo.setAttribute('class', 'favExpandirGifo_carrusel');
                    let corazon_expandir = document.createElement('img');
                    corazon_expandir.setAttribute('src', 'zip/assets/icon-fav.svg');
                    favExpandirGifo.appendChild(corazon_expandir);


                    let downExpandirGifo = document.createElement('div');
                    downExpandirGifo.setAttribute('class', 'downExpandirGifo_carrusel');
                    let descargar_expandir = document.createElement('img');
                    descargar_expandir.setAttribute('src', 'zip/assets/icon-download.svg');
                    downExpandirGifo.appendChild(descargar_expandir);

                    //*******funcion expandir gif************ */

                    function gif_expand0() {

                        let img_expandir1 = document.getElementById('img-expandir1');
                        img_expandir1.setAttribute('class', 'expGifNuevoDiv');
                        let p_expan = document.getElementById('user_gif1');
                        let subti_expan = document.getElementById('tituloGifExpandir1');

                        contenedorExpandirGifo.appendChild(favExpandirGifo);
                        contenedorExpandirGifo.appendChild(downExpandirGifo);

                        img_expandir1.setAttribute('src', img.src);
                        p_expan.innerHTML = (img.user);

                        subti_expan.innerHTML = (img.title);

                        let usuario_undefined = "Anonimo";

                        if (img.user == undefined) {
                            p_expan.innerHTML = (usuario_undefined)
                        };

                        if (img.title == undefined) {
                            subti_expan.innerHTML = (usuario_undefined)
                        };

                    };

                    //****evento click para expandir el gif ********************* */
                    expandirGifo.addEventListener('click', () => {

                        contenedorExpandirGifo.classList.toggle('move');
                        gif_expand0();

                    }, false);

                    //****funcion sessionstorage en expandir para pasar a favoritos******** */
                    function sessionStorageExpandir1() {
                        if (corazon_expandir.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                            arraySessionSTorage.push(img.src);
                            console.log(arraySessionSTorage);
                        } else {
                            arraySessionSTorage.pop(img.src);
                            console.log(arraySessionSTorage);
                        }
                        var arraySession = JSON.stringify(arraySessionSTorage);
                        sessionStorage.setItem('nuevoArray', arraySession);
                    };

                    //***********evento favorito en el expandido********* */

                    corazon_expandir.addEventListener('click', () => {
                        if (corazon_expandir.getAttribute('src') =='zip/assets/icon-fav-active.svg') {

                            corazon_expandir.setAttribute('src', 'zip/assets/icon-fav.svg');
                            corazon_expandir.setAttribute('class', 'btnFavorito');

                        } else {
                            corazon_expandir.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                            corazon_expandir.setAttribute('class', 'btnFavoritoActive');

                        }

                    }, false);
                    //*************evento de favorito dentro del expandir***** */

                    corazon_expandir.addEventListener('click', () => {
                        sessionStorageExpandir1();
                    })

                    //*******evento de descarga dentro del expandir*** */

                    descargar_expandir.addEventListener('click', () => {

                        return downloadGifos(img);
                    }, false);


                    //***************guardar gifs en array para sessionstorage********************* */

                    function sessionStorage1() {
                        if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                            arraySessionSTorage.push(img.src);
                            //console.log(arraySessionSTorage);
                        } else {
                            arraySessionSTorage.pop(img.src);
                            //console.log(arraySessionSTorage);
                        }
                        var arraySession = JSON.stringify(arraySessionSTorage);
                        sessionStorage.setItem('nuevoArray', arraySession);
                    };

                    //---------evento click para que el corazon quede activo y se guarde sessionstorage-----
                    corazon.addEventListener('click', () => {
                        if (corazon.getAttribute('src') =='zip/assets/icon-fav-active.svg') {

                            corazon.setAttribute('src', 'zip/assets/icon-fav.svg');
                            corazon.setAttribute('class', 'btnFavorito');

                        } else {
                            corazon.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                            corazon.setAttribute('class', 'btnFavoritoActive');

                        }

                    }, false);

                    corazon.addEventListener('click', () => {
                        sessionStorage1();
                    }, false);




                    //evento mouseover y mouseout sobre cada gif para que aparezcan los botones de favorito, descarga y expandir----------
                    divBtneshover.addEventListener('mouseover', () => {
                        divBtneshover.classList.toggle('btnFavoritohover');
                        divimg.classList.toggle('opacidad');

                        user.classList.toggle('btnFavoritosOff');
                        user.classList.toggle('parrafoUsuario');

                        titulo_Gifo.classList.toggle('btnFavoritosOff');
                        titulo_Gifo.classList.toggle('usuarioHover');

                        btnFavoritos.classList.toggle('btnFavoritosOff');
                        btnFavoritos.classList.toggle('btnFavoritosOn');

                        //***********evento mouseover para cambiar el hover del icono favorito*******

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


                        btnDescarga.classList.toggle('btnFavoritosOff');
                        btnDescarga.classList.toggle('btnFavoritosOn');

                        //evento mouseover para cambiar el hover del icono descarga
                        btnDescarga.addEventListener('mouseover', () => {
                            descargaGifo.setAttribute('class', 'btnDescargaHover');

                        }, false);

                        btnDescarga.addEventListener('mouseout', () => {
                            descargaGifo.setAttribute('class', 'btnDescarga');

                        }, false);


                        btnexpandir.classList.toggle('btnFavoritosOff');
                        btnexpandir.classList.toggle('btnFavoritosOn');

                        //evento mouseover para cambiar el hover del icono expandir
                        btnexpandir.addEventListener('mouseover', () => {
                            expandirGifo.setAttribute('class', 'btnExpanHover');

                        }, false);

                        btnexpandir.addEventListener('mouseout', () => {
                            expandirGifo.setAttribute('class', 'btnExpan');

                        }, false);


                    }, false)

                    divBtneshover.addEventListener('mouseout', () => {
                        divBtneshover.classList.toggle('btnFavoritohover');
                        divimg.classList.toggle('opacidad');

                        user.classList.toggle('btnFavoritosOff');
                        user.classList.toggle('parrafoUsuario');


                        titulo_Gifo.classList.toggle('btnFavoritosOff');
                        titulo_Gifo.classList.toggle('usuarioHover');

                        btnFavoritos.classList.toggle('btnFavoritosOn');
                        btnFavoritos.classList.toggle('btnFavoritosOff');

                        btnDescarga.classList.toggle('btnFavoritosOn');
                        btnDescarga.classList.toggle('btnFavoritosOff');

                        btnexpandir.classList.toggle('btnFavoritosOn');
                        btnexpandir.classList.toggle('btnFavoritosOff');


                    }, false);

                    
                        //************evento touch version Mobile */

                        img.addEventListener('touchstart', () => {

                            contenedorExpandirGifo.classList.toggle('move');
                            gif_expand0();

                        }, false);


                }

                
                if (numeroResultados == 0) {
                    loreImpsumVisible();
                    let searchOculto = document.getElementById('search_barOn1');
                    searchOculto.style.display = 'none';

                } else {
                    let loremIpsum = document.getElementById('divloremIpsum');
                    loremIpsum.setAttribute('class', 'lorem');

                    let searchOculto = document.getElementById('search_barOn1');
                    searchOculto.style.display = 'block';

                }

            })
            .catch(err => {
                console.error('ha fallado', err);

            });
    }
}
busqueda();


closeExpandirGif.addEventListener('click', () => {
    if (contenedorExpandirGifo.lastChild) {
        contenedorExpandirGifo.removeChild(contenedorExpandirGifo.lastChild);

    }

    contenedorExpandirGifo.classList.toggle('move');

}, false)


//----------------------llamado a evento enter en barra de busqueda--------------------------

inputField.addEventListener('keyup', (event) => {

    if (event.keyCode === 13) {
        search.innerHTML = '';

        let divTitleInitial = document.getElementById('divTitleId');
        divTitleInitial.innerHTML = '';
        let resultVerMas = document.getElementById('divMoreResultId');
        resultVerMas.innerHTML = '';

        busqueda(inputField.value, 0)

        if (inputField.value != undefined && inputField.value != '') {
            crearTitle();
            crearbtnVerMas();

        }


    }
})

//*******llamado a evento click en barra de busqueda********

buscar.addEventListener('click', () => {
    search.innerHTML = '';

    let divTitleInitial = document.getElementById('divTitleId');
    divTitleInitial.innerHTML = '';

    let resultVerMas = document.getElementById('divMoreResultId');
    resultVerMas.innerHTML = '';


    busqueda(inputField.value, 0)
    if (search.value != '') {
        crearTitle();
        crearbtnVerMas();
    }

});

//evento click en el boton VerMas

let numeroPag = 0;
const limitPag = 12;

divbtnVerMas.addEventListener('click', () => {

    numeroPag = numeroPag + limitPag;
    busqueda(inputField.value, numeroPag);

})


