import React, { useState } from "react";
import { allSenators } from "store";

import { Dropdown } from "react-bootstrap";

import _ from "lodash";

const KEY_ORDER = [
  "no_election_d",
  "independent",
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

const senatorConfig = {
  no_election_d: {
    color: "#0055FF",
    label: "Democrats not up for election"
  },
  safe_d: {
    color: "#3779FF",
    label: "Safe Democrat"
  },
  likely_d: {
    color: "#6D9EFF",
    label: "Likely Democrat"
  },
  leans_d: {
    color: "#A4C2FF",
    label: "Leans Democrat"
  },
  tossup: {
    color: "#B3B3B3",
    label: "Tossup"
  },
  leans_r: {
    color: "#FDAEBB",
    label: "Leans Republican"
  },
  likely_r: {
    color: "#FC7188",
    label: "Likely Republican"
  },
  safe_r: {
    color: "#FB4866",
    label: "Safe Republican"
  },
  no_election_r: {
    color: "#d90429",
    label: "Republicans not up for election"
  },
  independent: {
    color: "#048966",
    label: "Independents"
  }
};

const SQ_WIDTH = 44;

const Square = ({ stateCode, color, faded }) => {
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
    <div className="Square" style={style}>
      {stateCode}
    </div>
  );
};

const SquareMap = () => {
  const [rater, setRater] = useState("Combined");

  let squares = [];
  KEY_ORDER.forEach(k => {
    const { color } = senatorConfig[k];
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
            color={color}
            stateCode={v["State Code"]}
            faded={k.startsWith("no_election") || k == "independent"}
          />
        );
      });
  });

  return (
    <div className="SquareMapContainer" style={{ width: 22 * SQ_WIDTH }}>
      <div className="float-right">
        <h5 className="d-inline-block mr-3">Rater:</h5>
        <Dropdown className="d-inline-block">
          <Dropdown.Toggle variant="info">{rater}</Dropdown.Toggle>
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

export default SquareMap;
