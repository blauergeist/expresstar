import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      city: "",
      street: "",
      streetnumber: "",
      zipcode: "",
      phone: "",
      description: "",
      olx: "",
      facebook: "",
      instagram: "",
      website: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      city: this.state.city,
      street: this.state.street,
      streetnumber: this.state.streetnumber,
      zipcode: this.state.zipcode,
      phone: this.state.phone,
      company: this.state.company,
      description: this.state.description,
      website: this.state.website,
      olx: this.state.olx,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const socialInputs = (
      <div>
        <InputGroup
          placeholder="Shop website URL"
          name="website"
          icon="far fa-window-maximize"
          value={this.state.website}
          onChange={this.onChange}
          error={errors.website}
        />
        <InputGroup
          placeholder="OLX Shop URL"
          name="olx"
          icon="fas fa-shopping-cart"
          value={this.state.olx}
          onChange={this.onChange}
          error={errors.olx}
        />
        <InputGroup
          placeholder="Facebook Shop URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Instagram Shop URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
        />
      </div>
    );

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Profile</h1>
              <p className="lead text-center">
                The more info, the better the profile
              </p>
              <small className="d-block pb-3">
                Fields starting with * are required
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle used to access your profile through an URL."
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your full company name"
                />
                <small className="d-block pb-18 pt-18">
                  Address and contact of your headquarters
                </small>
                <TextFieldGroup
                  placeholder="* City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info="The city in which your headquarters is located"
                />
                <TextFieldGroup
                  placeholder="* Street"
                  name="street"
                  value={this.state.street}
                  onChange={this.onChange}
                  error={errors.street}
                  info="The street in which your headquarters is located"
                />
                <TextFieldGroup
                  placeholder="* Street number"
                  name="streetnumber"
                  value={this.state.streetnumber}
                  onChange={this.onChange}
                  error={errors.streetnumber}
                  info="Entrance number"
                />
                <TextFieldGroup
                  placeholder="* Zip code"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.onChange}
                  error={errors.zipcode}
                  info="Postal code of your area"
                />
                <TextFieldGroup
                  placeholder="* Phone number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Your primary contact phone number"
                />
                <TextAreaFieldGroup
                  placeholder="* Description of your shop"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="What you sell, what's your edge, etc."
                />
                <small className="d-block pb-7 pt-18">
                  Links to your shops
                </small>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
