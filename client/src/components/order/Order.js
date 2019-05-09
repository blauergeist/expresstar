import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrder } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import OrderItem from "../orders/OrderItem";

class Order extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  render() {
    const { order, loading } = this.props.order;
    const { profile } = this.props.profile;
    let orderContent;
    let backButton;

    if (Object.keys(profile).length > 0) {
      backButton = (
        <Link to="/orders" className="btn btn-light mb-3">
          Back to Orders Management
        </Link>
      );
    } else {
      backButton = (
        <Link to="/dashboard" className="btn btn-light mb-3">
          Back to Dashboard
        </Link>
      );
    }

    if (order === null || Object.keys(order).length === 0 || loading) {
      orderContent = <Spinner />;
    } else {
      orderContent = (
        <div className="card card-body bg-dark text-white mb-5 mt-5">
          <div className="row ">
            <div className="col-md-12">
              <br />
              <div className="col-md-4 d-inline-block">
                <div className="text-center">
                  <h6 className="text-warning">Recipient's name:</h6>
                  <h4>{order.recName}</h4>
                </div>
                <div className="text-center">
                  <h6 className="text-warning">Recipient's Address:</h6>
                  <h4>
                    {order.recLocation.recStreet}{" "}
                    {order.recLocation.recStreetnumber}
                    {","}
                  </h4>
                  <h4>
                    {order.recLocation.recCity} {order.recLocation.recZipcode}
                  </h4>
                </div>
                <div className="text-center">
                  <h6 className="text-warning">Recipient's Phone number</h6>
                  <h4>{order.recLocation.recPhone}</h4>
                </div>
              </div>

              <div className="col-md-4 d-inline-block">
                <div className="text-center align-baseline">
                  <h6 className="text-warning">Tracking ID</h6>
                  {order._id}
                </div>
                <br />
                <div className="text-center align-baseline">
                  <h6 className="text-warning">Package Description</h6>
                  {order.description}
                </div>
                <br />
                <div>
                  <div className="text-center">
                    <h6 className="text-warning">Shipment Status</h6>
                    <h4>{order.status}</h4>
                  </div>
                  <br />
                  <div className="text-center">
                    <h6 className="text-warning">Assigned Driver</h6>
                    <h4>{order.driver}</h4>
                    <br />
                  </div>
                </div>
              </div>

              <div className="col-md-4 d-inline-block">
                <div className="text-center">
                  <h6 className="text-warning">Sender's name:</h6>
                  <h4>{order.sender.name}</h4>
                </div>
                <div className="text-center">
                  <h6 className="text-warning">Sender's Address:</h6>
                  <h4>
                    {order.sender.street} {order.sender.streetnumber}
                    {","}
                  </h4>
                  <h4>
                    {order.sender.city} {order.sender.zipcode}
                  </h4>
                </div>
                <div className="text-center">
                  <h6 className="text-warning">Sender's Phone number</h6>
                  <h4>{order.sender.phone}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {backButton}
              {orderContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getOrder }
)(Order);
