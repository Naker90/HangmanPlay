function ManagerButtons() {

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let container = document.getElementById("alphabet");

    const generateBtnAlphabet = () => {
        for(let i = 0; i < alphabet.length; i++){
            let btn = document.createElement("button");
            btn.appendChild(document.createTextNode(alphabet[i]));

            let id = document.createAttribute("id");
            id.value = alphabet[i];
            btn.setAttributeNode(id);

            container.appendChild(btn);
        }
        setEventToBtn();
    };

    const setEventToBtn = () => {
        let buttons = container.getElementsByTagName("button");
        for(let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", () => {
                alert("Hola soy " + buttons[i].getAttribute("id"));
            });
        }
    };

    return {
        generateBtnAlphabet: generateBtnAlphabet
    }
}

function ManagerWords() {

    let wordsAndHints = {
        movie: {
            title: "hangover",
            hints: {
                firstHint: "This comedy features abundant foul language, extreme nudity and extremely offensive sexual references.",
                secondHint: "Only to wake up and not remember what happened the night before",
                thirdHint: "Is the story of four male friends who go to Las Vegas to celebrate Doug’s bachelor party"
            }
        },
        movie: {
            title: "harry potter",
            hints: {
                firstHint: "It's not everyday an adventure comes along that mixes magic, action, friendship, and ... Quidditch.",
                secondHint: "A film was made for each book in the saga with the exception of the last book",
                thirdHint: "A film written by J. K. Rowling"
            }
        },
        movie: {
            title: "taxi driver",
            hints: {
                firstHint: "Directed by Martin Scorsese and written by Paul Schrader.",
                secondHint: "The main actor a lonely and mentally unstable ex-combatant",
                thirdHint: "The name of main actor is Travis"
            }
        }
    }

}

let managerButtons = new ManagerButtons();
document.addEventListener("DOMContentLoaded", managerButtons.generateBtnAlphabet);
