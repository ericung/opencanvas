var canvas = document.getElementById("myCanvas");
var generatedHtml = document.getElementById("generatedHtml");
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
    var idRects = rects.length;
    if (wVal < 0) {
        wVal = Math.abs(wVal);
        xPos = x - wVal;
    }
    if (hVal < 0) {
        hVal = Math.abs(hVal);
        yPos = y - hVal;
    }
    rects.push({ x: xPos, y: yPos, w: wVal, h: hVal, id: idRects });
    x = mousePos.x;
    y = mousePos.y;
    draw();
}, false);

var area = document.getElementById("generatedHtml");
if (area.addEventListener) {
    area.addEventListener('input', function () {
        const iframe = document.getElementById("renderedhtml");
        iframe.width = "480";
        iframe.height = "320";
        iframe.srcdoc = `<!DOCTYPE html><header></header><body>` + document.getElementById("generatedHtml").value + `</body>`;
    }, false);
} else if (area.attachEvent) {
    area.attachEvent('onpropertychange', function () {
        const iframe = document.getElementById("renderedhtml");
        iframe.width = "480";
        iframe.height = "320";
        iframe.srcdoc = `<!DOCTYPE html><header></header><body>` + document.getElementById("generatedHtml").value + `</body>`;
    });
}

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
        $('#generatedHtml').val(msg);
        const iframe = document.getElementById("renderedhtml");
        iframe.width = "490px";
        iframe.height = "330px";
        iframe.border = "1px solid #000000";
        iframe.srcdoc = msg;
    });
}

function reverse() {
    const iframe = document.getElementById("renderedhtml");
    jsonFromSrc = html2json(iframe.srcdoc);
    rects = [];

    for (let i = 0; i < jsonFromSrc.length; i++) {
        var w = jsonFromSrc[i].width;
        var h = jsonFromSrc[i].height;
        var x = jsonFromSrc[i].marginLeft;
        var y = jsonFromSrc[i].marginTop;
        rects.push({ x: x, y: y, w: w, h: h, id: i });
    }

    draw();
}
