import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth";

const Login_ = props => <button onClick={props.loginUser}>Login</button>;

export const Login = connect(null, { loginUser })(Login_);
