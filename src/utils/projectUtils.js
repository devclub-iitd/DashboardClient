/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
export const getUserProjects = (user, projects) => {
    return projects !== null && projects !== undefined
        ? projects.filter((project) => project.members.includes(user._id))
        : [];
};

export const sortProjectsByStatus = (projects) => {
    return [...projects].sort((p1, p2) => {
        if (
            p1.status.toLowerCase() === 'ongoing' &&
            p2.status.toLowerCase() === 'ongoing'
        ) {
            if (p1.name > p2.name) {
                return 1;
            }
            return -1;
        }
        if (p1.status.toLowerCase() === 'ongoing') {
            return 1;
        }
        if (p2.status.toLowerCase() === 'ongoing') {
            return -1;
        }
        if (
            p1.status.toLowerCase() === 'idea' &&
            p2.status.toLowerCase() === 'idea'
        ) {
            if (p1.name > p2.name) {
                return 1;
            }
            return -1;
        }
        if (p1.status.toLowerCase() === 'idea') {
            return 1;
        }
        if (p2.status.toLowerCase() === 'idea') {
            return -1;
        }
        if (p1.name > p2.name) {
            return 1;
        }
        return -1;
    });
};
