/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

function isOngoing(startDate, endDate) {
    const today = new Date();
    if (today >= startDate && today <= endDate) {
        return true;
    }
    return false;
}

function isCompleted(endDate) {
    const today = new Date();
    if (today > endDate) {
        return true;
    }
    return false;
}

function isUpcoming(startDate) {
    const today = new Date();
    if (today < startDate) {
        return true;
    }
    return false;
}

export const getStatus = (event) => {
    if (isOngoing(event.start_date, event.end_date)) {
        return 'ongoing';
    }
    if (isCompleted(event.end_date)) {
        return 'completed';
    }
    if (isUpcoming(event.start_date)) {
        return 'upcoming';
    }
    return '';
};

export const getUserEvents = (user, events) => {
    return events !== null && events !== undefined
        ? events.filter((event) => event.assignee.includes(user._id))
        : [];
};

export const sortEventsByStatus = (events) => {
    return [...events].sort((e1, e2) => {
        // if (isOngoing(e1) && isOngoing(e2)) {
        //     if (new Date(e1.start_date) == new Date(e2.start_date)) {
        //         if (e1.name > e2.name) {
        //             return 1;
        //         }
        //     return -1;
        //     }
        //     if (new Date(e1.start_date) > new Date(e2.start_date))  {
        //         return 1;
        //     }
        //     return -1;
        // }
        // if (isOngoing(e1)) {
        //     return 1;
        // }
        // if (isOngoing(e2)) {
        //     return -1;
        // }
        // if (isUpcoming(e1) && isUpcoming(e2)) {
        //     if (e1.name > e2.name) {
        //         return 1;
        //     }
        //     return -1;
        // }
        // if (isUpcoming(e1)) {
        //     return 1;
        // }
        // if (isUpcoming(e2)) {
        //     return -1;
        // }
        // if (isCompleted(e1)) {
        //     return 1;
        // }
        // if (isCompleted(e2)) {
        //     return -1;
        // }
        // if (e1.name > e2.name) {
        //     return 1;
        // }
        // return -1;
        if (new Date(e1.start_date) === new Date(e2.start_date)) {
            if (e1.name > e2.name) {
                return -1;
            }
            return 1;
        }
        if (new Date(e1.start_date) > new Date(e2.start_date)) {
            return -1;
        }
        return 1;
    });
};
