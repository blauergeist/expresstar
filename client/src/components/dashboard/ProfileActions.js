import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div className="col-md-12">
      <div className="text-center btn-block grow">
        <Link to="/create-order" className="btn btn-dark btn-block">
          <i className="fas fa-cart-plus mr-1" />
          New Order
        </Link>
      </div>
      <div className="text-center btn-block grow">
        <Link to="/orders" className="btn btn-dark btn-block">
          <i className="fas fa-folder-open mr-1" />
          My Orders
        </Link>
      </div>
      <div className="text-center btn-block grow">
        <Link to="/feedback" className="btn btn-dark btn-block">
          <i className="fas fa-comment-alt mr-1" />
          My Shop Feedback
        </Link>
      </div>
      <div className="text-center btn-block grow">
        <Link to="/edit-profile" className="btn btn-dark btn-block">
          <i className="fas fa-user-circle mr-1" /> Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default ProfileActions;
