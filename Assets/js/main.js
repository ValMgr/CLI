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

function initColorTheme(){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.body.classList.add('dark-mode');
}

function initResizeObserver(){
    const resizeObserver = new ResizeObserver(e => window.scrollTo(0,document.body.scrollHeight));
    resizeObserver.observe(document.body)
}

docReady(() => {
    setVersion();
    initResizeObserver();
    initColorTheme();
    document.querySelector('#close').addEventListener('mousedown', () => {document.body.classList.remove('wopen')});
    setTimeout(() => document.querySelectorAll('.loading').forEach(e => e.classList.remove('loading')), 500);
    const cli = new CLI();
    cli.CreateFolder(['Users', Disk.Get('C')]);
    cli.CreateFolder(['Guest', Folder.Get('Users')]);
    cli.CreateFolder(['Desktop', Folder.Get('Guest')]);
    cli.CreateFile(['helper.txt', helper, Folder.Get('Desktop')]);
    cli.CreateFile(['tasks.txt', task, Folder.Get('Desktop')]);
    cli.CreateFile(['.codes', validCode, Folder.Get('Desktop')]);
    cli.SetPosition('Desktop');
    // console.log(Files.Get('helper.txt'));
});