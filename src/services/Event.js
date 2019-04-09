import Event from "../models/Event";
import {Event as EventAPI,createBasicHooks} from "../utils/Api";

export const {getAll,get,update} = createBasicHooks(EventAPI,Event);