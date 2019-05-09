import {
  ADD_ORDER,
  GET_ORDERS,
  GET_ORDER,
  ORDER_LOADING,
  ASSIGN_ORDER,
  DELETE_ORDER,
  GET_DRIVERS,
  GET_SELECTED
} from "../actions/types";

const initialState = {
  orders: [],
  deliverySelect: {},
  order: {},
  drivers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case GET_SELECTED:
      return {
        ...state,
        deliverySelect: action.payload,
        loading: false
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order._id !== action.payload)
      };
    case ASSIGN_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
