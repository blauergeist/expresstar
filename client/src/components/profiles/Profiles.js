import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No shops found</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <h1 className="display-4 text-center">Shop pages</h1>
              <p className="lead text-center">
                Find the shop that suits your needs
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
