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