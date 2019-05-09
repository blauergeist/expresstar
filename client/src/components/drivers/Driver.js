import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { userInfo } from "os";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import AssignOrder from "./AssignOrder";
import Drivers from "../drivers/Drivers";
import Spinner from "../common/Spinner";
import {
  getDrivers
} from "../../actions/orderActions";

class Driver extends Component {
  componentDidMount() {
    this.props.getDrivers();
  }
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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     status: this.props.order.driver,
  //     driver: ""
  //   };
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  render() {
    const { order, auth, errors } = this.props;
    return (
      
    );
  }
}

Driver.propTypes = {
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  assignOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  driver: PropTypes.object.isRequired,
  getDrivers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(
  mapStateToProps,
  { getDrivers }
)(Driver);
