import React, { Component } from "react";
import PlayerCard from "../ui/PlayerCard";
import { Fade } from "react-reveal";
import Stripes from "../../resources/images/stripes.png";
import { firebasePlayers, firebase, firebaseUrl } from "../../firebase";
import { firebaseLooper } from "../ui/misc";
import { Promise } from "core-js";

class TheTeam extends Component {
  state = {
    loading: true,
    players: []
  };

  componentDidMount = () => {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];

      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebaseUrl("players", players[key].image).then(url => {
              players[key].url = url;
              resolve();
            });
          })
        );
      }

      Promise.all(promises).then(() => {
        this.setState({ loadding: false, players });
      });
    });
  };

  showPlayersByCategory = category => {
    if (!this.state.players) return null;
    return this.state.players.map((player, i) => {
      if (player.position.toLowerCase() != category) return null;
      return (
        <Fade left delay={i * 20} key={i}>
          <div className="item">
            <PlayerCard
              number={player.number}
              name={player.name}
              lastname={player.lastname}
              background={player.url}
            />
          </div>
        </Fade>
      );
    });
  };

  render() {
    return (
      <div
        className="the_team_container"
        style={{
          background: `url(${Stripes}) repeat`
        }}
      >
        {!this.state.loadding ? (
          <>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("keeper")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showPlayersByCategory("defense")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showPlayersByCategory("midfield")}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("striker")}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default TheTeam;
