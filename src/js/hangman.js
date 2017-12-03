const moviesAndHints = [
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

module.exports = Hangman;