"use strict";

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var generateBtnAlphabet = function generateBtnAlphabet() {
    var container = document.getElementById("alphabet");
    for (var i = 0; i < alphabet.length; i++) {
        var char = alphabet[i];

        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode(char));

        var att = document.createAttribute("id");
        att.value = char;
        btn.setAttributeNode(att);

        container.appendChild(btn);
    }
};

document.addEventListener("DOMContentLoaded", generateBtnAlphabet);