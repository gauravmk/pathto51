import * as React from "react";
import * as ReactDOM from "react-dom";
import SquareMap from "SquareMap";
import SenateRaceDetails from "SenateRaceDetails";
import { store } from "store";
import { Provider } from "react-redux";
import { Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "index.css";

const Dashboard = () => {
  return (
    <Container>
      <Row className="mt-5">
        <h1>Path to 51</h1>
      </Row>
      <Row className="mt-5">
        <SquareMap />
      </Row>
      <SenateRaceDetails />
    </Container>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById("root")
);
