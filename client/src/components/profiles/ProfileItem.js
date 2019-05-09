import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body text-light bg-dark mb-3 grow">
        <div className="row d-flex justify-content-center">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.company}</h3>
            <p>
              {profile.city}{" "}
              {isEmpty(profile.location.city) ? null : (
                <span>at {profile.location.city}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.description) ? null : (
                <span>{profile.description}</span>
              )}
            </p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn btn-warning text-dark"
            >
              View Shop Page
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
