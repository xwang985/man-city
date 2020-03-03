import React from "react";
import { Zoom } from "react-reveal";
import Jersey from "../../../resources/images/jersey.jpg";

const Animation = () => {
  return (
    <div className="promotion_animation">
      <div className="left">
        <Zoom>
          <span>Win a</span>
          <span>Jersey</span>
        </Zoom>
      </div>
      <div className="right">
        <Zoom>
          <div style={{ background: `url(${Jersey}) no-repeat` }}></div>
        </Zoom>
      </div>
    </div>
  );
};

export default Animation;
