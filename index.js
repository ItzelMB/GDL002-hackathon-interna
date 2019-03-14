//Movies to retrieve
const movieTitles = ['captain america','iron man', 'thor','the avengers'];
//API key to authenticate
const apiKey ='a7c19d97';


//Retrieve all the movies information, declared into movieTitles array. 
let createMoviesContainers = () =>{
    //Stroe all movies information into array.
    let moviesObject = movieTitles.map( movieTitle => {
         return fetch("http://www.omdbapi.com/?apikey="+apiKey+"&t="+movieTitle)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //Contains all the movies divs
                    let moviesContainer = document.getElementById('moviesContainer');
                    // containts only movie information of a single movie
                    let movieDivElement = document.createElement('div');
                    //class to recognize movie div.. for style pourposes
                    movieDivElement.setAttribute("class","info-box");
                    
                    //movie title   
                    let movieTitleElement = document.createElement('h3');
                    let titleText = document.createTextNode(data['Title']);            
                    movieTitleElement.append(titleText);

                    //movie image
                    let moviePoster = document.createElement('img');
                    //assign imdb id movie to each poster
                    moviePoster.setAttribute("id",data.imdbID);
                    moviePoster.setAttribute("src",data.Poster);
                    //assign event listener to call specific information for clicked image
                    moviePoster.addEventListener("click", showInfo);

                    movieDivElement.append(movieTitleElement);
                    movieDivElement.append(moviePoster);
                    moviesContainer.append(movieDivElement);
                })
    });

}

let showInfo = () => {
    let id = this.event.target.id;
    console.log("Retrieve movie info based on id:");
    fetch("http://www.omdbapi.com/?apikey="+apiKey+"&i="+id)
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            let modal = document.getElementById('myModal');
            modal.style.display = "block";
                    
            let modalBody = document.getElementById('modalBody');
            let moviePoster = document.createElement('img');
            moviePoster.setAttribute("id",data.imdbID);
            moviePoster.setAttribute("src",data.Poster);
            modalBody.append(moviePoster);

    });
}

window.onclick = function(event) {
    let modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

createMoviesContainers();