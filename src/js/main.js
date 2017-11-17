let lives = 10;
let hintCounter = 0;
let alphabet = 'abcdefghijklmnopqrstuvwxyz';

let moviesAndHints = [
    {
        title: "hangover",
        hints: [
            "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
            "Only to wake up and not remember what happened the night before",
            "Is the story of four male friends who go to Las Vegas to celebrate Doug’s bachelor party"
        ]
    },
    {
        title: "harry potter",
        hints: [
            "It's not everyday an adventure comes along that mixes magic, action, friendship, and ... Quidditch.",
            "A film was made for each book in the saga with the exception of the last book",
            "A film written by J. K. Rowling"
        ]
    },
    {
        title: "taxi driver",
        hints: [
            "Directed by Martin Scorsese and written by Paul Schrader.",
            "The main actor a lonely and mentally unstable ex-combatant",
            "The name of main actor is Travis"
        ]
    }
];

let movie = moviesAndHints[Math.floor(Math.random() * 3)];

let container = document.getElementById("alphabet");

let movieContainer = document.getElementById("movie-title");
let chars = movieContainer.getElementsByTagName("span");

let livesText = document.getElementById("lives");
let hintBtn = document.getElementById("hint");

const generateBtnAlphabet = () => {
    for(let i = 0; i < alphabet.length; i++){
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode(alphabet[i]));

        let id = document.createAttribute("id");
        id.value = alphabet[i];
        btn.setAttributeNode(id);

        container.appendChild(btn);
    }
    _setEventToBtn();
};

const _setEventToBtn = () => {
    let buttons = container.getElementsByTagName("button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", () => {
            let char = buttons[i].getAttribute("id");
            _checkMovieTitle(char);
            _setStyleDisabled(buttons[i])
        });
    }
};

const _setStyleDisabled = btn => {
    let clazz = document.createAttribute("class");
    clazz.value="disabled-button";
    btn.setAttributeNode(clazz);
};

const _checkMovieTitle = (char) => {
    let change = false;
    for(let i = 0; i < chars.length; i++){
        if(chars[i].getAttribute("name") === char && chars[i].innerHTML === "_"){
            chars[i].innerHTML = char;
            change = true;
        }
    }
    (change) ? _checkWordProgress() : _checkLives();
};

const _checkWordProgress = () => {
    let count = 0;
    for(let i = 0; i < chars.length; i++){
        if(chars[i].innerHTML !== "_"){
           count++
        }
    }
    if(count === chars.length){livesText.innerHTML = "You Win!";}
};

const _checkLives = () => {
    if(lives === 0){
        livesText.innerHTML = "You have lost!";
        _showWord();
    }else{
        lives--;
        livesText.innerHTML = "You have "+ lives + " lives!"
    }
};

const _showWord = () => {
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

const giveHint = () => {
    let hints = movie.hints;
    let hintText = document.getElementById("hint-text");
    if(hintCounter !== movie.hints.length){
        hintText.innerHTML = hints[hintCounter];
        hintCounter++;
    }
};

document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
document.addEventListener("DOMContentLoaded", generateWord);
hintBtn.addEventListener("click", giveHint);