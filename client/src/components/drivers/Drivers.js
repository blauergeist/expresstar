import React from "react";
import Select from "react-select";
import { getDrivers, getSelectedDriver } from "../../actions/orderActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

class Drivers extends React.Component {
  componentDidMount() {
    this.props.getDrivers();
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      copySuccess: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.getSelectedDriver({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    console.log(this.props);
    console.log(this.props.deliverySelect);
  };

  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    this.setState({ copySuccess: "Copied!" });
  };

  render() {
    const { selectedOption } = this.state;
    // this.props.order.drivers.map(driver => {
    //   return (options = driver);
    // });

    this.props.order.drivers.map(driver => {
      driver.label = driver.name;
      return driver;
    });

    let selection;
    if (this.state.selectedOption) {
      selection = selectedOption._id;
    }
    return (
      <div>
        {" "}
        <Select
          className="text-dark"
          value={selectedOption}
          onChange={this.onChange}
          // onDriverSelect={this.props.deliverySelect.name}
          options={this.props.order.drivers}
        />
        <small className="form-text text-muted">Please select a driver</small>
        <br />
        <div>
          {/* Logical shortcut for only displaying the 
            button if the copy command exists */
          document.queryCommandSupported("copy") && (
            <div>
              <textarea
                className="col-md-12"
                ref={textarea => (this.textArea = textarea)}
                value={selection}
              />
              <button
                onClick={this.copyToClipboard}
                className="btn btn-warning text-white"
              >
                Copy Driver's ID
              </button>{" "}
              {"  "}
              <small className="form-text text-muted">
                Click above to copy selected driver's ID to clipboard
              </small>
            </div>
          )}
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  { getDrivers, getSelectedDriver }
)(Drivers);
