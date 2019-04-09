const defaultItem = {
    _id: "",
    parentId: "",
    title: "",
    description: "",
    type: "",
    labels: "",
    assignee: [],
    dueDate: new Date(),
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
};

class Item {
    constructor(item=defaultItem) {
        this.id = item._id,
        this.parentId = item.parentId;
        this.title = item.title;
        this.description = item.description;
        this.type = item.type;
        this.labels = item.labels;
        this.assignee = item.assignee;
        this.dueDate = new Date(item.dueDate);
        this.completed = item.completed;
        this.createdAt = new Date(item.createdAt);
        this.updatedAt = new Date(item.updatedAt);
    }

    static parse(items) {
        let itemObjs = [];
        for (let i = 0; i < items.length; i = i + 1) {
            itemObjs.push(new Item(items[i]));
        }
        itemObjs.sort((first,second)=>(second.dueDate - first.dueDate));
        return itemObjs;
    }
};

export default Item;