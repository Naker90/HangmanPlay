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

    let movieTitle = "";
    let encodeMovieTitle = [];

    const generateRandomMovieTitle = () => movieTitle = moviesAndHints[Math.floor(Math.random() * moviesAndHints.length)].title;
    const generateEncodeMovieTitle = () => Array.prototype.forEach.call(movieTitle,
        (char) => (char === " ") ? encodeMovieTitle.push("-") : encodeMovieTitle.push("_"));

    const startGame = () => {
        generateRandomMovieTitle();
        generateEncodeMovieTitle();
    };

    const hasChar = (character) => movieTitle.indexOf(character) !== -1;

    const replaceChar = (char) => {
      if(hasChar(char)){
          Array.prototype.forEach.call(movieTitle, (movieTitleChar, index) => {
              if(char === movieTitleChar){encodeMovieTitle[index] = char}
          });
      }
    };

    const getMovieTitle = () => movieTitle;
    const getEncodeMovieTitle = () => encodeMovieTitle;

    return {
        startGame: startGame,
        replaceChar: replaceChar,
        getMovieTitle: getMovieTitle,
        getEncodeMovieTitle: getEncodeMovieTitle
    }
}

module.exports = Hangman;