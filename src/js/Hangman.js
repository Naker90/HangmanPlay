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

    const checkWordProgress = () => {
        let lessOverLetters = encodeMovieTitle.filter((letter) => {
            if(letter === "_"){return letter}
        });
        return lessOverLetters.length;
    };
    const isWinner = () => checkWordProgress() === 0;

    const getMovieTitle = () => movie.title;
    const getEncodeMovieTitle = () => encodeMovieTitle;
    const getLives = () => lives;

    return {
        startGame: startGame,
        replaceChar: replaceChar,
        giveHint: giveHint,
        checkLives: checkLives,
        isWinner: isWinner,
        getMovieTitle: getMovieTitle,
        getEncodeMovieTitle: getEncodeMovieTitle,
        getLives: getLives,
        hasLives: hasLives
    }
}

module.exports = Hangman;