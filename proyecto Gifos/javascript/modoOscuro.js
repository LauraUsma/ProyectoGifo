//modo oscuro
let linkShitch = document.querySelector('#clickBox');
var numeroResultados = 0;


linkShitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.value === 'dark') {
        linkShitch.innerHTML = 'MODO DIURNO';

    } else {
        linkShitch.innerHTML = 'MODO NOCTURNO';
    }

});