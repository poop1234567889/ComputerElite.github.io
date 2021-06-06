function MakeTextGetRequest(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status == 200) {
        return request.responseText;
    } else {
        return "Something went wrong: " + request.status;
    }
}

function MakeJSONGetRequest(url) {
    return JSON.parse(MakeTextGetRequest(url));
}

function MakeTextGetRequestAsync(url) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        if (request.status == 200) {
            resolve(request.responseText);
        } else {
            reject("Something went wrong: " + request.status);
        }
    })
}

function MakeJSONGetRequestAsync(url) {
    return new Promise((resolve, reject) => {
        MakeTextGetRequestAsync(url).then(res => {
            resolve(JSON.parse(res))
        }).catch(err => [
            reject(err)
        ])
    });
}

function mouseX(evt) {
    if (evt.pageX) {
        return evt.pageX;
    } else if (evt.clientX) {
        return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    } else {
        return null;
    }
}
  
function mouseY(evt) {
    if (evt.pageY) {
        return evt.pageY;
    } else if (evt.clientY) {
        return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    } else {
        return null;
    }
}

function InIframe () {
    var inFrame = false;
    try {
        inFrame = window.self !== window.top;
    } catch (e) {
    }
    console.log("in IFrame: " + inFrame)
    return inFrame;
}

function ByteSizeToString(input, decimals = 2) {
    // TB
    if(input > 1099511627776) {
        return (input / 1099511627776).toFixed(decimals) + " TB"
    }
    // GB
    else if(input > 1073741824) {
        return (input / 1073741824).toFixed(decimals) + " GB"
    }
    // MB
    else if(input > 1048576) {
        return (input / 1048576).toFixed(decimals) + " MB"
    }
    // KB
    else if(input > 1024) {
        return (input / 1024).toFixed(decimals) + " KB"
    }
    // Bytes
    else {
        return input + " Bytes"
    }
}