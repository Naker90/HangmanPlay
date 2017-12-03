const beforeEach = require("mocha").beforeEach;
const expect = require("chai").expect;
let sinon = require("sinon");
const Hangman = require("../src/js/hangman");

describe("Hangman Should", () => {

    let hangman;

    beforeEach("Initialize objects", () => {
        hangman = new Hangman();
    });

    it("return random word", () => {
        hangman.generateRandomWord();

        let word = hangman.getWord();

        expect(word.title !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let word = "anyWord";
        let expectEncodeWord = ["_", "_", "_", "_", "_", "_", "_"];

        hangman.generateEncodeWord(word);

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);
    });

    it("return hide word for show it in the game with space", () => {
        let word = "any Word";
        let expectEncodeWord = ["_", "_", "_", "-", "_", "_", "_", "_"];

        hangman.generateEncodeWord(word);

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);

    });

    it("replace char into encode word array if contain it", () => {
        let word = "anyWord";
        let expected = ["a", "_", "_", "_", "_", "_", "_"];

        hangman.generateEncodeWord(word);
        hangman.replaceChar(word, "a");

        expect(hangman.getEncodeWord()).to.deep.equal(expected);
    });

});