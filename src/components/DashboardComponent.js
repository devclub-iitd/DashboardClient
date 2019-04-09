import React, { useEffect } from 'react';
import {getAll as getAllUser} from "../services/User";
import {getAll as getAllProject} from "../services/Project";
import {getAll as getAllEvent} from "../services/Event";
import {getAll as getAllItem} from "../services/Item";

const fetchData = () => {
    const usersPromise = getAllUser();
    const projectsPromise = getAllProject();
    const eventsPromise = getAllEvent();
    const itemsPromise = getAllItem();
    return Promise.all([usersPromise,projectsPromise,eventsPromise,itemsPromise]);
}

const DashboardComponent = () => {
    useEffect(()=>{
        fetchData()
        .then(([users,projects,events,items]) => {
            console.log(users);
            console.log(projects);
            console.log(events);
            console.log(items);
        });
    },[]);

    return (
        <h1>
            Dashboard Component
        </h1>
    );
}

export default DashboardComponent;