import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { getOrder } from "../../actions/orderActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const trackOrder = {
      tracking: this.state.tracking
    };

    this.props.getOrder(trackOrder);
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { errors } = this.props.errors;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user created a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name} </Link>
            </p>
            <ProfileActions />
            <div className="text-center p-5">
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                <i className="fas fa-user-slash mr-1" />
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        //user logged in, didn't create a profile yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Enter a tracking ID"
                  name="tracking"
                  value={this.state.tracking}
                  onChange={this.onChange}
                  error={errors}
                  info="If you wish to track your purchase, please enter the tracking ID you were provided by your seller"
                />
              </div>
              <button type="submit" className="btn btn-lg btn-info">
                <Link to={`/order/${this.state.tracking}`} className="btn-info">
                  Track Order ID
                </Link>
              </button>
            </form>
            <br /> <br />
            <p>
              If you wish to create your shop's profile, click below and add
              your info to get started.
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row ">
            <div className="col-md-12 ">
              <h1 className="display-4 d-flex justify-content-center">
                Dashboard
              </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getOrder }
)(Dashboard);
