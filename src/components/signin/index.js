import React, { Component } from "react";
import FormFields from "../ui/FormFields";
import { validate } from "../ui/misc";
import { firebaseSignIn } from "../../firebase";

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
    },
    password: {
      element: "input",
      value: "",
      config: {
        name: "password_input",
        type: "password",
        placeholder: "Enter your password"
      },
      validation: {
        required: true
      },
      valid: false,
      validationMessage: ""
    }
  }
};

class Signin extends Component {
  state = initialState;

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

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (!formIsValid) return this.setState({ formError: true });

    firebaseSignIn(dataToSubmit)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch(_ => {
        this.setState({ formError: true });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>
            <FormFields
              id={"email"}
              formData={this.state.formData.email}
              change={this.updateForm}
            />
            <FormFields
              id={"password"}
              formData={this.state.formData.password}
              change={this.updateForm}
            />
            {this.state.formError && (
              <div className="error_label">Something is wrong, try again</div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
