import Item from "../models/Item";
import {Item as ItemAPI,createBasicHooks} from "../utils/Api";

export const {getAll,get,update} = createBasicHooks(ItemAPI,Item);