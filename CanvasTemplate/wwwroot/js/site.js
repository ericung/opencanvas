var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
var x = 0;
var y = 0;
var message = "";
var rects = [];

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);

    draw();
}, false);

canvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    x = mousePos.x;
    y = mousePos.y;
}, false);

canvas.addEventListener('mouseup', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var xPos = x;
    var yPos = y;
    var wVal = mousePos.x - x;
    var hVal = mousePos.y - y;
    if (wVal < 0) {
        wVal = Math.abs(wVal);
        xPos = x - wVal;
    }
    if (hVal < 0) {
        hVal = Math.abs(hVal);
        yPos = y - hVal;
    }
    rects.push({ x: xPos, y: yPos, w: wVal, h: hVal });
    x = mousePos.x;
    y = mousePos.y;
    draw();
}, false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(message, 10, 50);

    for (var i = 0; i < rects.length; i++) {
        ctx.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function generate() {
    $.ajax({
        method: "POST",
        url: "Home/Generate",
        data: { rectangles: JSON.stringify(rects) }
    })
    .done(function(msg) {
        $('#generatedHtml').text(msg);
        const iframe = document.getElementById("renderedhtml");
        iframe.width = "480";
        iframe.height = "320";
        iframe.srcdoc = `<!DOCTYPE html><header></header><body>` + msg + `</body>`;
    });
}