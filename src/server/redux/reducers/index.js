import { combineReducers } from "redux";
import loading from "./loading";
import user from "./user";

export default combineReducers({
    loading,
    user
})