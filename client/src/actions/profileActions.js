import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  ADD_FEEDBACK,
  DELETE_FEEDBACK
} from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//set profile array to null
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//setting profile load
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//create a profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete user account
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Once your account is deleted, it cannot be undone. Please confirm your decision."
    )
  ) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//upvote a shop
export const addLike = id => dispatch => {
  axios
    .post(`/api/profile/like/${id}`)
    .then(res => dispatch(getProfiles()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  window.location.reload();
};

//downvote a shop
export const removeLike = id => dispatch => {
  axios
    .post(`/api/profile/unlike/${id}`)
    .then(res => dispatch(getProfiles()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  window.location.reload();
};

//add a comment
export const addComment = (profileId, commentData) => dispatch => {
  axios
    .post(`/api/profile/comment/${profileId}`, commentData)
    .then(res =>
      dispatch({
        type: ADD_FEEDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ADD_FEEDBACK,
        payload: err.response.data
      })
    );
  window.alert("Feedback sent successfully");
  window.location.reload();
};

//delete a comment
export const deleteComment = (profileId, commentId) => dispatch => {
  axios
    .post(`/api/profile/comment/${profileId}/${commentId}`)
    .then(res =>
      dispatch({
        type: DELETE_FEEDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
