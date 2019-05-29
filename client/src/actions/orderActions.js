import axios from "axios";

import {
  ADD_ORDER,
  GET_ERRORS,
  GET_ORDERS,
  GET_ORDER,
  ORDER_LOADING,
  ASSIGN_ORDER,
  DELETE_ORDER,
  GET_DRIVERS,
  GET_SELECTED
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
  window.alert("Order successful");
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

//get a single order
export const getOrder = id => dispatch => {
  dispatch(setOrderLoading());

  axios
    .get(`/api/orders/${id}`)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ORDER,
        payload: null
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
  window.location.reload();
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

//get all drivers in the system
export const getDrivers = () => dispatch => {
  axios
    .get("/api/users/drivers")
    .then(res =>
      dispatch({
        type: GET_DRIVERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DRIVERS,
        payload: {}
      })
    );
};

//get selected driver
export const getSelectedDriver = driverSelected => dispatch => {
  dispatch({
    type: GET_SELECTED,
    payload: driverSelected
  });
};

//set loading state
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
