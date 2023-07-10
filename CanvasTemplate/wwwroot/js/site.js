var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(message, 10, 50);
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}