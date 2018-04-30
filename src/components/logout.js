import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

const Logout_ = props => <button onClick={props.logoutUser}>Logout</button>;

export const Logout = connect(null, { logoutUser })(Logout_);
