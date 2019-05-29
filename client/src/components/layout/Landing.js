import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Expresstar</h1>
                <p className="lead">
                  {" "}
                  Providing quality and quantity to your selling & buying
                  process.
                </p>
                <hr />
                <div className="pt-5">
                  <Link
                    to="/register"
                    className="btn btn-lg btn-warning text-white mr-2"
                  >
                    Register
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                  <p className="small pt-3">
                    {" "}
                    Please register or log in to an existing account to find
                    trusted online shops, view your delivery information and
                    manage your orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
