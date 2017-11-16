let alphabet = 'abcdefghijklmnopqrstuvwxyz';

const generateBtnAlphabet = () => {
    let container = document.getElementById("alphabet");
    for(let i = 0; i < alphabet.length; i++){
        let char = alphabet[i];

        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode(char));

        let att = document.createAttribute("id");
        att.value = char;
        btn.setAttributeNode(att);

        container.appendChild(btn);
    }
};

document.addEventListener("DOMContentLoaded", generateBtnAlphabet);
