function Stickman() {

    let stickmanCounter = 0;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#ffffff';

    const draw = (pathFromX, pathFromY, pathToX, pathToY) => {
        context.moveTo(pathFromX, pathFromY);
        context.lineTo(pathToX, pathToY);
        context.stroke();
    };

    const part1 = () => draw (0, 230, 500, 230);
    const part2 = () => draw (150, 230, 150, 20);
    const part3 = () => draw (150, 20, 300, 20);
    const part4 = () => draw (300, 20, 300, 60);
    const part5 = () => {
        context.beginPath();
        context.arc(300, 80, 20, 0, Math.PI*2, true);
        context.stroke();
    };
    const part6 = () => draw (300, 100, 300, 160);
    const part7 = () => draw (300, 120, 260, 140);
    const part8 = () => draw (300, 120, 330, 140);
    const part9 = () => draw (300, 160, 280, 220);
    const part10 = () => draw (300, 160, 320, 220);

    let drawFunctions = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10];

    const drawNext = () => {
        drawFunctions[stickmanCounter]();
        stickmanCounter++;
    };

    return {
        drawNext: drawNext
    }
}

module.exports = Stickman;