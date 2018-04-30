import React from "react";
import { connect } from "react-redux";
import { createList } from "../actions/lists";

class AddListForm_ extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    title: ""
  };
  onChange(e) {
    this.setState({ title: e.target.value });
  }
  handleSubmit() {
    this.props.createList({ title: this.state.title });
    this.setState({ title: "" });
  }
  render() {
    return (
      <div>
        <p> Create new list </p>
        <input onChange={this.onChange} value={this.state.title} />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

export const AddListForm = connect(null, { createList })(AddListForm_);
