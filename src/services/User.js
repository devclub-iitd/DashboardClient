import User from "../models/User";
import {User as UserAPI,createBasicHooks} from "../utils/Api";

export const {getAll,get,update} = createBasicHooks(UserAPI,User);