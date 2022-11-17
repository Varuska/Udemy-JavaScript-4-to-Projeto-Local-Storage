//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listenners
eventListeners();
//Cuando el usuario agrega un nuevo tweet
function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);

    //Cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();

    });
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')

        return;//Previene que se ejecute mas lineas de codigo.
    }

    const tweetObj = {
        id: Date.now(), //Segundos desde 1970
        tweet //=> En js cuando la llave y el valor tienen el mismo nombre se puede dejar solo uno tipo  tweet : tweet; 
    }

    //Añadir al arreglos de tweets

    tweets = [...tweets, tweetObj]

    crearHTML();

    formulario.reset();

}

// Mostrar Mensaje de error

function mostrarError(error) {

    const mensajeError = document.createElement('p'); //Para crear un Error
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina el mensaje de alerta despues de 3s.

    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

//setTimeOut Una vez ejecutado se elimina el mensaje de error

//Muestra un listado de los tweets

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => { //Para iterar.

            //Agregar un boton para eliminar
            const btnEliminar = document.createElement('a'); //Creando un enlace
            btnEliminar.classList = 'borrar-tweet';
            btnEliminar.innerText = ' X ';


            //Crear el Html

            const li = document.createElement('li');
            // añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            // Añadir un atributo unico
            li.dataset.tweetId = tweet.id;

            // Insertarlo en el HTMl 
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}

//Elimina un tweet
function borrarTweet(e) {
    e.preventDefault();

    const id = e.target.parentElement.dataset.tweetId;

    tweets = tweets.filter(tweet => tweet.id != id);

    crearHTML();
}


// Agregar los tweets actuales a localStorage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Limpiar html

function limpiarHTML() {
    while (listaTweets.firstChild)
        listaTweets.removeChild(listaTweets.firstChild) //Elimina el primer hijo que va encontrando.
}