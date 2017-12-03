const expect = require("chai").expect;
const Hangman = require("../src/js/hangman");

describe("Hangman Should", () => {

    const createHangman = (obj) => {
        let hangman = new Hangman([obj]);
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
        let word = hangman.getWord();

        expect(word.title !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expectEncodeWord = ["_", "_", "_", "_", "_", "_", "_"];

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);
    });

    it("return hide word for show it in the game with space", () => {
        let movieAndHints = {
            title: "any Word",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expectEncodeWord = ["_", "_", "_", "-", "_", "_", "_", "_"];

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);

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

        expect(hangman.getEncodeWord()).to.deep.equal(expected);
    });

});