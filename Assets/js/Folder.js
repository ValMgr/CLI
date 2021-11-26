class Folder{

    static list = []

    static Get(name){
        return Folder.list.filter(d => d.name === name)[0];
    }

    constructor(name, parent){
        this.name = name;
        this.parent = parent;
        this.disk = parent instanceof Disk ? parent : parent.disk;
        this.parent.AddContent(this);
        this.content = [];
        Folder.list.push(this);
    }

    AddContent(c){
        if(c instanceof Disk){
            throw 'Disk cannot be children of Folders';
        } else {
            this.content.push(c)
        }
    }

}