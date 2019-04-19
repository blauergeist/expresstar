import axios from "axios";

import {
  ADD_ORDER,
  GET_ERRORS,
  GET_ORDERS,
  GET_ORDER,
  ORDER_LOADING,
  ASSIGN_ORDER,
  DELETE_ORDER
} from "./types";

//add an order
export const addOrder = orderData => dispatch => {
  axios
    .post("/api/orders", orderData)
    .then(res =>
      dispatch({
        type: ADD_ORDER,
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

//delete/cancel an order
export const cancelOrder = id => dispatch => {
  axios
    .delete(`/api/orders/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ORDER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get orders
export const getOrders = () => dispatch => {
  dispatch(setOrderLoading());

  axios
    .get("/api/orders")
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDERS,
        payload: err.response.data
      })
    );
};

//assign driver and to an order
export const assignOrder = assignData => dispatch => {
  axios
    .post("/api/orders/assign", assignData)
    .then(res =>
      dispatch({
        type: ASSIGN_ORDER,
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

export const getCurrentOrder = () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get("/api/orders/:id")
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDER,
        payload: {}
      })
    );
};

//set loading state
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
