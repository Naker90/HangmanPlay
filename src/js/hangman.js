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

    let word = "";
    let encodeWord = [];

    const generateRandomWord = () => word = moviesAndHints[Math.floor(Math.random() * moviesAndHints.length)];
    const generateEncodeWord = () => Array.prototype.map.call(word.title,
        (char) => (char === " ") ? encodeWord.push("-") : encodeWord.push("_"));

    const hasChar = (character) => word.title.indexOf(character) !== -1;

    const replaceChar = (char) => {
      if(hasChar(char)){
          for(let i = 0; i < word.title.length; i++){
              if(char === word.title[i]){encodeWord[i] = char}
          }
      }
    };

    const getWord = () => word;
    const getEncodeWord = () => encodeWord;

    return {
        generateRandomWord: generateRandomWord,
        generateEncodeWord: generateEncodeWord,
        replaceChar: replaceChar,
        getWord: getWord,
        getEncodeWord: getEncodeWord
    }
}

module.exports = Hangman;