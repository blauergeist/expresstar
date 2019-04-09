import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

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
            <div
              className="btn-group mb-4 d-flex justify-content-center"
              role="group"
            >
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
            <p>
              You have not created your profile. Click below and add your info.
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
