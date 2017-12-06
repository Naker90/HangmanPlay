/*MOVIESANDHINTS OBJECT*/

const MoviesAndHints = [
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
            "A film was made for each book in the saga with the exception of the last book",
            "It's not everyday an adventure comes along that mixes magic, action, friendship, and ... Quidditch.",
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

/*VISTA CLASS*/

function View() {

    const hangman = Hangman(MoviesAndHints);
    hangman.startGame();

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let encodeMovieTitle = "";

    let container = document.getElementById("alphabet");
    let movieContainer = document.getElementById("movie-title");
    let livesText = document.getElementById("lives");
    let hintBtn = document.getElementById("hint");
    let playBtn = document.getElementById("play");

    const startView = () => {
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
        if(hangman.checkWordProgress(encodeMovieTitle)){
            livesText.innerHTML = "You Win!";
            deleteAllButtonEventLister();
        }else{
            updateLiveState()
        }
    };

    const updateLiveState = () => {
        if(hangman.hasLives()){
            livesText.innerHTML = "You have "+ hangman.getLives() + " lives!"
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
        startView: startView
    }
}

/*HANGMAN CLASS*/

function Hangman(moviesAndHints) {

    const MAX_LIVES = 10;

    let movie = {};
    let encodeMovieTitle = [];
    let hintCounter = 0;
    let lives = MAX_LIVES;

    const generateRandomMovieTitle = () => movie = moviesAndHints[Math.floor(Math.random() * moviesAndHints.length)];
    const generateEncodeMovieTitle = () => Array.prototype.forEach.call(movie.title,
        (char) => (char === " ") ? encodeMovieTitle.push("-") : encodeMovieTitle.push("_"));

    const startGame = () => {
        generateRandomMovieTitle();
        generateEncodeMovieTitle();
    };

    const movieTitleContain = (char) => movie.title.indexOf(char) !== -1;
    const replaceChar = (char) => {
        if(!movieTitleContain(char)){
            checkLives();
        }else{
            Array.prototype.forEach.call(movie.title, (movieTitleChar, index) => {
                if(char === movieTitleChar){encodeMovieTitle[index] = char}
            });
        }
    };

    const giveHint = () => {
        if(hintCounter !== movie.hints.length){
            let hint = movie.hints[hintCounter];
            hintCounter++;
            return hint;
        }
        return false;
    };

    const checkLives = () => (lives !== 0) ? lives-- : false;
    const hasLives = () => lives > 0;

    const checkWordProgress = (encodeMovieTitle) => {
        let lessOverLetters = encodeMovieTitle.filter((letter) => {
            if(letter === "_"){return letter}
        });
        return lessOverLetters.length === 0;
    };

    const getMovieTitle = () => movie.title;
    const getEncodeMovieTitle = () => encodeMovieTitle;
    const getLives = () => lives;

    return {
        startGame: startGame,
        replaceChar: replaceChar,
        giveHint: giveHint,
        checkLives: checkLives,
        checkWordProgress: checkWordProgress,
        getMovieTitle: getMovieTitle,
        getEncodeMovieTitle: getEncodeMovieTitle,
        getLives: getLives,
        hasLives: hasLives
    }
}

/*EXEC*/

View().startView();