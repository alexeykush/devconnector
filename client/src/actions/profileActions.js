import axios from "axios";

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    DELETE_ACCOUNT
} from "./../constants";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("/api/profile")
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            });
        });
};

export const deleteAccount = () => dispatch => {
    if (window.confirm("Ary you sure? This can NOT be undone!")) {
        axios
            .delete("/api/profile")
            .then(res => {
                dispatch({
                    type: DELETE_ACCOUNT
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })

    }
};

export const createOrEditProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profile", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const addExperience = (experienceData, history) => dispatch => {
    axios
        .post("/api/profile/experience", experienceData)
        .then(res => history.push("/dashboard"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};

export const deleteExperience = id => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => dispatch(getCurrentProfile()))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};

export const addEducation = (educationData, history) => dispatch => {
    axios
        .post("/api/profile/education", educationData)
        .then(res => history.push("/dashboard"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};


export const deleteEducation = id => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => dispatch(getCurrentProfile()))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};


export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("api/profile/all")
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};


export const getProfileByHandle = (handle,history) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            history.push("/not-found");
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

