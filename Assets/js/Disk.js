class Disk{

    static list = [];

    static Get(name){
        return Disk.list.filter(d => d.name === name)[0];
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