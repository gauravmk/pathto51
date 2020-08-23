import * as React from "react";
import * as ReactDOM from "react-dom";

import SquareMap from "SquareMap";
import { initStore } from "store";

import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "index.css";

const Dashboard = () => {
  initStore();
  return (
    <Container>
      <Row className="mt-5">
        <h1>Path to 51</h1>
      </Row>
      <Row className="mt-5">
        <SquareMap />
      </Row>
    </Container>
  );
};

ReactDOM.render(<Dashboard />, document.getElementById("root"));
