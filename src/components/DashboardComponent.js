import React, { useState,useEffect,useContext } from 'react';
import {getAll as getAllUser} from "../services/User";
import {getAll as getAllProject} from "../services/Project";
import {getAll as getAllEvent} from "../services/Event";
import {getAll as getAllItem} from "../services/Item";
import {GlobalContext} from "../utils/Context";

const fetchData = () => {
    const usersPromise = getAllUser();
    const projectsPromise = getAllProject();
    const eventsPromise = getAllEvent();
    const itemsPromise = getAllItem();
    return Promise.all([usersPromise,projectsPromise,eventsPromise,itemsPromise]);
}

const DashboardComponent = () => {
    const [users,setUsers] = useState([]);
    const [events,setEvents] = useState([]);
    const [projects,setProjects] = useState([]);
    const [items,setItems] = useState([]);
    const {showError} = useContext(GlobalContext);

    console.log(users);
    console.log(projects);
    console.log(events);
    console.log(items);
    
    useEffect(()=>{
        fetchData()
        .then(([users,projects,events,items]) => {
            setUsers(users);
            setProjects(projects);
            setEvents(events);
            setItems(items);
        })
        .catch(error => {console.log(error); showError(error.message)});
    },[]);

    return (
        <h1>
            Dashboard Component
        </h1>
    );
}

export default DashboardComponent;