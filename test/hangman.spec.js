const before = require("mocha").before;
const expect = require("chai").expect;
const assert = require("chai").assert;
const Hangman = require("../src/js/hangman");

describe("Hangman Should", () => {

    let hangman;

    before("Initialize objects", () => {
        hangman = new Hangman();
    });

    it("return random word", () => {
        let word = hangman.getRandomWord();
        expect(word.title !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let word = "anyMovie";
        let expectEncodeWord = ["_", "_", "_", "_", "_", "_", "_", "_"];
        expect(hangman.getEncodeWord(word)).to.deep.equal(expectEncodeWord);
    });

    it("return hide word for show it in the game with space", () => {
        let word = "any Movie";
        let expectEncodeWord = ["_", "_", "_", "-", "_", "_", "_", "_", "_"];
        expect(hangman.getEncodeWord(word)).to.deep.equal(expectEncodeWord);
    });

});