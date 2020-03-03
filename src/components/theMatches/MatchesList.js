import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import { NodeGroup } from "react-move";

class MatchesList extends Component {
  state = {
    matcheslist: []
  };

  static getDerivedStateFromProps(props, state) {
    return (state = { matcheslist: props.matches });
  }

  showMatchese = () => {
    if (!this.state.matcheslist) return null;
    return (
      <NodeGroup
        data={this.state.matcheslist}
        keyAccessor={d => d.id}
        start={() => ({
          opacity: 0,
          x: -200
        })}
        enter={(_, i) => ({
          opacity: [1], //array
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        update={(_, i) => ({
          opacity: [1],
          x: [0],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
        leave={(_, i) => ({
          opacity: [0],
          x: [-200],
          timing: { duration: 500, delay: i * 50, ease: easePolyOut }
        })}
      >
        {nodes => (
          <>
            {nodes.map(({ key, data, state: { x, opacity } }) => (
              <div
                className="match_box_big"
                key={key}
                style={{ opacity, transform: `translate(${x}px)` }}
              >
                <div className="block_wrapper">
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.localThmb}.png)`
                      }}
                    ></div>
                    <div className="team">{data.local}</div>
                    <div className="result">{data.resultLocal}</div>
                  </div>
                  <div className="block">
                    <div
                      className="icon"
                      style={{
                        background: `url(/images/team_icons/${data.awayThmb}.png)`
                      }}
                    ></div>
                    <div className="team">{data.away}</div>
                    <div className="result">{data.resultAway}</div>
                  </div>
                </div>
                <div className="block_wrapper nfo">
                  <div>
                    <strong>Date:</strong>
                    {data.date}
                  </div>
                  <div>
                    <strong>Stadium:</strong>
                    {data.stadium}
                  </div>
                  <div>
                    <strong>Referee:</strong>
                    {data.referee}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </NodeGroup>
    );
  };

  render() {
    return <>{this.showMatchese()}</>;
  }
}

export default MatchesList;
