import React, { Component } from "react";
import Featured from "./featured";
import MatcheseHome from "./matches";
import MeetPlayers from "./meetPlayers";
import Promotion from "./promotion";
const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatcheseHome />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
