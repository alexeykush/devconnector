import axios from "axios"

import { removeAuthToken, setAuthToken } from "../utils/authTokenHandler";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./../constants";
import { SET_CURRENT_USER } from "./../constants";
import { LOGOUT } from "./../constants";

export const registerUser = (userData,history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(() => history.push("/login"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });

};

export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login",userData)
        .then( res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken",token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const logoutUser = () => {
    localStorage.removeItem("jwtToken");
    removeAuthToken();
    return {
        type:LOGOUT
    }
};














