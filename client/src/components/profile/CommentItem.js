import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/profileActions";
import tachyons from "tachyons";

class CommentItem extends Component {
  onDeleteClick(profileId, commentId) {
    this.props.deleteComment(profileId, commentId);
  }

  render() {
    const { comment, profileId, auth } = this.props;
    const { profile } = this.props.profile;
    return (
      <div className="d-inline-block">
        <article className="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 grow">
          <div className="tc">
            <img
              src={comment.avatar}
              className="br-100 h3 w3 dib"
              title="Profile picture"
            />
            <h1 className="f4">{comment.name}</h1>
            <hr className="mw3 bb bw1 b--black-10" />
          </div>
          <p className="lh-copy measure center f6 black-70">{comment.text}</p>
          {/* <button
            onClick={this.onDeleteClick.bind(this, profileId, comment._id)}
            type="button"
            className="btn btn-danger mr-1"
          >
            <i className="fas fa-times" />
          </button> */}
        </article>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
