import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { userInfo } from "os";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import AssignOrder from "./AssignOrder";
import {
  getCurrentOrder,
  assignOrder,
  cancelOrder
} from "../../actions/orderActions";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.order.status,
      driver: this.props.order.driver,
      id: this.props.order._id,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const updateOrder = {
      status: this.state.status,
      driver: this.state.driver,
      _id: this.state.id
    };

    this.props.assignOrder(updateOrder);
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     status: this.props.order.driver,
  //     driver: ""
  //   };
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }
  onDeleteClick(id) {
    this.props.cancelOrder(id);
  }
  render() {
    const { order, auth, errors } = this.props;

    return (
      <div className="card card-body bg-dark text-white mb-5 mt-5">
        <div className="row ">
          <div className="col-md-12">
            <br />
            <p className="text-center" />
            <div className="col-md-4 d-inline-block">
              <p className="text-center">
                <h6 className="text-warning">Recipient's name:</h6>
                <h4>{order.recName}</h4>
              </p>
              <p className="text-center">
                <h6 className="text-warning">Recipient's Address:</h6>
                <h4>
                  {order.recLocation.recStreet}{" "}
                  {order.recLocation.recStreetnumber}
                  {","}
                </h4>
                <h4>
                  {order.recLocation.recCity} {order.recLocation.recZipcode}
                </h4>
              </p>
              <p className="text-center">
                <h6 className="text-warning">Recipient's Phone number</h6>
                <h4>{order.recLocation.recPhone}</h4>
              </p>
            </div>

            <div className="col-md-4 d-inline-block">
              <p className="text-center align-baseline">
                <h6 className="text-warning">Tracking ID</h6>
                {order._id}
              </p>{" "}
              <p className="text-center align-baseline">
                <h6 className="text-warning">Package Description</h6>
                {order.description}
              </p>{" "}
              {auth.user.role === "admin" ? (
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Set a new shipment status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      info="Change shipment status"
                    />
                    <TextFieldGroup
                      placeholder="Assign a driver"
                      name="driver"
                      value={this.state.driver}
                      onChange={this.onChange}
                      info="Assign a driver"
                    />
                  </div>
                  <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary col-md-6">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-center">
                    <h6 className="text-warning">Shipment Status</h6>
                    <h4>{order.status}</h4>
                  </p>
                  <p className="text-center">
                    <h6 className="text-warning">Assigned Driver</h6>
                    <h4>{order.driver}</h4>
                  </p>
                </div>
              )}
              <p className="text-center p-3">
                <Link to={`/order/${order._id}`} className="btn btn-info mr-1">
                  Order Details
                </Link>
                {order.status === "Awaiting pickup" ||
                auth.user.role === "admin" ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, order._id)}
                    type="button"
                    className="btn btn-danger mr-1 "
                  >
                    <i className="fas fa-times" /> Cancel this order
                  </button>
                ) : null}
              </p>
            </div>

            <div className="col-md-4 d-inline-block">
              <p className="text-center">
                <h6 className="text-warning">Sender's name:</h6>
                <h4>{order.sender.name}</h4>
              </p>
              <p className="text-center">
                <h6 className="text-warning">Sender's Address:</h6>
                <h4>
                  {order.sender.street} {order.sender.streetnumber}
                  {","}
                </h4>
                <h4>
                  {order.sender.city} {order.sender.zipcode}
                </h4>
              </p>
              <p className="text-center">
                <h6 className="text-warning">Sender's Phone number</h6>
                <h4>{order.sender.phone}</h4>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  assignOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { assignOrder, cancelOrder }
)(OrderItem);
