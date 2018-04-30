import React from "react";
import { Login } from "./login";
import { Logout } from "./logout";
import { connect } from "react-redux";
import { isAuthenticated } from "../lib/store-queries";

const NavBar_ = props => (
  <div>
    {!props.isAuthenticated && <Login />}
    {props.isAuthenticated && <Logout />}
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state)
});

export const NavBar = connect(mapStateToProps)(NavBar_);
