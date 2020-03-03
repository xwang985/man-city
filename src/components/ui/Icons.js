import React from "react";
import { Link } from "react-router-dom";
import mcitylogo from "../../resources/images/logos/manchester_city_logo.png";

const CityLogo = ({ linkTo = false, width, height }) => {
  const template = (
    <div
      className="img_cover"
      style={{ width, height, background: `url(${mcitylogo}) no-repeat` }}
    ></div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="link_logo">
        {template}
      </Link>
    );
  }
  return template;
};

export { CityLogo };
