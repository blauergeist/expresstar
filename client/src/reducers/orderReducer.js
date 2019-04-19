import {
  ADD_ORDER,
  GET_ORDERS,
  GET_ORDER,
  ORDER_LOADING,
  ASSIGN_ORDER,
  DELETE_ORDER
} from "../actions/types";

const initialState = {
  orders: [],
  order: {},
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

    default:
      return state;
  }
}
