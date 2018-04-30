import React from "react";
import { fetchLists } from "../actions/lists";
import { connect } from "react-redux";

const Lists_ = props => (
  <div>
    Lists component<button onClick={props.fetchLists}>Fetch Lists</button>
  </div>
);

export const Lists = connect(null, { fetchLists })(Lists_);
