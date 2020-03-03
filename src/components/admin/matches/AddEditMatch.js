import React, { Component } from "react";
import AdminLayout from "../../../hoc/AdminLayout";
import FormFields from "../../ui/FormFields";
import { validate } from "../../ui/misc";
import { firebaseDB, firebaseMatches, firebaseTeams } from "../../../firebase";
import { firebaseLooper } from "../../ui/misc";

class AddEditMatches extends Component {
  state = {
    matchId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    teams: [],
    formData: {
      date: {
        element: "input",
        value: "",
        config: {
          label: "Event date",
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      local: {
        element: "select",
        value: "",
        config: {
          label: "Select a local team",
          name: "select_local",
          type: "select",
          option: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultLocal: {
        element: "input",
        value: "",
        config: {
          label: "Result local",
          name: "result_local_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      away: {
        element: "select",
        value: "",
        config: {
          label: "Select a away team",
          name: "select_away",
          type: "select",
          option: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      resultAway: {
        element: "input",
        value: "",
        config: {
          label: "Result away",
          name: "result_away_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: false
      },
      referee: {
        element: "input",
        value: "",
        config: {
          label: "Referee",
          name: "referee_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      stadium: {
        element: "input",
        value: "",
        config: {
          label: "Stadium",
          name: "stadium_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      result: {
        element: "select",
        value: "",
        config: {
          label: "Team result",
          name: "select_result",
          type: "select",
          option: [
            { key: "W", value: "W" },
            { key: "L", value: "L" },
            { key: "D", value: "D" },
            { key: "N/A", value: "N/A" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      final: {
        element: "select",
        value: "",
        config: {
          label: "Game played",
          name: "select_played",
          type: "select",
          option: [
            { key: "Yes", value: "Yes" },
            { key: "No", value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  updateFields = (match, teamOptions, teams, formType, matchId) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === "local" || key === "away") {
        newFormData[key].config.option = teamOptions;
      }
    }
    this.setState({
      matchId,
      formType,
      formData: newFormData,
      teams
    });
  };

  componentDidMount = () => {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];

        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().shortName
          });
        });
        this.updateFields(match, teamOptions, teams, type, matchId);
      });
    };

    if (!matchId) {
      getTeams(false, "Add Match");
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, "Edit Match");
        });
    }
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

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (!formIsValid) return this.setState({ formError: true });

    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    if (this.state.formType === "Edit Match") {
      firebaseDB
        .ref(`matches/${this.state.matchId}`)
        .update(dataToSubmit)
        .then(_ => this.successMessage(true))
        .catch(e => this.setState({ formError: true }));
    } else {
      firebaseMatches
        .push(dataToSubmit)
        .then(_ => {
          this.props.history.push("/admin_matches");
        })
        .catch(e => this.setState({ formError: true }));
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <>
            <form onSubmit={event => this.submitForm(event)}>
              {/* Event date */}
              <FormFields
                id={"date"}
                formData={this.state.formData.date}
                change={this.updateForm}
              />
              {/* Local player */}
              <div className="select_team_layout">
                <div className="label_inputs">Local</div>
                <div className="wrapper">
                  <div className="left">
                    <FormFields
                      id={"local"}
                      formData={this.state.formData.local}
                      change={this.updateForm}
                    />
                  </div>
                  <div className="right">
                    <FormFields
                      id={"resultLocal"}
                      formData={this.state.formData.resultLocal}
                      change={this.updateForm}
                    />
                  </div>
                </div>
              </div>
              {/* Away player */}
              <div className="select_team_layout">
                <div className="label_inputs">Away</div>
                <div className="wrapper">
                  <div className="left">
                    <FormFields
                      id={"away"}
                      formData={this.state.formData.away}
                      change={this.updateForm}
                    />
                  </div>
                  <div className="right">
                    <FormFields
                      id={"resultAway"}
                      formData={this.state.formData.resultAway}
                      change={this.updateForm}
                    />
                  </div>
                </div>
              </div>
              <div className="split_fields">
                {/* Referee */}
                <FormFields
                  id={"referee"}
                  formData={this.state.formData.referee}
                  change={this.updateForm}
                />
                {/* Stadium */}
                <FormFields
                  id={"stadium"}
                  formData={this.state.formData.stadium}
                  change={this.updateForm}
                />
              </div>
              <div className="split_fields last">
                {/* Result */}
                <FormFields
                  id={"result"}
                  formData={this.state.formData.result}
                  change={this.updateForm}
                />
                {/* Final */}
                <FormFields
                  id={"final"}
                  formData={this.state.formData.final}
                  change={this.updateForm}
                />
              </div>
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

export default AddEditMatches;
