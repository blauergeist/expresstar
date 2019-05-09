import React, { Component } from "react";
import { getOrders } from "../../actions/orderActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrderForm from "./OrderForm";
import { Link } from "react-router-dom";

class CreateOrder extends Component {
  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/dashboard" className="btn btn-light mb-3">
                Back to Dashboard
              </Link>
              <OrderForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateOrder.propTypes = {
  order: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  order: state.order
});

export default connect(
  mapStateToProps,
  { getOrders }
)(CreateOrder);
