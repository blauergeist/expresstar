import React, { Component } from "react";
import { getCurrentOrder, assignOrder } from "../../actions/orderActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

class AssignOrder extends Component {
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
  }
  componentDidMount() {
    this.props.getCurrentOrder();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  render() {
    const { errors } = this.state;

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Set a new shipment status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    info="Change shipment status"
                  />
                  <TextFieldGroup
                    placeholder="Assign a driver"
                    name="driver"
                    value={this.state.driver}
                    onChange={this.onChange}
                    error={errors.driver}
                    info="Assign a driver"
                  />
                </div>
                <div className="row d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary col-md-6">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AssignOrder.propTypes = {
  order: PropTypes.object.isRequired,
  getCurrentOrder: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  assignOrder: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  order: state.order
});

export default connect(
  mapStateToProps,
  { assignOrder, getCurrentOrder }
)(AssignOrder);
