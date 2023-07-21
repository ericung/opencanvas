var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
var x = 0;
var y = 0;
var message = "";
var rects = [];

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

    draw();
}, false);

canvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    x = mousePos.x;
    y = mousePos.y;
}, false);

canvas.addEventListener('mouseup', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    rects.push({ x: x, y: y, w: mousePos.x - x, h: mousePos.y - y });
    x = mousePos.x;
    y = mousePos.y;
    message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
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
        const iframe = $('#renderedhtml');
        iframe.attr('srcdoc', msg);

        const iframeBody = iframe.contents().find('body');

        // Set the iframe's height to the content's height
        iframe.height(iframeBody.prop('scrollHeight'));
        iframe.width(iframeBody.prop('scrollWidth'));
    });
}