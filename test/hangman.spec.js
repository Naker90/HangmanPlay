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
        let movieTitle = hangman.getMovieTitle();

        expect(movieTitle !== undefined).to.equal(true);
    });

    it("return hide word for show it in the game without space", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expected = ["_", "_", "_", "_", "_", "_", "_"];

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
    });

    it("return hide word for show it in the game with space", () => {
        let movieAndHints = {
            title: "any Word",
            hints: [
                "anyHint",
            ]
        };
        let hangman = createHangman(movieAndHints);
        let expected = ["_", "_", "_", "-", "_", "_", "_", "_"];

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
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

        expect(hangman.getEncodeMovieTitle()).to.deep.equal(expected);
    });

    it("return false when user ask more than hints quantity", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "firstHint",
                "secondHint",
                "thirdHint"
            ]
        };
        let hangman = createHangman(movieAndHints);

        for(let i = 0; i < movieAndHints.hints.length; i++){
            hangman.giveHint();
        }

        expect(hangman.giveHint()).to.equal(false);
    });

    it("return false when user finished all lives", () => {
        let movieAndHints = {
            title: "anyWord",
            hints: [
                "anyHint"
            ]
        };
        let hangman = createHangman(movieAndHints);

        for(let i = hangman.getMaxLives(); i > 0; i--){
            hangman.checkLives();
        }

        expect(hangman.checkLives()).to.equal(false);
    });
});