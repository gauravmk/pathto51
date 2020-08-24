import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";

const NoElectionSenator = ({ senator }) => {
  const stateParty = senator["Combined"].replace("no_election_", "").toUpperCase();
  return (
    <Row className="mt-5">
      <Col xs={2}>
        <img className="PersonPhoto" src={senator["Incumbent Photo"]} />
      </Col>
      <Col>
        <h2>
          {senator["Incumbent"]} ({stateParty})
        </h2>
        <p>The senator from {senator["State Name"]} is not up for election in 2020</p>
        {stateParty == "I" && (
          <small>
            *The two independent senators caucus with the Democratic Party which is why they are
            included on the left
          </small>
        )}
      </Col>
    </Row>
  );
};

const ProspectLabels = {
  tossup: "is a tossup",
  leans_d: "leans democrat",
  likely_d: "is likely a democratic win",
  safe_d: "is safe for democrats",
  leans_r: "leans republican",
  likely_r: "is likely a republican win",
  safe_r: "is safe for republicans"
};

const SenateRaceDetails = ({ senateRace }) => {
  if (!senateRace) {
    return <></>;
  }
  if (senateRace["Combined"].startsWith("no_election")) {
    return <NoElectionSenator senator={senateRace} />;
  }
  if (senateRace["Election Note"]) {
    return (
      <Row className="mt-5">
        <p>{senateRace["Election Note"]}</p>
      </Row>
    );
  }

  const hasIndependentCandidate = senateRace["Dem Candidate"].endsWith("*");

  return (
    <>
      <Row className="mt-5">
        <h2>
          {senateRace["State Name"]} {ProspectLabels[senateRace["Combined"]]}
        </h2>
      </Row>
      <Row className="mt-3">
        <Col xs={2}>
          <img className="PersonPhoto" src={senateRace["Dem Photo"]} />
        </Col>
        <Col xs={4}>
          <h4>
            {senateRace["Dem Candidate"]} ({hasIndependentCandidate ? "I" : "D"})
          </h4>
          {hasIndependentCandidate && (
            <small>*The candidate is endorsed by the state democratic party</small>
          )}
        </Col>
        <Col xs={2}>
          <img className="PersonPhoto" src={senateRace["Rep Photo"]} />
        </Col>
        <Col xs={4}>
          <h4>{senateRace["Rep Candidate"]} (R)</h4>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => ({
  senateRace: state.selectedSenateRace
});

export default connect(mapStateToProps)(SenateRaceDetails);
