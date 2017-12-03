const before = require("mocha").before;
const assert = require("chai").assert;
const Hangman = require("../src/js/hangman");

describe("Hangman Should", () => {

    let hangman;

    before("Initialize objects", () => {
        hangman = new Hangman();
    });

    it("return random word", () => {
        let word = hangman.getRandomWord();
        assert.equal(word.title !== undefined, true);
    });
    
});