import React from "react";
import { Link } from "react-router-dom";

const Tag = props => {
  const { linkTo, background, fontSize, color, add } = props;
  const template = (
    <div
      style={{
        background,
        fontSize,
        color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...add //custom properties
      }}
    >
      {props.children}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{template}</Link>;
  }

  return template;
};

const firebaseLooper = snapshots => {
  let data = [];
  snapshots.forEach(snapshot => {
    data.push({ ...snapshot.val(), id: snapshot.key });
  });
  return data;
};

const reverseArray = array => {
  let reversedArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
};

const validate = element => {
  let error = [true, ""];
  if (!element.validation.required) return error;

  let valid = element.value.trim() != "";
  let message = `${!valid ? "This field is require" : ""}`;

  if (valid && element.validation.email) {
    valid = /\S+@\S+\.\S+/.test(element.value);
    message = `${!valid ? "Must be a valid email" : ""}`;
  }

  error = !valid ? [valid, message] : error;
  return error;
};

export { Tag, firebaseLooper, reverseArray, validate };
