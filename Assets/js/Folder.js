class Folder{

    constructor(name, parent, disk){
        this.name = name;
        this.parent = parent;
        this.disk = disk || parent.disk;
    }
}