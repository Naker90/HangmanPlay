function Stickman() {

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#ffffff';

    let drawFunctions = [part1, part2, part3, part4, part5, head, part6, part7, part8, part9];

    const head = () => {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    };

    const draw = (pathFromX, pathFromY, pathToX, pathToY) => {
        context.moveTo(pathFromX, pathFromY);
        context.lineTo(pathToX, pathToY);
        context.stroke();
    };

    const part1 = () => draw (50, 200, 450, 200);
    const part2 = () => draw (10, 0, 10, 600);
    const part3 = () => draw (0, 5, 70, 5);
    const part4 = () => draw (60, 5, 60, 15);
    const part5 = () => draw (60, 36, 60, 70);
    const part6 = () => draw (60, 46, 100, 50);
    const part7 = () => draw (60, 46, 20, 50);
    const part8 = () => draw (60, 70, 100, 100);
    const part9 = () => draw (60, 70, 20, 100);

}

module.exports = Stickman;