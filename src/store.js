import races_txt from "../data/races.csv";
import Papa from "papaparse";
import { createStore } from "redux";

const initialState = {
  allSenators: Papa.parse(races_txt, { header: true }).data,
  selectedSenateRace: null
};

function reduce(state = {}, action) {
  switch (action.type) {
    case "PICK_SENATE_RACE":
      return { ...state, selectedSenateRace: action.race };
    default:
      return state;
  }
}

export let store = createStore(reduce, initialState);
