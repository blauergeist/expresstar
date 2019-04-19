import React, { Component } from "react";
import { addOrder } from "../../actions/orderActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      driver: "",
      description: "",
      //recipient
      recName: "",
      recCity: "",
      recStreet: "",
      recStreetnumber: "",
      recZipcode: "",
      recPhone: "",
      //sender
      name: this.props.auth.user.name,
      city: this.props.profile.profile.location.city,
      street: this.props.profile.profile.location.street,
      streetnumber: this.props.profile.profile.location.streetnumber,
      zipcode: this.props.profile.profile.location.zipcode,
      phone: this.props.profile.profile.location.phone,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newOrder = {
      status: this.state.status,
      driver: this.state.driver,
      description: this.state.description,
      recName: this.state.recName,
      recCity: this.state.recCity,
      recStreet: this.state.recStreet,
      recStreetnumber: this.state.recStreetnumber,
      recZipcode: this.state.recZipcode,
      recPhone: this.state.recPhone,
      name: this.state.name,
      city: this.state.city,
      street: this.state.street,
      streetnumber: this.state.streetnumber,
      zipcode: this.state.zipcode,
      phone: this.state.phone
    };

    this.props.addOrder(newOrder);
  }

  render() {
    const { profile } = this.props.profile;
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="post-form mb-6">
                <div className="card card-info">
                  <div className="card-header bg-warning text-white">
                    Create a new order
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <TextFieldGroup
                          placeholder="Enter recipient's full name"
                          name="recName"
                          value={this.state.recName}
                          onChange={this.onChange}
                          error={errors.recName}
                          info="Recipient's full name"
                        />
                        <TextFieldGroup
                          placeholder="Recipient's city"
                          name="recCity"
                          value={this.state.recCity}
                          onChange={this.onChange}
                          error={errors.recCity}
                          info="City to which you are sending"
                        />
                        <TextFieldGroup
                          placeholder="Recipient's street"
                          name="recStreet"
                          value={this.state.recStreet}
                          onChange={this.onChange}
                          error={errors.recStreet}
                          info="Street to which you are sending"
                        />
                        <TextFieldGroup
                          placeholder="Recipient's street number"
                          name="recStreetnumber"
                          value={this.state.recStreetnumber}
                          onChange={this.onChange}
                          error={errors.recStreetnumber}
                          info="House/building entrance number"
                        />
                        <TextFieldGroup
                          placeholder="Recipient's area code / zip code"
                          name="recZipcode"
                          value={this.state.recZipcode}
                          onChange={this.onChange}
                          error={errors.recZipcode}
                          info="Area code or zip code"
                        />
                        <TextFieldGroup
                          placeholder="Recipient's phone number"
                          name="recPhone"
                          value={this.state.recPhone}
                          onChange={this.onChange}
                          error={errors.recPhone}
                          info="Phone number of recipient"
                        />
                        <TextAreaFieldGroup
                          placeholder="Package descriptions"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChange}
                          error={errors.description}
                          info="Describe the content of your package."
                        />
                        <TextFieldGroup
                          placeholder="Sender's full name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          error={errors.name}
                          info="Your full name"
                        />
                        <TextFieldGroup
                          placeholder="Your city"
                          name="city"
                          value={this.state.city}
                          onChange={this.onChange}
                          error={errors.city}
                          info="The city you are sending from"
                        />
                        <TextFieldGroup
                          placeholder="Your street"
                          name="street"
                          value={this.state.street}
                          onChange={this.onChange}
                          error={errors.street}
                          info="Your street"
                        />
                        <TextFieldGroup
                          placeholder="Your street number"
                          name="streetnumber"
                          value={this.state.streetnumber}
                          onChange={this.onChange}
                          error={errors.streetnumber}
                          info="Your street entrance number"
                        />
                        <TextFieldGroup
                          placeholder="Your zipcode"
                          name="zipcode"
                          value={this.state.zipcode}
                          onChange={this.onChange}
                          error={errors.zipcode}
                          info="Your area code/zip code"
                        />
                        <TextFieldGroup
                          placeholder="Your phone number"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.onChange}
                          error={errors.phone}
                          info="Your phone number"
                        />
                      </div>
                      <div className="row d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary col-md-6"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderForm.propTypes = {
  addOrder: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addOrder }
)(OrderForm);
