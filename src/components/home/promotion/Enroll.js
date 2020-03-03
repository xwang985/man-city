import React, { Component } from "react";
import { Fade } from "react-reveal";
import FormFields from "../../ui/FormFields";
import { validate } from "../../ui/misc";
import { firebasePromotions } from "../../../firebase";

const initialState = {
  formError: false,
  formSuccess: "",
  formData: {
    email: {
      element: "input",
      value: "",
      config: {
        name: "email_input",
        type: "email",
        placeholder: "Enter your email"
      },
      validation: {
        required: true,
        email: true
      },
      valid: false,
      validationMessage: ""
    }
  }
};

class Enroll extends Component {
  state = initialState;

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (!formIsValid) return this.setState({ formError: true });

    //check the data or register in the server
    this.setState(initialState);
    firebasePromotions
      .orderByChild("email")
      .equalTo(dataToSubmit.email)
      .once("value")
      .then(snapshot => {
        if (!snapshot.val()) {
          firebasePromotions.push(dataToSubmit);
          this.successMessage(true);
        } else {
          this.successMessage(false);
        }
      });
  };

  successMessage = bool => {
    this.setState({
      formSuccess: bool
        ? "Registerd successfully"
        : "Registerd failed. Already in the database"
    });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  updateForm = (event, id) => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[id] };
    newElement.value = event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormFields
                id={"email"}
                formData={this.state.formData.email}
                change={this.updateForm}
              />
              {this.state.formError && (
                <div className="error_label">Something is wrong, try again</div>
              )}
              <div className="success_label">{this.state.formSuccess}</div>
              <button type="submit">Enroll</button>
              <div className="enroll_discl">
                Aliquip exercitation esse amet excepteur laboris nostrud
                exercitation laboris.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
