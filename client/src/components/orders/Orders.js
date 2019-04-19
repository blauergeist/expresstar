import React, { Component } from "react";
import { getOrders } from "../../actions/orderActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import OrderFeed from "./OrderFeed";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    let orderContent;
    const { orders, loading } = this.props.order;
    if (orders === null || loading) {
      orderContent = <Spinner />;
    } else {
      orderContent = <OrderFeed orders={orders} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{orderContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  order: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrders }
)(Orders);
