class FileSystem{

    static #instance = null;

    static getInstance(){
        return FileSystem.#instance;
    }

    static FileType = ['Disk', 'Folder', 'Files'];

    constructor(){
        if(FileSystem.#instance === null){
            FileSystem.#instance = this;
        }
        else{
            throw 'An instance of this Class already exist';
        }
    }


    Create(type, args){
        if(FileSystem.FileType.includes(type)){
            switch (type) {
                case 'Disk':
                    if(args.length !== 1) throw 'Invalid arguments given';
                    new Disk(args[0]);
                    break;
                case 'Folder':
                    if(args.length !== 2) throw 'Invalid arguments given';
                    new Folder(args[0], args[1]);
                    break;
                case 'Files':
                    if(args.length !== 2) throw 'Invalid arguments given';
                    new Files(args[0], args[1]);
                    break;
            }
        }
        else{
            throw 'Unknow file type';
        }
    }


}