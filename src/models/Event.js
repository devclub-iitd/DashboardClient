const defaultEvent = {
    _id: "",
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    displayOnWebsite: false,
    links: {},
    createdAt: new Date(),
    updatedAt: new Date()
};

class Event {
    constructor(event=defaultEvent) {
        this.id = event._id,
        this.name = event.name;
        this.description = event.description;
        this.startDate = new Date(event.startDate);
        this.endDate = new Date(event.endDate);
        this.displayOnWebsite = event.displayOnWebsite;
        this.links = event.links;
        this.createdAt = new Date(event.createdAt);
        this.updatedAt = new Date(event.updatedAt);
    }

    static parse(events) {
        let eventObjs = [];
        for (let i = 0; i < events.length; i = i + 1) {
            eventObjs.push(new Event(events[i]));
        }
        eventObjs.sort((first,second)=>(second.endDate - first.endDate));
        return eventObjs;
    }
};

export default Event;