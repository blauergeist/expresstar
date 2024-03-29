import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  ADD_FEEDBACK,
  DELETE_FEEDBACK
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  feedbackSent: false,
  feedbackRemoved: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbackSent: true
      };
    case DELETE_FEEDBACK:
      return {
        ...state,
        feedbackRemoved: true
      };

    default:
      return state;
  }
}
