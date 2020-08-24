import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";

import _ from "lodash";

const KEY_ORDER = [
  "no_election_d",
  "no_election_i",
  "safe_d",
  "likely_d",
  "leans_d",
  "tossup",
  "leans_r",
  "likely_r",
  "safe_r",
  "no_election_r"
];

const RATERS = [
  "Combined",
  "Cook",
  "Inside Elections",
  "Sabato",
  "Daily Kos",
  "Politico",
  "RCP",
  "Niskanen",
  "270towin"
];

const ColorConfig = {
  no_election_d: "#0055FF",
  safe_d: "#3779FF",
  likely_d: "#6D9EFF",
  leans_d: "#A4C2FF",
  tossup: "#B3B3B3",
  leans_r: "#FDAEBB",
  likely_r: "#FC7188",
  safe_r: "#FB4866",
  no_election_r: "#d90429",
  no_election_i: "#048966"
};

const SQ_WIDTH = 50;

const Square = ({ stateCode, color, faded, onClick }) => {
  const style = {
    width: SQ_WIDTH,
    height: SQ_WIDTH,
    lineHeight: `${SQ_WIDTH}px`,
    backgroundColor: color
  };
  if (faded) {
    style.color = "#ffffff80";
  }
  return (
    <div onClick={onClick} className="Square" style={style}>
      {stateCode}
    </div>
  );
};

const SquareMap = ({ allSenators, pickSenateRace }) => {
  const [rater, setRater] = useState("Combined");

  let squares = [];
  KEY_ORDER.forEach(k => {
    allSenators
      .filter(v => v[rater] == k)
      .forEach(v => {
        if (squares.length == 51) {
          // Put a gap column after 51 senators
          _.range(10).forEach(() => {
            squares.push(<Square color="white" />);
          });
        }

        squares.push(
          <Square
            color={ColorConfig[k]}
            stateCode={v["State Code"]}
            faded={k.startsWith("no_election")}
            onClick={() => pickSenateRace(v)}
          />
        );
      });
  });

  return (
    <div className="SquareMapContainer" style={{ width: 22 * SQ_WIDTH }}>
      <div className="float-left">Click on a state to learn more about the race</div>
      <div className="float-right" style={{ display: "none" }}>
        <h5 className="d-inline-block mr-3">Rater:</h5>
        <Dropdown className="d-inline-block">
          <Dropdown.Toggle variant="secondary">{rater}</Dropdown.Toggle>
          <Dropdown.Menu>
            {RATERS.map(r => (
              <Dropdown.Item onClick={() => setRater(r)}>{r}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="SquareMapCanvas" style={{ height: 5 * SQ_WIDTH }}>
        {squares}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  allSenators: state.allSenators
});

const mapDispatchToProps = dispatch => ({
  pickSenateRace: race => dispatch({ type: "PICK_SENATE_RACE", race })
});

export default connect(mapStateToProps, mapDispatchToProps)(SquareMap);
