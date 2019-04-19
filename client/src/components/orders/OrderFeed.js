import React, { Component } from "react";
import OrderItem from "./OrderItem";
import PropTypes from "prop-types";

class OrderFeed extends Component {
  render() {
    const { orders } = this.props;

    return orders.map(order => <OrderItem key={order._id} order={order} />);
  }
}

OrderFeed.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderFeed;
