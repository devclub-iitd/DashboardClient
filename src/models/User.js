const defaultUser = {
    _id: "",
    email: "",
    name: "",
    entryNumber: "",
    hostel: "",
    gender: "",
    joinYear: new Date(),
    gradYear: new Date(),
    birthDate: new Date(),
    mobileNumber: "",
    hometown: "",
    interests: "",
    specialization: "",
    intro: "",
    displayOnWebsite: false,
    links: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    isFilled: false,
};

class User {
    constructor(user=defaultUser) {
        this.id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.entryNumber = user.entryNumber;
        this.hostel = user.hostel;
        this.gender = user.gender;
        this.joinYear = new Date(user.joinYear);
        this.gradYear = new Date(user.gradYear);
        this.birthDate = new Date(user.birthDate);
        this.mobileNumber = user.mobileNumber;
        this.hometown = user.hometown;
        this.interests = user.interests;
        this.specialization = user.specialization;
        this.intro = user.intro;
        this.displayOnWebsite = user.displayOnWebsite;
        this.links = user.links;
        this.isFilled = user.isFilled;
        this.createdAt = new Date(user.createdAt);
        this.updatedAt = new Date(user.updatedAt);
    }

    static parse(users) {
        let userObjs = [];
        for (let i = 0; i < users.length; i = i + 1) {
            userObjs.push(new User(users[i]));
        }
        userObjs.sort((first,second)=>(second.gradYear - first.gradYear));
        return userObjs;
    }
};

export default User;