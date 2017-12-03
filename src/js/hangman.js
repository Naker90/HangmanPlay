function Hangman() {

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

    let word = "";
    let encodeWord = [];

    const generateRandomWord = () => word = moviesAndHints[Math.floor(Math.random() * 3)];

    const generateEncodeWord = (word) => Array.prototype.map.call(word,
        (char) => (char === " ") ? encodeWord.push("-") : encodeWord.push("_"));

    const hasChar = (word, character) => word.indexOf(character) !== -1;

    const replaceChar = (word, char) => {
      if(hasChar(word, char)){
          for(let i = 0; i < word.length; i++){
              if(char === word[i]){encodeWord[i] = char}
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