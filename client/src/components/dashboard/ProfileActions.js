import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div className="btn-group mb-4 d-flex justify-content-center" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle mr-1" /> Edit Profile
      </Link>
      <Link to="/comments" className="btn btn-light">
        <i className="fas fa-comment-alt mr-1" />
        My Shop Feedback
      </Link>
    </div>
  );
}

export default ProfileActions;
