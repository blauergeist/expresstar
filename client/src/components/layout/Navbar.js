import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/orders">
              {" "}
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              {" "}
              Dashboard
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: "25px", marginRight: "5px" }}
                title="Connect Gravatar to your email"
              />
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-warning" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-warning" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            EXPRESSTAR
          </Link>
          <Link className="nav-link text-warning" to="/profiles">
            {" "}
            Shop List
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
