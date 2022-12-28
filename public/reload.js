//fuction to reload the page till json is parsed and displayed

function reloadIt() {
    if (window.location.href.substr(-2) !== "?r") {
        window.location = window.location.href + "?r";
    }
}

setTimeout('reloadIt()', 1000)();