const defaultProject = {
    _id: "",
    name: "",
    description: "",
    members: [],
    status: "",
    startDate: new Date(),
    endDate: new Date(),
    origin: "",
    perks: "",
    requirements: "",
    displayOnWebsite: false,
    isInternal: true,
    links: {},
    createdAt: new Date(),
    updatedAt: new Date()
};

class Project {
    constructor(project=defaultProject) {
        this.id = project._id;
        this.name = project.name;
        this.description = project.description;
        this.members = project.members;
        this.status = project.status;
        this.startDate = new Date(project.startDate);
        this.endDate = new Date(project.endDate);
        this.origin = project.origin;
        this.perks = project.perks;
        this.requirements = project.requirements;
        this.displayOnWebsite = project.displayOnWebsite;
        this.isInternal = project.isInternal;
        this.links = project.links;
        this.createdAt = new Date(project.createdAt);
        this.updatedAt = new Date(project.updatedAt);
    }

    static parse(projects) {
        let projectObjs = [];
        for (let i = 0; i < projects.length; i = i + 1) {
            projectObjs.push(new Project(projects[i]));
        }
        projectObjs.sort((first,second)=>(second.endDate - first.endDate));
        return projectObjs;
    }
};

export default Project;