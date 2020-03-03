import React from "react";
import { Tag } from "../../ui/misc";
import Blocks from "./Blocks";
const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag
          background="#0e1731"
          fontSize="50px"
          color="#ffffff"
          //   add={{ color: "red" }} add custom properties
        >
          Matches
        </Tag>
        <Blocks />
        <Tag
          background="#ffffff"
          fontSize="22px"
          color="#0e1731"
          linkTo="/the_team"
        >
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;
