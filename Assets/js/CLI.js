class CLI {

    static #instance = null;

    static getInstance(){
        return CLI.#instance;
    }

    constructor() {
        if(CLI.#instance === null){
            this.cli = document.querySelector('#cli');
            this.fs = new FileSystem();
            this.fs.Create('Disk', ['C']);
            this.position = Disk.Get('C')
            this.strPosition = this.getStringPosition();
            this.commands = ['help', 'cd', 'mkdir', 'rm', 'clear', 'reload', 'exit',
            'open', 'ls', 'touch', 'echo', 'nano'];
            this.cursor = document.querySelector('#cursor')
            this.input = document.querySelector('#input')
            this.window = document.querySelector('.window');
            this.newBlankLine();
            this.getInput();
            this.cursorBlink();
            CLI.#instance = this;
        }
        else{
            throw 'An instance of this Class already exist';
        }
    }

    CreateFile(args){
        this.fs.Create('Files', args);
    }

    CreateFolder(args){
        this.fs.Create('Folder', args);
    }

    SetPosition(target){
        if(Disk.Get(target) !== undefined){
            this.position = Disk.Get(target);
        }
        else if(Folder.Get(target) !== undefined){
            this.position = Folder.Get(target);
        }
        else{
            throw `Unable to find ${target} path`;
        }
        this.strPosition = this.getStringPosition();
        this.clear();
        this.newBlankLine()
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
        line.innerHTML = this.strPosition + '>&nbsp';
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
        const input = this.input.innerText;
        const cmd = input.split(' ')[0];
        const args = input.indexOf(' ') !== -1 ? input.substring(input.indexOf(' ')+1) : null;
        document.querySelector('.current').innerHTML += this.input.innerText;
        if(this.commands.includes(cmd)){
            let i = this.commands.indexOf(cmd);
            if(typeof(this[this.commands[i]]) === 'function'){ 
                this[this.commands[i]](args);
            }
            else{ 
                throw `No ${this.commands[i]} function in this instance`;
            }
            this.newLine('', true);
            this.newBlankLine();
        }
        else{
            this.newLine(`${cmd} command not found. Use help to see available commands.`, true);
            this.newBlankLine();
        }
        this.clearInput();
    }

    clearInput(){
        this.input.innerHTML = "";
    }

    getInput(){
        const notAllowed = ['Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'Tab',
        'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Escape', 'Dead', '&'];
        let trigger = false;
        document.addEventListener('keydown', (e) => {
            if(!document.body.classList.contains('wopen')){
                if(!notAllowed.includes(e.key) && e.key !== 'Backspace' && e.key !== 'Enter'){
                    this.input.innerText += e.key;
                }
                else if(e.key === 'Enter'){
                    this.executeCommand();
                }
                else if(e.key === 'Backspace'){
                    this.removeLastChar();
                }
            } 
        });
    }

    getStringPosition(){
        let str = "";
        if(this.position instanceof Disk){
            str += this.position.name + '\\:';
        }
        else{
            let curr = this.position;
            while(curr.parent instanceof Folder){
                if(str === ''){
                    str = curr.name;
                }
                else{
                    str = curr.name + '\\' + str;
                }
                curr = curr.parent;
            }
            if(str === ''){
                str = curr.parent.name + ':\\' + curr.name;
            }
            else{
                str = curr.parent.name + ':\\' + curr.name + '\\' + str; 
            }

        }
        return str;
    }

    /** Commands */

    help(args){
        this.newLine('<span class="commands">CD</span> Change active directory');
        this.newLine('<span class="commands">OPEN</span> Open or execute file');
        this.newLine('<span class="commands">CLEAR</span> Clear console');
        this.newLine('<span class="commands">EXIT</span> Exit window');
        this.newLine('<span class="commands">HELP</span> List of available commands');
        this.newLine('<span class="commands">NANO</span> Edit file content');
        this.newLine('<span class="commands">LS</span> View list of folders and files');
        this.newLine('<span class="commands">MKDIR</span> Create directory');
        this.newLine('<span class="commands">TOUCH</span> Create file in the current directory');
        this.newLine('<span class="commands">ECHO</span> Print content');
        this.newLine('<span class="commands">RM</span> Delete file or directory');
        this.newLine('<span class="commands">RELOAD</span> Reload current window');
    }

    clear(args){
        document.querySelectorAll('.line').forEach(l => l.remove());
    }

    exit(args){
        document.location.href = "https://www.google.fr/";
    }

    reload(args){
        document.location.reload();
    }

    mkdir(args){
        const name = args.replace(' ', '_');
        this.fs.Create('Folder', [name, this.position]);
    }

    touch(args){
        const name = args.replace(' ', '_');
        this.fs.Create('File', [name, this.position]);
    }

    rm(args){
        this.WorkInProgress();
    }

    nano(args){
        this.WorkInProgress();
    }
    
    open(args){
        const file = Files.Get(args);
        if(file !== undefined){
            if(file.ext === 'txt'){
                this.window.querySelector('#file_name').innerHTML = file.name;
                const content = this.window.querySelector('.content');
                content.innerHTML = "";
                file.content.forEach(l => {
                    const line = document.createElement('p');
                    line.innerHTML = l;
                    content.append(line);
                });
                document.body.classList.add('wopen');
            }
            else{
                file['content']();
            }
        }
        else{
            this.newLine(`The file ${this.strPosition}\\${args} doest exist`);
        }
    }

    ls(args){
        const validArgs = ['-a'];
        if(args === null || validArgs.includes(args)){      
            let str = "..";
            const hidden = args === '-a' ? true : false;
            this.position.content.map(c => {
                if(! c.name.startsWith('.') || (c.name.startsWith('.') && hidden)) 
                    str += '&nbsp;&nbsp;&nbsp;&nbsp;' + c.name;
            });
            this.newLine(str);
        }
        else{
            this.newLine(`Unknow ${args} argument for this command`);
        }
    }

    cd(args){
        const validArgs = ['..'];
        this.position.content.map(e => {if(e instanceof Folder) validArgs.push(e.name)});
        if(validArgs.includes(args)){
            if(args === '..'){
                this.position = this.position.parent;
            }
            else{
                this.position = Folder.Get(args);
            }
            this.strPosition = this.getStringPosition();
        }
        else if(args === null){
            this.newLine('No target name given', true);
        }
        else{
            if(Files.Get(args) !== undefined){
                this.newLine(`${args} is not a directory.`, true);
            }
            else{
                this.newLine(`Unable to find the path &laquo; ${this.strPosition}\\${args} &raquo;`, true);
            }
        }
    }

    echo(args){
        let str = args.replace(/['"]/g, '');
        this.newLine(str);
    }


    WorkInProgress(){
        this.newLine('Function not working yet. Work in progress.');
    }

}