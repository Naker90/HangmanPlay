'use strict';

/******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
            /******/
        }
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
            return module['default'];
        } :
        /******/function getModuleExports() {
            return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 4);
    /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports) {

    function Stickman() {

        var stickmanCounter = 0;
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        context.beginPath();
        context.strokeStyle = '#ffffff';

        var draw = function draw(pathFromX, pathFromY, pathToX, pathToY) {
            context.moveTo(pathFromX, pathFromY);
            context.lineTo(pathToX, pathToY);
            context.stroke();
        };

        var part1 = function part1() {
            return draw(0, 230, 500, 230);
        };
        var part2 = function part2() {
            return draw(150, 230, 150, 20);
        };
        var part3 = function part3() {
            return draw(150, 20, 300, 20);
        };
        var part4 = function part4() {
            return draw(300, 20, 300, 60);
        };
        var head = function head() {
            context.beginPath();
            context.arc(300, 80, 20, 0, Math.PI * 2, true);
            context.stroke();
        };
        var part5 = function part5() {
            return draw(300, 100, 300, 160);
        };
        var part6 = function part6() {
            return draw(300, 120, 260, 140);
        };
        var part7 = function part7() {
            return draw(300, 120, 330, 140);
        };
        var part8 = function part8() {
            return draw(300, 160, 280, 220);
        };
        var part9 = function part9() {
            return draw(300, 160, 320, 220);
        };

        var drawFunctions = [part1, part2, part3, part4, head, part5, part6, part7, part8, part9];

        var drawNext = function drawNext() {
            drawFunctions[stickmanCounter]();
            stickmanCounter++;
        };

        return {
            drawNext: drawNext
        };
    }

    module.exports = Stickman;

    /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

    var Hangman = __webpack_require__(2);
    var Stickman = __webpack_require__(0);
    var MoviesAndHints = __webpack_require__(3);

    function View() {

        var stickman = Stickman();
        var hangman = Hangman(MoviesAndHints);
        hangman.startGame();

        var alphabet = 'abcdefghijklmnopqrstuvwxyz';
        var encodeMovieTitle = "";

        var container = document.getElementById("alphabet");
        var movieContainer = document.getElementById("movie-title");
        var livesText = document.getElementById("lives");
        var hintBtn = document.getElementById("hint");
        var playBtn = document.getElementById("play");

        var configureView = function configureView() {
            document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
            document.addEventListener("DOMContentLoaded", updateWord);
            playBtn.addEventListener("click", reloadPage);
            hintBtn.addEventListener("click", updateHint);
        };

        var reloadPage = function reloadPage() {
            location.reload();
        };

        var generateBtnAlphabet = function generateBtnAlphabet() {
            Array.prototype.forEach.call(alphabet, function (letter) {
                var btn = document.createElement("button");
                btn.appendChild(document.createTextNode(letter));

                var id = document.createAttribute("id");
                id.value = letter;
                btn.setAttributeNode(id);

                container.appendChild(btn);
            });
            setEventToBtn();
        };

        var setEventToBtn = function setEventToBtn() {
            var buttons = container.getElementsByTagName("button");
            Array.prototype.map.call(buttons, function (button) {
                var char = button.getAttribute("id");
                button.addEventListener("click", function () {
                    buttonAction(char, button);
                });
            });
        };

        var buttonAction = function buttonAction(char, button) {
            hangman.replaceChar(char);
            updateWord();
            setStyleDisabled(button);
            deleteEventListenerTo(button);
        };

        var setStyleDisabled = function setStyleDisabled(btn) {
            var style = document.createAttribute("class");
            style.value = "disabled-button";
            btn.setAttributeNode(style);
        };

        var updateWord = function updateWord() {
            movieContainer.innerHTML = "";
            generateWord();
            checkWordProgress();
        };

        var generateWord = function generateWord() {
            encodeMovieTitle = hangman.getEncodeMovieTitle();
            encodeMovieTitle.map(function (letter) {
                var text = letter === "-" ? " " : letter;
                createSpanWith(text);
            });
        };

        var checkWordProgress = function checkWordProgress() {
            if (hangman.isWinner()) {
                livesText.innerHTML = "You Win!";
                deleteAllButtonEventLister();
            } else {
                updateLiveState();
            }
        };

        var updateLiveState = function updateLiveState() {
            if (hangman.hasLives()) {
                livesText.innerHTML = "You have " + hangman.getLives() + " lives!";
            } else {
                livesText.innerHTML = "You lost!";
                movieContainer.innerHTML = "";
                createSpanWith(hangman.getMovieTitle());
                deleteAllButtonEventLister();
            }
        };

        var deleteAllButtonEventLister = function deleteAllButtonEventLister() {
            var buttons = container.getElementsByTagName("button");
            Array.prototype.map.call(buttons, function (btn) {
                deleteEventListenerTo(btn);
            });
            deleteEventListenerTo(hintBtn);
        };

        var createSpanWith = function createSpanWith(text) {
            var span = document.createElement("span");
            span.appendChild(document.createTextNode(text));
            movieContainer.appendChild(span);
        };

        var deleteEventListenerTo = function deleteEventListenerTo(element) {
            var newElementWithoutEvent = element.cloneNode(true);
            element.parentNode.replaceChild(newElementWithoutEvent, element);
        };

        var updateHint = function updateHint() {
            var hintText = document.getElementById("hint-text");
            var hint = hangman.giveHint();
            if (hint) {
                hintText.innerHTML = hint;
                hangman.checkLives();
                updateLiveState();
            } else {
                hintBtn.value = "have not got more hints!";
            }
        };

        return {
            configureView: configureView
        };
    }

    module.exports = View;

    /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

    var Stickman = __webpack_require__(0);

    function Hangman(moviesAndHints) {

        var stickman = Stickman();
        var MAX_LIVES = 10;

        var movie = {};
        var encodeMovieTitle = [];
        var hintCounter = 0;
        var lives = MAX_LIVES;

        var generateRandomMovieTitle = function generateRandomMovieTitle() {
            return movie = moviesAndHints[Math.floor(Math.random() * moviesAndHints.length)];
        };
        var generateEncodeMovieTitle = function generateEncodeMovieTitle() {
            return Array.prototype.forEach.call(movie.title, function (char) {
                return char === " " ? encodeMovieTitle.push("-") : encodeMovieTitle.push("_");
            });
        };

        var startGame = function startGame() {
            generateRandomMovieTitle();
            generateEncodeMovieTitle();
        };

        var movieTitleContain = function movieTitleContain(char) {
            return movie.title.indexOf(char) !== -1;
        };
        var replaceChar = function replaceChar(char) {
            if (!movieTitleContain(char)) {
                checkLives();
            } else {
                Array.prototype.forEach.call(movie.title, function (movieTitleChar, index) {
                    if (char === movieTitleChar) {
                        encodeMovieTitle[index] = char;
                    }
                });
            }
        };

        var giveHint = function giveHint() {
            if (hintCounter !== movie.hints.length) {
                var hint = movie.hints[hintCounter];
                hintCounter++;
                return hint;
            }
            return false;
        };

        var checkLives = function checkLives() {
            if (lives !== 0) {
                lives--;
                stickman.drawNext();
            } else {
                return false;
            }
        };
        var hasLives = function hasLives() {
            return lives > 0;
        };

        var checkWordProgress = function checkWordProgress() {
            var lessOverLetters = encodeMovieTitle.filter(function (letter) {
                if (letter === "_") {
                    return letter;
                }
            });
            return lessOverLetters.length;
        };
        var isWinner = function isWinner() {
            return checkWordProgress() === 0;
        };

        var getMovieTitle = function getMovieTitle() {
            return movie.title;
        };
        var getEncodeMovieTitle = function getEncodeMovieTitle() {
            return encodeMovieTitle;
        };
        var getLives = function getLives() {
            return lives;
        };

        return {
            startGame: startGame,
            replaceChar: replaceChar,
            giveHint: giveHint,
            checkLives: checkLives,
            isWinner: isWinner,
            getMovieTitle: getMovieTitle,
            getEncodeMovieTitle: getEncodeMovieTitle,
            getLives: getLives,
            hasLives: hasLives
        };
    }

    module.exports = Hangman;

    /***/
},
/* 3 */
/***/function (module, exports) {

    module.exports = [{
        title: "hangover",
        hints: ["This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.", "Only to wake up and not remember what happened the night before", "Is the story of four male friends who go to Las Vegas to celebrate Doug’s bachelor party"]
    }, {
        title: "harry potter",
        hints: ["A film was made for each book in the saga with the exception of the last book", "It's not everyday an adventure comes along that mixes magic, action, friendship, and ... Quidditch.", "A film written by J. K. Rowling"]
    }, {
        title: "taxi driver",
        hints: ["Directed by Martin Scorsese and written by Paul Schrader.", "The main actor a lonely and mentally unstable ex-combatant", "The name of main actor is Travis"]
    }];

    /***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

    __webpack_require__(5);
    __webpack_require__(2);
    __webpack_require__(3);
    __webpack_require__(0);
    module.exports = __webpack_require__(1);

    /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

    var View = __webpack_require__(1);

    View().configureView();

    /***/
}]
/******/);
