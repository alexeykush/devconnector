import {DELETE_ACCOUNT, SET_CURRENT_USER} from "./../constants";
import { LOGOUT } from "./../constants";
import isEmpty from "../validation/isEmpty";

const initialState = {
    isAuth: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
              ...state,
              isAuth: !isEmpty(action.payload),
              user: action.payload
            };
        case LOGOUT:
        case DELETE_ACCOUNT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}