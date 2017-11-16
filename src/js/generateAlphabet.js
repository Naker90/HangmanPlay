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

document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
