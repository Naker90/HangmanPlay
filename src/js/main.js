let lives = 10;
let alphabet = 'abcdefghijklmnopqrstuvwxyz';

let moviesAndHints = [
    {
        title: "hangover",
        hints: {
            firstHint: "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
            secondHint: "Only to wake up and not remember what happened the night before",
            thirdHint: "Is the story of four male friends who go to Las Vegas to celebrate Doug’s bachelor party"
        }
    },
    {
        title: "harry potter",
        hints: {
            firstHint: "It's not everyday an adventure comes along that mixes magic, action, friendship, and ... Quidditch.",
            secondHint: "A film was made for each book in the saga with the exception of the last book",
            thirdHint: "A film written by J. K. Rowling"
        }
    },
    {
        title: "taxi driver",
        hints: {
            firstHint: "Directed by Martin Scorsese and written by Paul Schrader.",
            secondHint: "The main actor a lonely and mentally unstable ex-combatant",
            thirdHint: "The name of main actor is Travis"
        }
    }
];

let movie = moviesAndHints[Math.floor(Math.random() * 3)];

let container = document.getElementById("alphabet");

let movieContainer = document.getElementById("movie-title");
let chars = movieContainer.getElementsByTagName("span");

const generateBtnAlphabet = () => {
    for(let i = 0; i < alphabet.length; i++){
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode(alphabet[i]));

        let id = document.createAttribute("id");
        id.value = alphabet[i];
        btn.setAttributeNode(id);

        container.appendChild(btn);
    }
    setEventToBtn();
};

const setEventToBtn = () => {
    let buttons = container.getElementsByTagName("button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", () => {
            let char = buttons[i].getAttribute("id");
            checkMovieTitle(char);
            setStyleDisabled(buttons[i])
        });
    }
};

const setStyleDisabled = btn => {
    let clazz = document.createAttribute("class");
    clazz.value="disabled-button";
    btn.setAttributeNode(clazz);
};

const checkMovieTitle = (char) => {
    let change = false;
    for(let i = 0; i < chars.length; i++){
        if(chars[i].getAttribute("name") === char && chars[i].innerHTML === "_"){
            chars[i].innerHTML = char;
            change = true;
        }
    }
    if(change !== true){checkLives()}
};

const checkLives = () => {
    let text = document.getElementById("lives");
    if(lives === 0){
        text.innerHTML = "You have lost!";
        showWord();
    }else{
        lives--;
        text.innerHTML = "You have "+ lives + " lives!"
    }
};

const showWord = () => {
    for(let i = 0; i < chars.length; i++){
        if(chars[i].innerHTML === "_"){
            chars[i].innerHTML = chars[i].getAttribute("name");
        }
    }
};

const generateWord = () => {
    for(let i = 0; i < movie.title.length; i++){
        let span = document.createElement("span");

        let text = (movie.title[i] === " ") ?  " " : "_";
        span.appendChild(document.createTextNode(text));

        let name = document.createAttribute("name");
        name.value = movie.title[i];
        span.setAttributeNode(name);

        movieContainer.appendChild(span);
    }
};

document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
document.addEventListener("DOMContentLoaded", generateWord);