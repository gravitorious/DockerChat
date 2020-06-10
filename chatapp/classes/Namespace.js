class Namespace{
    constructor(id, nsTitle, img, endpoint){
        this.id = id;
        this.img = img; //image
        this.nsTitle = nsTitle;
        this.endpoint = endpoint; // /mozzila, /linux etc.
        this.rooms = [];
    }

    addRoom(roomObj){
        this.rooms.push(roomObj);
    }

}

module.exports = Namespace;