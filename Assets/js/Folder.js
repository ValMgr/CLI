import Disk from "./Disk.js";

export default class Folder{

    static list = []

    static Get(path){
        path = path.replace(':', '').split('\\').filter(e => e !== '');
        let folder = Disk.Get(path.shift());
        path.forEach(f => {
            if(folder) folder = folder.content.find(e => e.name === f);
        });
        return folder;
    }

    constructor(name, parent){
        this.name = name;
        this.parent = parent;
        this.disk = parent instanceof Disk ? parent : parent.disk;
        this.weight = 256;
        this.parent.AddContent(this);
        this.content = [];
        Folder.list.push(this);
    }

    updateWeight(){
        this.weight = 256;
        this.content.forEach(c => {
            this.weight += c.weight;
        });
    }

    AddContent(c){
        if(c instanceof Disk){
            throw 'Disk cannot be children of Folders';
        } else {
            this.content.push(c)
            this.weight += c.weight;
            this.parent.updateWeight();

        }
    }

}