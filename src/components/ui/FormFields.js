import React from "react";

const FormFields = ({ id, formData, change }) => {
  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formData.validationMessage && !formData.valid
          ? formData.validationMessage
          : null}
      </div>
    );
    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case "input":
        formTemplate = (
          <>
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change(event, id)}
            />
            {showError()}
          </>
        );
        break;
      case "select":
        formTemplate = (
          <>
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <select
              value={formData.value}
              style={{ cursor: "pointer" }}
              onChange={event => change(event, id)}
            >
              <option value="">Select one</option>
              {formData.config.option.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
