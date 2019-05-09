import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import {
  getProfileByHandle,
  getCurrentProfile,
  addLike,
  removeLike
} from "../../actions/profileActions";
import authReducer from "../../reducers/authReducer";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Shops
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="col-md-10">
            <button
              onClick={this.onLikeClick.bind(this, profile._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light-">{profile.likes.length}</span>
            </button>
            <button
              onClick={this.onUnlikeClick.bind(this, profile._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <small className="form-text text-muted">
              If you have a positive experience with this shop, give them a
              rating point.
            </small>
          </div>{" "}
          <br />
          <CommentForm profileId={profile._id} />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, addLike, removeLike, getCurrentProfile }
)(Profile);
