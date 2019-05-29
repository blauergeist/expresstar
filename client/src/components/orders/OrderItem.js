import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { userInfo } from "os";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Drivers from "../drivers/Drivers";
import Spinner from "../common/Spinner";
import {
  getCurrentOrder,
  assignOrder,
  cancelOrder,
  getDrivers,
  getSelectedDriver
} from "../../actions/orderActions";
import Particles from "react-particles-js";

class OrderItem extends Component {
  componentDidMount() {
    this.props.getDrivers();
  }
  //point of return
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
    const { deliverySelect } = this.props;
    const options = [
      { label: "Set order status", value: "To be assigned" },
      {
        label: "Processed, awaiting driver.",
        value: "Processed, awaiting driver."
      },
      {
        label: "Picked up from the seller.",
        value: "Picked up from the seller."
      },
      { label: "Arrived to warehouse.", value: "Arrived to warehouse" },
      { label: "On the way to the buyer.", value: "On the way to the buyer." },
      {
        label: "Package arriving tomorrow morning.",
        value: "Package arriving tomorrow morning."
      },
      {
        label: "Package arriving tomorrow afternoon.",
        value: "Package arriving tomorrow afternoon."
      },
      {
        label: "Package arriving today morning.",
        value: "Package arriving today morning."
      },
      {
        label: "Package arriving today afternoon.",
        value: "Package arriving today afternoon."
      },
      {
        label: "Package delivered, money collected.",
        value: "Package delivered, money collected."
      },
      {
        label: "Money delivered, order fullfilled.",
        value: "Money delivered, order fullfilled."
      }
    ];
    const particlesOptions = {
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 400
          }
        }
      }
    };
    return (
      <div className="card card-body bg-dark text-white mb-5 mt-5">
        <div className="row ">
          <div className="col-md-12">
            <br />
            <div>
              <div className="col-md-6 d-inline-block border border-warning">
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
              <div className="col-md-6 d-inline-block border border-warning">
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
            </div>

            <div className="col-md-12 d-inline-block">
              <div className="text-center align-baseline">
                <br />
                <h6 className="text-warning">Tracking ID</h6>
                {order._id}
              </div>
              <br />
              <div className="text-center align-baseline">
                <h6 className="text-warning">Package Description</h6>
                {order.description}
              </div>{" "}
              <br />
              <br />
              {auth.user.role === "admin" ? (
                <div>
                  <br />
                  <Drivers />
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <TextFieldGroup
                        placeholder="Assign a driver"
                        name="driver"
                        value={this.state.driver}
                        onChange={this.onChange}
                        info="Please confirm your driver selection"
                      />
                      <SelectListGroup
                        placeholder="Set a new shipment status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        info="Change shipment status"
                        options={options}
                      />
                      <div className="text-center">
                        <h6 className="text-warning">Assigned Driver ID</h6>
                        <h4>{order.driver}</h4>
                      </div>
                      <div className="text-center">
                        <h6 className="text-warning">Assigned Status</h6>
                        <h4>{order.status}</h4>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary col-md-6"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              ) : auth.user.role === "driver" ? (
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <SelectListGroup
                      placeholder="Set a new shipment status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      info="Change shipment status"
                      options={options}
                    />
                    <div className="text-center">
                      <h6 className="text-warning">Shipment Status</h6>
                      <h4>{order.status}</h4>
                    </div>
                    <div className="text-center">
                      <h6 className="text-warning">Assigned Driver</h6>
                      <h4>{order.driver}</h4>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary col-md-6">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="text-center">
                    <h6 className="text-warning">Shipment Status</h6>
                    <h4>{order.status}</h4>
                  </div>
                  <div className="text-center">
                    <h6 className="text-warning">Assigned Driver</h6>
                    <h4>{order.driver}</h4>
                  </div>
                </div>
              )}
              <div className="text-center p-3">
                <Link to={`/order/${order._id}`} className="btn btn-info mr-1">
                  Order Page
                </Link>
                {order.status === "Awaiting pickup" ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, order._id)}
                    type="button"
                    className="btn btn-danger mr-1 "
                  >
                    <i className="fas fa-times" /> Cancel this order
                  </button>
                ) : null}
              </div>
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
  cancelOrder: PropTypes.func.isRequired,
  getDrivers: PropTypes.func.isRequired,
  deliverySelect: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  driver: state.order.driver,
  selectedOption: state.order.selectedOption,
  deliverySelect: state.order.deliverySelect
});

export default connect(
  mapStateToProps,
  { assignOrder, cancelOrder, getDrivers, getSelectedDriver }
)(OrderItem);
