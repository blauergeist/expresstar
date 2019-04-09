import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-secondary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <p className="display-4 text-center text-warning">
                {isEmpty(profile.company) ? (
                  <p className="display-4 text-center">{profile.user.name}</p>
                ) : (
                  <p className="display-4 text-center">{profile.company}</p>
                )}
              </p>
              <p />
              <p>
                {profile.location.street} {profile.location.streetnumber}
                {", "}
                {profile.location.city} {profile.location.zipcode}
              </p>
              <p>{profile.location.phone}</p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-warning p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.olx) ? null : (
                  <a
                    className="text-warning p-2"
                    href={profile.social.olx}
                    target="_blank"
                  >
                    <i className="fas fa-shopping-cart fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-warning p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-warning p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
