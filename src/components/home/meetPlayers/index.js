import React, { Component } from "react";
import Stripes from "../../../resources/images/stripes.png";
import { Tag } from "../../ui/misc";
import { Reveal } from "react-reveal";
import Cards from "./Cards";
class MeetPlayers extends Component {
  state = {
    show: false
  };
  render() {
    return (
      <Reveal fraction={0.7} onReveal={() => this.setState({ show: true })}>
        <div
          className="home_meetplayers"
          style={{ background: `#ffffff url(${Stripes})` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <>
                  <Tag
                    background="#0e1732"
                    fontSize="100px"
                    color="#ffffff"
                    add={{
                      marginBottom: "20px",
                      display: "inline-block"
                    }}
                  >
                    Meet
                  </Tag>
                </>
                <>
                  <Tag
                    background="#0e1732"
                    fontSize="100px"
                    color="#ffffff"
                    add={{
                      marginBottom: "20px",
                      display: "inline-block"
                    }}
                  >
                    The
                  </Tag>
                </>
                <>
                  <Tag
                    background="#0e1732"
                    fontSize="100px"
                    color="#ffffff"
                    add={{
                      marginBottom: "20px",
                      display: "inline-block"
                    }}
                  >
                    Players
                  </Tag>
                </>
                <>
                  <Tag
                    background="#ffffff"
                    fontSize="27px"
                    color="#0e1732"
                    linkTo="/the_team"
                    add={{
                      marginBottom: "27px",
                      display: "inline-block",
                      border: "1px solid #0e1732"
                    }}
                  >
                    Meet them here
                  </Tag>
                </>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
