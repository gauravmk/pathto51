import races_txt from "../data/races.csv";
import _ from "lodash";

export const allSenators = [];

let storeInited = false;

export const initStore = () => {
  if (storeInited) {
    return;
  }

  // Parse csv
  const lines = races_txt.split("\n");
  const keys = lines[0].split(",").map(s => s.trim());
  _.slice(lines, 1).forEach(row => {
    const vals = row.split(",").map(s => s.trim());
    allSenators.push(_.zipObject(keys, vals));
  });
  storeInited = true;
};
