function parseHTML(markup) {
    if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
        var doc = document.implementation.createHTMLDocument("");
        doc.documentElement.innerHTML = markup;
        return doc;
    } else if ('content' in document.createElement('template')) {
        // Template tag exists!
        var el = document.createElement('template');
        el.innerHTML = markup;
        return el.content;
    } else {
        // Template tag doesn't exist!
        var docfrag = document.createDocumentFragment();
        var el = document.createElement('body');
        el.innerHTML = markup;
        for (i = 0; 0 < el.childNodes.length;) {
            docfrag.appendChild(el.childNodes[i]);
        }
        return docfrag;
    }
}

function html2json(html) {
    var divs = parseHTML(html).getElementsByTagName("div");
    var language = [];

    for (let i = 0; i < divs.length; i++) {
        language.push({
            "id": divs[i].getAttribute("id"),
            "width": divs[i].style.width,
            "height": divs[i].style.height,
            "marginLeft": divs[i].style.marginLeft,
            "marginTop": divs[i].style.marginTop
        });
    }

    return language;
}
