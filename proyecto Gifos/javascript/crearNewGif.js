//---------------Panel para crear un nuevo gifo-----------------

let accesoCamara = document.getElementById('comenzar');
let grabar = document.getElementById('grabar');
let finalizar = document.getElementById('finalizar');
let subirGifo = document.getElementById('btnSubirGifo');


let cuadro_paso1 = document.getElementById('cuadro_paso1');
let cuadro_paso2 = document.getElementById('cuadro_paso2');
//let cuadro_paso3 = document.getElementById('cuadro_paso3')

let nuevaCaptura = document.getElementById('nuevaCaptura');
const containerExpan_misGifos = document.querySelector('.containerExpan_misGifos');
const closeExpan_misGifos = document.getElementById('closeExpan_misGifos')



let array_MisGifos = [];

let nuevosGifos = document.getElementById('nuevosGifos');
let mainGifos = document.getElementById('mainMisGifos');
let addGifos = document.createElement('div');
let agregarNuevosGifos = document.createElement('div');
agregarNuevosGifos.id = 'addGifos';


let video = document.getElementById('video');
let gifNuevoGrabado = document.getElementById('gifNuevoGrabado');
gifNuevoGrabado.setAttribute('src', '');
let urlGif = '';

let subiendo_gifo = document.getElementById('subiendoGif');
//let grabar_Video = document.getElementById('grabarVideo');



/***********creando contenedor para hover cuando se oprima el evento subir gifo******/

let contenedorHoverGifosCreados = document.createElement('div');
contenedorHoverGifosCreados.classList.add('displayNone');

let contenedorsubiendoGif = document.createElement('div');
contenedorsubiendoGif.classList.add('displayNone');

let contenedorTexto = document.createElement('p');
contenedorTexto.innerText = 'Estamos subiendo tu GIFO';
contenedorTexto.classList.add('displayNone');

let contenedorImagen = document.createElement('img');
contenedorImagen.setAttribute('src', 'zip/assets/loader.svg');
contenedorImagen.classList.add('displayNone');

let btnDownGIfos = document.createElement('div');
btnDownGIfos.classList.add('displayNone');

let btnDownGIfosImagen = document.createElement('img');
btnDownGIfosImagen.setAttribute('src', 'zip/assets/icon-download.svg');

btnDownGIfos.appendChild(btnDownGIfosImagen);

let btnEnlazarLink = document.createElement('div');
btnEnlazarLink.classList.add('displayNone');

let btnEnlazarLinkImagen = document.createElement('img');
btnEnlazarLinkImagen.setAttribute('src', 'zip/assets/icon-link-normal.svg');

btnEnlazarLink.appendChild(btnEnlazarLinkImagen);


contenedorHoverGifosCreados.appendChild(contenedorsubiendoGif);
contenedorHoverGifosCreados.appendChild(contenedorImagen);
contenedorHoverGifosCreados.appendChild(contenedorTexto);
contenedorHoverGifosCreados.appendChild(btnDownGIfos);
contenedorHoverGifosCreados.appendChild(btnEnlazarLink);
contenedorHoverGifosCreados.appendChild(video);
contenedorHoverGifosCreados.appendChild(gifNuevoGrabado);

grabar_Video.appendChild(contenedorHoverGifosCreados);





//*******btn Ver Mas *******/
let btnVerMasMisGifos = document.createElement('div');
btnVerMasMisGifos.setAttribute('class', 'btnVerMasMisGifs');



//************funcion activar camara****************


function camaraActiva() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true

    }).then(async function (stream) {

        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };

        if (video.srcObject = stream) {
            cuadro_paso2.classList.toggle('cuadro_paso2');
            cuadro_paso2.classList.toggle('cuadro_paso1_Active');

            cuadro_paso1.classList.toggle('cuadro_paso1_Active');
            cuadro_paso1.classList.toggle('cuadro_paso1');

            document.getElementById('titulosCrearGifo').style.display = 'none';
            document.getElementById('video').style.display = 'block';

            document.getElementById('btnCrearNuevoGifo').style.display = 'none';
            document.getElementById('btnGrabar').style.display = 'block';
        }

    })
};

//**************evento COMENZAR ****************************/


accesoCamara.addEventListener('click', () => {

    document.getElementById('titleCrearGifo').style.display = 'none';
    document.getElementById('titleCrearGifo2').style.display = 'block';

    document.getElementById('subtitleCrearGifo').style.display = 'none';
    document.getElementById('subtitleCrearGifo2').style.display = 'block';

    cuadro_paso1.classList.toggle('cuadro_paso1');
    cuadro_paso1.classList.toggle('cuadro_paso1_Active');

    camaraActiva();

    contenedorHoverGifosCreados.setAttribute('class', 'grabarVideo');

    grabar_Video.setAttribute('class', 'displayBlock');

    document.getElementById('gifNuevoGrabado').style.display = 'none';
    document.getElementById('repetirCaptura').style.display = 'none';
    contenedorsubiendoGif.classList.add('displayNone');
    contenedorTexto.classList.add('displayNone');
    contenedorImagen.classList.add('displayNone');
    btnDownGIfos.classList.add('displayNone');
    btnEnlazarLink.classList.add('displayNone');

    document.getElementById('btnCrearNuevoGifo').style.display = 'none';
    document.getElementById('btnGrabar').style.display = 'none';

}, false);



//*****funcion para descargar gifo********* */

async function downNuevosGifos(gifNuevoGrabado) {

    let a = document.createElement('a');
    let res = await fetch(gifNuevoGrabado.src);
    let file = await res.blob();
    a.download = 'newGifos.gif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();

};

//**********funcion para el boton link que aparece en el hover *******************/
function ClipboardLink(urlGif) {
    navigator.clipboard.writeText(urlGif).then(function () {
        alert('URL copiada en el portapapeles');
    }, function () {
        alert('URL no se ha copiado en el portapapeles');
    });
}


//***funcion video***************** */

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 480,
            height: 320
        }
    }).then(async function (stream) {
        video.srcObject = stream;
        video.play();


        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('started')
            },
        });
        recorder.startRecording();
        recorder.stream = stream;

        finalizar.addEventListener('click', pararGrabacion, false);

        function pararGrabacion() {

            recorder.stopRecording(function () {
                recorder.stream.stop();
                gifNuevoGrabado.src = URL.createObjectURL(recorder.getBlob());



                function subirGifo2(num2) {

                    contenedorsubiendoGif.setAttribute('class', 'subirGif');
                    contenedorTexto.setAttribute('class', 'textoGif');
                    contenedorImagen.setAttribute('class', 'imagenGif');


                    let form = new FormData();
                    form.set('file', recorder.getBlob(), 'tugifo.gif');
                    console.log(form.get('file'));
                    const claveAppi2 = "api_key=Klh9bWjqkTnuKjIcwmSyb8Dob4QeCTtb";

                    fetch(`https://upload.giphy.com/v1/gifs?${claveAppi2}`, {
                            method: "POST",
                            body: form
                        })

                        .then(res => {
                            console.log(res.status); //eliminar
                            return res.json();
                        }).then(data => {
                            dataId = data.data.id;
                            fetch("https://api.giphy.com/v1/gifs/" + dataId + "?&" + claveAppi2)
                                .then(response => {
                                    return response.json();
                                }).then(obj => {
                                    console.log(obj);
                                    urlGif = obj.data.images.original.url;
                                    urlGif.id = 'url-tu-gifo';
                                    console.log(urlGif);
                                    sessionStorage.setItem(dataId, JSON.stringify(obj));

                                    contenedorImagen.setAttribute('src', 'zip/assets/check.svg');
                                    contenedorTexto.innerText = 'GIFO subido con éxito';

                                    btnDownGIfos.setAttribute('class', 'btnDownGif')
                                    btnEnlazarLink.setAttribute('class', 'btnEnlaceLink')



                                    //******evento en el boton descargar gifo**************

                                    btnDownGIfos.addEventListener('click', () => {
                                        downNuevosGifos(gifNuevoGrabado);
                                    }, false);

                                    //*******evento en el boton enlazar link *******/

                                    btnEnlazarLink.addEventListener('click', () => {
                                        ClipboardLink(urlGif);
                                    }, false);

                                    array_MisGifos.push(dataId);
                                    sessionStorage.setItem('oneGifos', dataId);
                                    let doGifo = sessionStorage.getItem('oneGifos');

                                    let valorGif = sessionStorage.getItem(doGifo);
                                    let gifoParse = JSON.parse(valorGif);
                                    let gifoUrl = gifoParse.data.images.original.url;


                                    nuevosGifos.setAttribute('class', 'displayNone');
                                    mainGifos.appendChild(agregarNuevosGifos);
                                    agregarNuevosGifos.classList.add('add-new-gifos')

                                    let gifenMisGifos = document.createElement('img');
                                    gifenMisGifos.src = gifoUrl;

                                    gifenMisGifos.classList.add('gifo-imagen');
                                    agregarNuevosGifos.appendChild(gifenMisGifos);

                            
                                    let hoverEnGifoNew = document.createElement('div');
                                    hoverEnGifoNew.classList.add('gif-en-mis-gifos-div');

                                    let otro_hover = document.createElement('div');
                                    otro_hover.classList.add('interior');
                                    otro_hover.appendChild(gifenMisGifos);
                                    hoverEnGifoNew.appendChild(otro_hover);

                                    //******* contenedor y botones para el hover en mis gifos************/

                                    let btnEliminar = document.createElement('div');
                                    btnEliminar.classList.toggle('displayNone');
                                    imgBtnEliminar = document.createElement('img');
                                    imgBtnEliminar.setAttribute('src', 'zip/assets/icon-trash-normal.svg');
                                    btnEliminar.appendChild(imgBtnEliminar);

                                    let btnDownGIf2 = document.createElement('div');
                                    btnDownGIf2.classList.add('displayNone');
                                    let imgBtnDownGIf2 = document.createElement('img');
                                    imgBtnDownGIf2.setAttribute('src', 'zip/assets/icon-download.svg');
                                    btnDownGIf2.appendChild(imgBtnDownGIf2);

                                    let btnexpandir2 = document.createElement('div');
                                    btnexpandir2.classList.toggle('displayNone');
                                    let expandirGifo = document.createElement('img');
                                    expandirGifo.setAttribute('src', 'zip/assets/icon-max-normal.svg');
                                    btnexpandir2.appendChild(expandirGifo);

                                    hoverEnGifoNew.appendChild(btnEliminar);
                                    hoverEnGifoNew.appendChild(btnDownGIf2);
                                    hoverEnGifoNew.appendChild(btnexpandir2);

                                    agregarNuevosGifos.appendChild(hoverEnGifoNew);
                                    agregarNuevosGifos.appendChild(btnVerMasMisGifos);


                                    //***********evento mouseover para que aparezcan los botones en el hover de mis gifos*** */

                                    hoverEnGifoNew.addEventListener('mouseover', () => {
                                        hoverEnGifoNew.classList.toggle('btnFavoritohover');
                                        otro_hover.classList.toggle('opacidad');

                                        btnEliminar.classList.toggle('displayNone');
                                        btnEliminar.classList.toggle('btnEliminar');

                                        btnDownGIf2.classList.toggle('displayNone');
                                        btnDownGIf2.classList.toggle('btnDownGIf2');

                                        btnexpandir2.classList.toggle('displayNone');
                                        btnexpandir2.classList.toggle('btnexpandir2');

                                    }, false);


                                    hoverEnGifoNew.addEventListener('mouseout', () => {
                                        hoverEnGifoNew.classList.toggle('btnFavoritohover');
                                        otro_hover.classList.toggle('opacidad');
                                        btnEliminar.classList.toggle('displayNone');
                                        btnEliminar.classList.toggle('btnEliminar');

                                        btnDownGIf2.classList.toggle('displayNone');
                                        btnDownGIf2.classList.toggle('btnDownGIf2');

                                        btnexpandir2.classList.toggle('displayNone');
                                        btnexpandir2.classList.toggle('btnexpandir2');

                                    }, false);

                                    //**********Hover en boton eliminar************** */

                                    btnEliminar.addEventListener('mouseover', () => {
                                        imgBtnEliminar.setAttribute('src', 'zip/assets/icon-trash-hover.svg');
                                    }, false);


                                    btnEliminar.addEventListener('mouseout', () => {
                                        imgBtnEliminar.setAttribute('src', 'zip/assets/icon-trash-normal.svg');
                                    }, false);

                                    //**********Hover en boton descargar************** */

                                    btnDownGIf2.addEventListener('mouseover', () => {
                                        imgBtnDownGIf2.setAttribute('src', 'zip/assets/icon-download-hover.svg');
                                    }, false);


                                    btnDownGIf2.addEventListener('mouseout', () => {
                                        imgBtnDownGIf2.setAttribute('src', 'zip/assets/icon-download.svg');
                                    }, false);

                                    //**********Hover en boton Expandir************** */

                                    btnexpandir2.addEventListener('mouseover', () => {
                                        expandirGifo.setAttribute('src', 'zip/assets/icon-max-hover.svg');
                                    }, false);


                                    btnexpandir2.addEventListener('mouseout', () => {
                                        expandirGifo.setAttribute('src', 'zip/assets/icon-max-normal.svg');
                                    }, false);

                                    //*******evento eliminar gifo******* */

                                    btnEliminar.addEventListener('click', () => {
                                        otro_hover.removeChild(gifenMisGifos);
                                        agregarNuevosGifos.removeChild(hoverEnGifoNew);
                                        agregarNuevosGifos.removeChild(btnVerMasMisGifos);

                                        if (!agregarNuevosGifos.firstChild) {
                                            nuevosGifos.setAttribute('class', 'displayBlock');
                                            agregarNuevosGifos.setAttribute('class', 'displayNone');
                                        }
                                    }, false);

                                    //********evento descargar gifo************* */

                                    btnDownGIf2.addEventListener('click', () => {
                                        downNuevosGifos(gifNuevoGrabado);
                                    }, false);


                                    //*************evento expandir gifo************** */

                                    //--------botones que van en el expandir--------------
                                    let favExpandirMisGifos = document.createElement('div');
                                    favExpandirMisGifos.setAttribute('class', 'favExpandirGifo_carrusel');
                                    let corazon_expandirMisgifos = document.createElement('img');
                                    corazon_expandirMisgifos.setAttribute('src', 'zip/assets/icon-fav.svg');
                                    favExpandirMisGifos.appendChild(corazon_expandirMisgifos);


                                    let downExpandirMisGifos = document.createElement('div');
                                    downExpandirMisGifos.setAttribute('class', 'downExpandirGifo_carrusel');
                                    let descargar_expandirMisGifos = document.createElement('img');
                                    descargar_expandirMisGifos.setAttribute('src', 'zip/assets/icon-download.svg');
                                    downExpandirMisGifos.appendChild(descargar_expandirMisGifos);

                                    function gif_expandMisGifos() {

                                        let img_expandirMisGifos = document.getElementById('img-expandirMisGifos');
                                        img_expandirMisGifos.setAttribute('class', 'expGifNuevoDiv');
                                        let p_MisGifos = document.getElementById('user_gifMisGifos');
                                        let subti_MisGifos = document.getElementById('tituloGifExpandirMisGifos');

                                        containerExpan_misGifos.appendChild(favExpandirMisGifos);
                                        containerExpan_misGifos.appendChild(downExpandirMisGifos);

                                        let usuario_undefined = "Anonimo";
                                        img_expandirMisGifos.setAttribute('src', gifoUrl);
                                        p_MisGifos.innerHTML = (usuario_undefined);
                                        subti_MisGifos.innerHTML = (usuario_undefined);

                                    };


                                    //************expandir gifo************** */
                                    btnexpandir2.addEventListener('click', () => {

                                        containerExpan_misGifos.classList.toggle('move');
                                        gif_expandMisGifos();

                                    }, false);

                                    //*******evento favoritos en el expandir******* */

                                    //****funcion sessionstorage en expandir para pasar a favoritos******** */
                                    function sessionStorageExpandir2() {
                                        if (corazon_expandirMisgifos.getAttribute('src') =='zip/assets/icon-fav-active.svg') {
                                            arraySessionSTorage.push(gifoUrl);
                                            console.log(arraySessionSTorage);
                                        } else {
                                            arraySessionSTorage.pop(gifoUrl);
                                            console.log(arraySessionSTorage);
                                        }
                                        var arraySession = JSON.stringify(arraySessionSTorage);
                                        sessionStorage.setItem('nuevoArray', arraySession);
                                    };

                                    //***********evento favorito en el expandido********* */

                                    corazon_expandirMisgifos.addEventListener('click', () => {
                                        if (corazon_expandirMisgifos.getAttribute('src') =='zip/assets/icon-fav-active.svg') {

                                            corazon_expandirMisgifos.setAttribute('src', 'zip/assets/icon-fav.svg');
                                            corazon_expandirMisgifos.setAttribute('class', 'btnFavorito');

                                        } else {
                                            corazon_expandirMisgifos.setAttribute('src', 'zip/assets/icon-fav-active.svg');
                                            corazon_expandirMisgifos.setAttribute('class', 'btnFavoritoActive');

                                        }

                                    }, false);
                                    //*************evento de favorito dentro del expandir***** */

                                    corazon_expandirMisgifos.addEventListener('click', () => {
                                        sessionStorageExpandir2();
                                    })



                                    //****evento descargar en el expandir******* */

                                    descargar_expandirMisGifos.addEventListener('click', () => {
                                        downNuevosGifos(gifNuevoGrabado);
                                    }, false);


                                    //************expandir version mobile******* */

                                    gifenMisGifos.addEventListener('touchstart', () => {

                                        containerExpan_misGifos.classList.toggle('move');
                                        gif_expandMisGifos();

                                    }, false);


                                })



                        })




                };


                //subirGifo.addEventListener('click', subirGifo2, false);
                subirGifo.addEventListener('click', () => {

                    document.getElementById('btnSubirGifo').style.display = 'none';
                    document.getElementById('repetirCaptura').style.display = 'none';
                    cuadro_paso2.classList.toggle('cuadro_paso1_Active');
                    cuadro_paso2.classList.toggle('cuadro_paso2');
                    //cuadro_paso3.setAttribute('class','cuadro_paso3');
                    cuadro_paso3.setAttribute('class', 'cuadro_paso1_Active');
                    subirGifo2(num2);



                }, false);


                    let num2 = 8;
                    const limitePage2 = 8;
                 
    
                    btnVerMasMisGifos.addEventListener('click', () => {
                        while (agregarNuevosGifos.firstChild) {
                            agregarNuevosGifos.removeChild(agregarNuevosGifos.firstChild);
                        }
                        num2 = num2 + limitePage2;
                        subirGifo2(num2);
    
                    }, false);
    

            })


        };



    });



};


closeExpan_misGifos.addEventListener('click', () => {
    if (containerExpan_misGifos.lastChild) {
        containerExpan_misGifos.removeChild(containerExpan_misGifos.lastChild);

    }

    containerExpan_misGifos.classList.toggle('move');

}, false)






//**********cronometro ************/

let cronometro;
let verificador = false;
let tiempo = 0;

function stop() {
    clearInterval(cronometro);
}

function resetearContador() {
    verificador = false;
    tiempo = 0;
    cronometro.innerHTML = tiempo;
    clearInterval(cronometro);
}

function time() {
    let hora = 0;
    let minuto = 0;
    let segundo = 0;

    let hour = document.getElementById('horas');
    let minute = document.getElementById('minutos');
    let second = document.getElementById('segundos');
    cronometro = setInterval(function () {
        if (segundo == 60) {
            segundo = 0;
            minuto++;
            minute.innerHTML = minuto;
            if (minuto == 60) {
                minuto == 0;
                hora++;
                hour.innerHTML = hora;
            }
        }
        segundo++
        second.innerHTML = segundo;
    }, 1000)
}


//---------------evento GRABAR-----------------
grabar.addEventListener('click', () => {

    document.getElementById('cronometro').style.display = 'block';

    getStreamAndRecord()
    time();

    document.getElementById('btnGrabar').style.display = 'none';
    document.getElementById('btnFinalizar').style.display = 'block';

});

//**evento FINALIZAR**********/

finalizar.addEventListener('click', () => {
    document.getElementById('cronometro').style.display = 'none';
    document.getElementById('repetirCaptura').style.display = 'block';


    document.getElementById('btnFinalizar').style.display = 'none';
    document.getElementById('btnSubirGifo').style.display = 'block';
    stop();

    document.getElementById('video').style.display = 'none';
    document.getElementById('gifNuevoGrabado').style.display = 'block';

});

//** evento NUEVA CAPTURA****************/
nuevaCaptura.addEventListener('click', () => {
    document.getElementById('cronometro').style.display = 'block';
    document.getElementById('repetirCaptura').style.display = 'none';

    document.getElementById('btnGrabar').style.display = 'block';
    document.getElementById('btnSubirGifo').style.display = 'none';

    document.getElementById('video').style.display = 'block';
    document.getElementById('gifNuevoGrabado').style.display = 'none';

    resetearContador();

});