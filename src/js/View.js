const Hangman = require("./Hangman");
const Stickman = require("./Stickman");
const MoviesAndHints = require("./MoviesAndHints");

function View() {

    const stickman = Stickman();
    const hangman = Hangman(MoviesAndHints);
    hangman.startGame();

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let encodeMovieTitle = "";

    let container = document.getElementById("alphabet");
    let movieContainer = document.getElementById("movie-title");
    let livesText = document.getElementById("lives");
    let hintBtn = document.getElementById("hint");
    let playBtn = document.getElementById("play");

    const configureView = () => {
        document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
        document.addEventListener("DOMContentLoaded", updateWord);
        playBtn.addEventListener("click", reloadPage);
        hintBtn.addEventListener("click", updateHint);
    };

    const reloadPage = () => {
        location.reload()
    };

    const generateBtnAlphabet = () => {
        Array.prototype.forEach.call(alphabet, (letter) => {
            let btn = document.createElement("button");
            btn.appendChild(document.createTextNode(letter));

            let id = document.createAttribute("id");
            id.value = letter;
            btn.setAttributeNode(id);

            container.appendChild(btn);
        });
        setEventToBtn();
    };

    const setEventToBtn = () => {
        let buttons = container.getElementsByTagName("button");
        Array.prototype.map.call(buttons, (button) => {
            let char = button.getAttribute("id");
            button.addEventListener("click", () => {
                buttonAction(char, button);
            });
        });
    };

    const buttonAction = function (char, button) {
        hangman.replaceChar(char);
        updateWord();
        setStyleDisabled(button);
        deleteEventListenerTo(button);
    };

    const setStyleDisabled = btn => {
        let style = document.createAttribute("class");
        style.value="disabled-button";
        btn.setAttributeNode(style);
    };

    const updateWord = () => {
        movieContainer.innerHTML = "";
        generateWord();
        checkWordProgress();
    };

    const generateWord = function () {
        encodeMovieTitle = hangman.getEncodeMovieTitle();
        encodeMovieTitle.map((letter) => {
            let text = letter === "-" ? " " : letter;
            createSpanWith(text);
        });
    };

    const checkWordProgress = () => {
        if(hangman.isWinner()){
            livesText.innerHTML = "You Win!";
            deleteAllButtonEventLister();
        }else{
            updateLiveState()
        }
    };

    const updateLiveState = () => {
        if(hangman.hasLives()){
            livesText.innerHTML = "You have "+ hangman.getLives() + " lives!";
            stickman.next();
        }else{
            livesText.innerHTML = "You lost!";
            movieContainer.innerHTML = "";
            createSpanWith(hangman.getMovieTitle());
            deleteAllButtonEventLister();
        }
    };

    const deleteAllButtonEventLister = () => {
        let buttons = container.getElementsByTagName("button");
        Array.prototype.map.call(buttons, (btn) => {
            deleteEventListenerTo(btn);
        });
        deleteEventListenerTo(hintBtn);
    };

    const createSpanWith = (text) => {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        movieContainer.appendChild(span);
    };

    const deleteEventListenerTo = (element) => {
        let newElementWithoutEvent = element.cloneNode(true);
        element.parentNode.replaceChild(newElementWithoutEvent, element);
    };

    const updateHint = () => {
        let hintText = document.getElementById("hint-text");
        let hint = hangman.giveHint();
        if(hint){
            hintText.innerHTML = hint;
            hangman.checkLives();
            updateLiveState();
        }else{
            hintBtn.value = "have not got more hints!";
        }
    };

    return {
        startView: configureView
    }
}

module.exports = View;