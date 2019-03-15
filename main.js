const createNode = (element) => {
    return document.createElement(element);
};
const appendNode = (parent, element) => {
    return parent.appendChild(element);
};
const displayMovies = (data) => {
    const mainDiv = document.getElementById("moviesDiv");
    let div = createNode("div");
    let img = createNode("img");
    let span = createNode("span");
    img.src = data.Poster;
    span.innerHTML = data.Title;
    appendNode(div, img);
    appendNode(div, span);
    appendNode(mainDiv, div);
};
const removeChild = (parent) => {
    const parentElement = document.getElementById(parent);
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    };
}
const url = "http://www.omdbapi.com/?apikey="
const apikey = "8f24c86a&";
const movies = [
    "t=captain+america&y=2011",
    "t=captain+marvel",
    "t=iron+man",
    "t=iron+man+2",
    "t=the+incredible+hulk",
    "t=thor",
    "t=the+avengers",
    "t=iron+man+3",
    "t=Thor%3A+The+Dark+World",
    "t=Captain+America%3A+The+Winter+Soldier",
    "t=guardians+of+the+galaxy",
    "t=guardians+of+the+galaxy+vol.+2",
    "t=Avengers%3A+Age+of+Ultron",
    "t=Ant-Man",
    "t=Captain+America%3A+Civil+War",
    "t=Spider-man%3A+Homecoming",
    "t=Doctor+Strange",
    "t=Black+Panther",
    "t=Thor+Ragnarok",
    "t=Ant-man+and+the+wasp",
    "t=Avengers+infinity+war"
];

async function displayAllMovies() {
    removeChild("moviesDiv");
    for (let i = 0; i < movies.length; i++) {
        let resp = await fetch(url + apikey + movies[i]);
        let data = await resp.json();
        displayMovies(data);
    }
};
displayAllMovies();

async function displayFilteredMovies(character) {
    removeChild("moviesDiv");
    for (let i = 0; i < movies.length; i++) {
        let resp = await fetch(url + apikey + movies[i]);
        let data = await resp.json();
        if(data.Actors.includes(character)){
            await displayMovies(data);
        }
    }
};
// displayFilteredMovies("Mark Ruffalo");
const selectActor = () => {
    let select = document.getElementById("actors");
    let selectedValue = select.value;
    displayFilteredMovies(selectedValue);
}

document.getElementById("actors").addEventListener("change", selectActor);