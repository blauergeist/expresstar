import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const fblink = `http://${profile.social.facebook}`;
    const iglink = `http://${profile.social.instagram}`;
    const olxlink = `http://${profile.social.olx}`;
    const shopweb = `http://${profile.website}`;

    return (
      <div className="row grow">
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
                    href={shopweb}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.olx) ? null : (
                  <a
                    target="_blank"
                    className="text-warning p-2"
                    href={olxlink}
                  >
                    <i className="fas fa-shopping-cart fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a target="_blank" className="text-warning p-2" href={fblink}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a target="_blank" className="text-warning p-2" href={iglink}>
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
