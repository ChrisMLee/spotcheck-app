import React from "react";
import { NavBar } from "./navbar";
import { Lists } from "./lists";
import { isAuthenticated } from "../lib/store-queries";
import { connect } from "react-redux";

export const Main_ = props => (
  <div>
    <NavBar />
    {props.isAuthenticated && <Lists />}
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
});

export const Main = connect(mapStateToProps)(Main_);
