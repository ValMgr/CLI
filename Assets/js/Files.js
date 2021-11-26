class Files{

    static list = []

    constructor(name, parent){
        this.name = name;
        this.parent = parent;
        this.disk = parent instanceof Disk ? parent : parent.disk;
        this.parent.AddContent(this);
        this.content = [];
        Files.list.push(this);
    }
    
}