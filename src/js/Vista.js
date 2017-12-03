const Hangman = require("./hangman");
const MoviesAndHints = require("./moviesAndHints");

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