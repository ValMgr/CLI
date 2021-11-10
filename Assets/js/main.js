"use-strict";

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function setVersion(){
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = String(now.getFullYear()).substr(2,2);
    const v = m+d+y;
    document.querySelector('#version').innerHTML = v;
}

docReady(() => {
    const cli = new CLI();
    setVersion()
});