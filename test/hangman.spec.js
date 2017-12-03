const beforeEach = require("mocha").beforeEach;
const expect = require("chai").expect;
let sinon = require("sinon");
const Hangman = require("../src/js/hangman");

describe("Hangman Should", () => {

    let hangman;

    beforeEach("Initialize objects", () => {
        const moviesAndHints = [
            {
                title: "hangover",
                hints: [
                    "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
                    "Only to wake up and not remember what happened the night before",
                    "Is the story of four male friends who go to Las Vegas to celebrate Doug’s bachelor party"
                ]
            }];

        hangman = new Hangman(moviesAndHints);
    });

    it("return random word", () => {
        const moviesAndHints= [{
            title: "hangover",
            hints: [
                "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
            ]
        }];

        let hangman = Hangman(moviesAndHints);
        hangman.generateRandomWord();
        let word = hangman.getWord();

        expect(word.title !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
            ]
        };
        let hangman = Hangman([movieAndHints]);
        let expectEncodeWord = ["_", "_", "_", "_", "_", "_", "_"];

        hangman.generateRandomWord();
        console.log(hangman.getWord());
        hangman.generateEncodeWord();

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);
    });

    it("return hide word for show it in the game with space", () => {
        let movieAndHints = {
            title: "any Word",
            hints: [
                "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
            ]
        };
        let hangman = Hangman([movieAndHints]);
        let expectEncodeWord = ["_", "_", "_", "-", "_", "_", "_", "_"];

        hangman.generateRandomWord();
        hangman.generateEncodeWord();

        expect(hangman.getEncodeWord()).to.deep.equal(expectEncodeWord);

    });

    it("replace char into encode word array if contain it", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
                "Only to wake up and not remember what happened the night before",
            ]
        };

        let hangman = Hangman([movieAndHints]);
        let expected = ["a", "_", "_", "_", "_", "_", "_"];

        hangman.generateRandomWord();
        hangman.generateEncodeWord();
        hangman.replaceChar("a");

        expect(hangman.getEncodeWord()).to.deep.equal(expected);
    });

});