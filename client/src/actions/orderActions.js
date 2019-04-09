import axios from "axios";

import { ADD_ORDER, GET_ERRORS } from ".types";

//add an order
export const addOrder = orderData => dispatch => {
  axios
    .post("/api/orders", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
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
