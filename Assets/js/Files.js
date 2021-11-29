class Files {

    static list = [];

    static Get(name) {
        return Files.list.filter(d => d.name === name)[0];
    }

    static fileType = ['txt', 'exe'];

    constructor(name, content = [], parent) {
        if (!name.startsWith('.') && name.indexOf('.') !== -1 && Files.fileType.includes(name.split('.')[1])) {
            this.ext = name.split('.')[1];
        }
        else {
            if(typeof content !== 'function'){ 
                this.ext = 'txt';
                if (!name.includes('.txt') && !name.startsWith('.')) name += '.txt';
            }
            else{
                this.ext = 'exe';
                if (!name.includes('.exe')) name += '.exe';
            }
        }
        this.name = name;
        this.parent = parent;
        this.disk = parent instanceof Disk ? parent : parent.disk;
        this.parent.AddContent(this);
        this.content = content;
        Files.list.push(this);
    }

    launch() {
        switch (this.ext) {
            case 'txt':
                this.read();
                break;
            case 'exe':
                this.executable();
                break;
            default:
                break;
        }

    }

    read() {
        return this.content;
    }

    

    executable() {

    }

}