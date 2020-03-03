import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormFields from "../../ui/FormFields";
import { validate } from "../../ui/misc";
import { firebaseDB, firebasePlayers, firebaseUrl } from "../../../firebase";
import Fileuploader from "../../ui/FileUploader";

const initialstate = {
  playerId: "",
  formType: "",
  formError: false,
  formSuccess: "",
  defaultImg: "",
  formData: {
    name: {
      element: "input",
      value: "",
      config: {
        label: "Player name",
        name: "name_input",
        type: "text"
      },
      validation: {
        required: true
      },
      valid: false,
      validationMessage: "",
      showLabel: true
    },
    lastname: {
      element: "input",
      value: "",
      config: {
        label: "Player lastname",
        name: "lastname_input",
        type: "text"
      },
      validation: {
        required: true
      },
      valid: false,
      validationMessage: "",
      showLabel: true
    },
    number: {
      element: "input",
      value: "",
      config: {
        label: "Player number",
        name: "number_input",
        type: "text"
      },
      validation: {
        required: true
      },
      valid: false,
      validationMessage: "",
      showLabel: true
    },
    position: {
      element: "select",
      value: "",
      config: {
        label: "Select a position",
        name: "select_position",
        type: "select",
        option: [
          { key: "Keeper", value: "Keeper" },
          { key: "Defense", value: "Defense" },
          { key: "Midfield", value: "Midfield" },
          { key: "Striker", value: "Striker" }
        ]
      },
      validation: {
        required: true
      },
      valid: false,
      validationMessage: "",
      showLabel: true
    },
    image: {
      element: "image",
      value: "",
      validation: {
        required: true
      },
      valid: true
    }
  }
};

class AddEditPlayers extends Component {
  state = initialstate;

  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({ formType: "Add Player" });
    } else {
      this.setState({ formType: "Edit Player" });
      firebaseDB
        .ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();
          firebaseUrl("players", playerData.image)
            .then(url =>
              this.updateFields(playerData, playerId, "Edit Player", url)
            )
            .catch(_ => {
              this.updateFields(
                { ...playerData, image: "" },
                playerId,
                "Edit Player",
                ""
              );
            });
        });
    }
  }

  updateForm = (event, id, content = "") => {
    const newFormData = { ...this.state.formData };
    const newElement = newFormData[id];

    content === ""
      ? (newElement.value = event.target.value)
      : (newElement.value = content);

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormData[id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  storeFilename = filename => {
    this.updateForm(null, "image", filename);
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

    if (this.state.formType === "Edit Player") {
      firebaseDB
        .ref(`players/${this.state.playerId}`)
        .update(dataToSubmit)
        .then(_ => this.successMessage(true))
        .catch(_ => this.setState({ formError: true }));
    } else {
      firebasePlayers
        .push(dataToSubmit)
        .then(_ => this.props.history.push("/admin_players"))
        .catch(_ => this.setState({ formError: true }));
    }
  };

  successMessage = bool => {
    this.setState({
      formSuccess: bool ? "Updated successfully" : "Updated failed"
    });
    setTimeout(() => {
      this.setState({ formSuccess: "" });
    }, 2000);
  };

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"] = initialstate.formData["image"];
    this.setState({
      defaultImg: "",
      formData: newFormData
    });
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <>
            <form onSubmit={event => this.submitForm(event)}>
              <Fileuploader
                dir="players"
                tag={"Player image"}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />
              <FormFields
                id={"name"}
                formData={this.state.formData.name}
                change={this.updateForm}
              />
              <FormFields
                id={"lastname"}
                formData={this.state.formData.lastname}
                change={this.updateForm}
              />
              <FormFields
                id={"number"}
                formData={this.state.formData.number}
                change={this.updateForm}
              />
              <FormFields
                id={"position"}
                formData={this.state.formData.position}
                change={this.updateForm}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError && (
                <div className="error_label">Something is wrong</div>
              )}
              <div className="admin_submit">
                <button type="submit">{this.state.formType}</button>
              </div>
            </form>
          </>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayers;
