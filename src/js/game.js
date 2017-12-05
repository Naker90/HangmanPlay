const expect = require("chai").expect;

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

function Vista() {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const hangman = new Hangman(MoviesAndHints);
    hangman.startGame();

    let container = document.getElementById("alphabet");

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
            button.addEventListener("click", () => {
                let char = button.getAttribute("id");
                hangman.replaceChar(char);
                //_setStyleDisabled(button);
            });
        });
    };

    return {
        generateBtnAlphabet: generateBtnAlphabet
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

    const hasChar = (char) => movie.title.indexOf(char) !== -1;
    const replaceChar = (char) => {
        if(hasChar(char)){
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

    const getMovieTitle = () => movie.title;
    const getEncodeMovieTitle = () => encodeMovieTitle;
    const getMaxLives = () => MAX_LIVES;

    return {
        startGame: startGame,
        replaceChar: replaceChar,
        giveHint: giveHint,
        checkLives: checkLives,
        getMovieTitle: getMovieTitle,
        getEncodeMovieTitle: getEncodeMovieTitle,
        getMaxLives: getMaxLives
    }
}

/*GAME CLASS*/

function Game() {

    let vista = Vista();

    const start = () => {
        document.addEventListener("DOMContentLoaded", vista.generateBtnAlphabet);
    };

    return {
        start: start
    }
}

/*EXEC*/

Game().start();

/*TEST CLASS*/

describe("Hangman Should", () => {

    const createHangman = (obj) => {
        let hangman = Hangman([obj]);
        hangman.startGame();
        return hangman;
    };

    it("return random word", () => {
        const moviesAndHints= {
            title: "anyWord",
            hints: [
                "anyHint",
            ]
        };

        let hangman = createHangman(moviesAndHints);
        let movieTitle = hangman.getMovieTitle();

        expect(movieTitle !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expected = ["_", "_", "_", "_", "_", "_", "_"];

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
    });

    it("return hide word for show it in the game with space", () => {
        let movieAndHints = {
            title: "any Word",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expected = ["_", "_", "_", "-", "_", "_", "_", "_"];

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
    });

    it("replace char into encode word array if contain it", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expected = ["a", "_", "_", "_", "_", "_", "_"];

        hangman.replaceChar("a");

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
    });

    it("return false when user ask more than hints quantity", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "firstHint",
                "secondHint",
                "thirdHint"
            ]
        };
        let hangman = createHangman(movieAndHints);

        for(let i = 0; i < movieAndHints.hints.length; i++){
            hangman.giveHint();
        }

        expect(hangman.giveHint()).to.equal(false);
    });

    it("return false when user finished all lives", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint"
            ]
        };
        let hangman = createHangman(movieAndHints);

        for(let i = hangman.getMaxLives(); i > 0; i--){
            hangman.checkLives();
        }

        expect(hangman.checkLives()).to.equal(false);
    });
});