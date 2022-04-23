export default class Disk{

    static list = [];

    static Get(name){
        if(name.length > 1) name = name[0];
        return Disk.list.find(d => d.name === name);
    }
    

    constructor(name){
        this.name = name;
        this.content = [];
        Disk.list.push(this);
    }


    AddContent(c){
        if(c instanceof Disk){
            throw 'Disk cannot be children of another Disk';
        } else {
            this.content.push(c)
        }
    }

}