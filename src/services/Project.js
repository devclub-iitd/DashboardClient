import Project from "../models/Project";
import {Project as ProjectAPI,createBasicHooks} from "../utils/Api";

export const {getAll,get,update} = createBasicHooks(ProjectAPI,Project);