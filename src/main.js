/*const createNode = (element) => {
    return document.createElement(element);
};

const appendNode = (parent, element) => {
    return parent.appenChild(element);
};*/

    /*.then(data => {
        let div = createNode('div');
        let img = createNode('img');
        let span = createNode('span');
        img.src = data.Poster;
        span.innerHTML = data.Title;
        appendNode(div,img);
        appendNode(div, span);
        appendNode(document.getElementById('moviesContainer'),div);
    })*/

const arrMovies = [
    'captain america', 
    'captain marvel', 
    'iron man', 
    'iron man 2', 
    'the incredible hulk', 
    'thor',
    'the avengers', 
    'iron man 3', 
    'thor the dark world', 
    'captain america the winter soldier',
    'guardians of the galaxy',
    'guardians of the galaxy vol. 2',
    'avengers age of ultron',
    'ant man',
    'captain america civil war',
    'spider man homecoming',
    'doctor strange',
    'black panther',
    'thor ragnarok',
    'ant man and the wasp',
    'avengers infinity war'
];

const apiKey = 'a7c19d97';

//Crear contenedores con poster de pelis
let createContainers = arrMovies.map(arrMovies => {
    fetch('http://www.omdbapi.com/?apikey=' + apiKey + '&t=' + arrMovies)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let movieContainer = document.getElementById('moviesContainer');
        let createPoster = document.createElement('img');
        createPoster.setAttribute('id', data.imdbID);
        createPoster.setAttribute('src', data.Poster);
        createPoster.addEventListener('click', showInfoModal);
        movieContainer.appendChild(createPoster);
        document.getElementById('moviesContainer').appendChild(movieContainer);        
        }
    )
});

/*const urlVideoS = [
    'https://www.youtube.com/embed/mGqYQog6biY',
    'https://www.youtube.com/embed/Z1BCujX3pw8',
    'https://www.youtube.com/embed/8hYlB38asDY'

];

let videos = urlVideoS.map(urlVideoS => urlVideoS);
console.log(videos);*/

//Crear modal con info de pelis
const showInfoModal = () => {
    let id = this.event.target.id;
    fetch("http://www.omdbapi.com/?apikey="+apiKey+"&i="+id)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let modal = document.getElementById('modal');
        modal.style.display = 'block';

        let modalContent = document.getElementById('modalContainer');
        //reiniciar la creación de elementos en modal
        while (modalContent.hasChildNodes()) {
            modalContent.removeChild(modalContent.firstChild);
        }

        //Agregar título de peli
        let createTitle = document.createElement('h2');
        let title = document.createTextNode(data.Title);
        createTitle.appendChild(title);
        
        //Agregar video
        /*let createVideo = document.createElement('iframe');
        createVideo.setAttribute('width', '560');
        createVideo.setAttribute('height', '315');
        createVideo.setAttribute('src', videos[0]); //indice
        createVideo.setAttribute('frameborder', '0');
        createVideo.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        createVideo.setAttribute('allowfullscreen');*/

        //Agregar director
        let createDirector = document.createElement('p');
        let director = document.createTextNode('DIRECTOR: ' + data.Director);
        createDirector.appendChild(director);
        
        //Agregar plot
        let createPlot = document.createElement('p');
        let plot = document.createTextNode('PLOT: ' + data.Plot);
        createPlot.appendChild(plot);

        //Agregar puntuación
        let createRating = document.createElement('p');
        let rating = document.createTextNode('IMDB Rating: ' + data.imdbRating);
        createRating.appendChild(rating);

        modalContent.appendChild(createTitle);
        modalContent.appendChild(createDirector);
        modalContent.appendChild(createPlot);
        modalContent.appendChild(createRating);  
     })
};

//cerrar modal
window.onclick = (event) => {
    let modal = document.getElementById('modal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
};