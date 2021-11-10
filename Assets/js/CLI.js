class CLI {

    static #instance = null;

    static getInstance(){
        return CLI.#instance;
    }

    constructor() {
        if(CLI.#instance === null){
            this.cli = document.querySelector('#cli');
            Disk.create('C');
            Folder.create('User', null, 'C');
            Folder.create('Deskop', 'User');
            this.position = 'C:\\User\\Desktop';
            this.commands = ['help', 'cd', 'mkdir', 'rm', 'clear', 'reload', 'exit'];
            this.cursor = document.querySelector('#cursor')
            this.input = document.querySelector('#input')
            this.newBlankLine();
            this.getInput();
            this.cursorBlink();
            CLI.#instance = this;
        }
        else{
            throw 'An instance of this Class already exist';
        }
    }
   
    cursorBlink() {
        let h = 1;
        setInterval(() => {
            h = h ? 0 : 1;
            this.cursor.style.opacity = h;
        }, 500);
    }

    newBlankLine() {
        const cl = document.querySelector('.current');
        if(cl) cl.classList.remove('current');
        const line = document.createElement('p');
        line.classList.add('line', 'current');
        line.innerHTML = this.position + '>&nbsp';
        this.cli.insertBefore(line, this.input);
    }

    newLine(str = "", breakLine = false){
        const line = document.createElement('p');
        line.classList.add('line');
        if(breakLine) line.classList.add('line-break');
        line.innerHTML = str;
        this.cli.insertBefore(line, this.input);
    }

    removeLastChar(){
        let str = this.input.innerHTML;
        str = str.substring(0, str.length - 1);
        this.input.innerHTML = str;
    }

    executeCommand(){
        const cmd = this.input.innerText;
        document.querySelector('.current').innerHTML += cmd;
        if(this.commands.includes(cmd)){
            let i = this.commands.indexOf(cmd);
            if(typeof(this[this.commands[i]]) === 'function'){ this[this.commands[i]]();}
            else{ 
                console.error(`Syntax Error: No ${this.commands[i]} function in this instance`);
                // throw new SyntaxError(`No ${this.commands[i]} function in this instance`)
            }
            this.newBlankLine();
        }
        else{
            this.newLine(`${cmd} command not found. Use help to see available commands.`, true);
            this.newBlankLine();
        }
        this.clearInput();
    }

    clearInput(){
        console.log
        this.input.innerHTML = "";
    }

    getInput(){
        const notAllowed = ['Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'Tab',
        'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Escape', 'Dead'];
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(!notAllowed.includes(e.key) && e.key !== 'Backspace' && e.key !== 'Enter'){
                this.input.innerText += e.key;
            }
            else if(e.key === 'Enter'){
                this.executeCommand();
            }
            else if(e.key === 'Backspace'){
                this.removeLastChar();
            }
        });
    }

    /** Commands */

    help(){
        this.newLine('<span class="commands">CD</span> Change active directory');
        this.newLine('<span class="commands">CLEAR</span> Clear console');
        this.newLine('<span class="commands">EXIT</span> Exit window');
        this.newLine('<span class="commands">HELP</span> List of available commands');
        this.newLine('<span class="commands">LS</span> View list of folders and files');
        this.newLine('<span class="commands">MKDIR</span> Create directory');
        this.newLine('<span class="commands">TOUCH</span> Create file in the current directory');
        this.newLine('<span class="commands">RM</span> Delete file or directory');
        this.newLine('<span class="commands">RELOAD</span> Reload current window', true);
    }

    clear(){
        document.querySelectorAll('.line').forEach(l => l.remove());
    }

    exit(){
        document.location.href = "https://www.google.fr/search?q=Valentin+Magry";
    }

    reload(){
        document.location.reload();
    }

    mkdir(){

    }

    touch(){

    }

    rm(){

    }

    ls(){

    }

    cd(){

    }


}