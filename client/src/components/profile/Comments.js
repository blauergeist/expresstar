import React, { Component } from "react";
import CommentList from "./CommentList";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Comments extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="feed">
        <div className="container">
          <h1 className="display-4 d-flex justify-content-center">
            My Shop's Feedback
          </h1>
          <div className="row">
            <div className="col-md-12">
              <CommentList
                profileId={profile._id}
                comments={profile.comments}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comments.props = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(Comments);
