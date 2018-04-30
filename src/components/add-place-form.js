import React from "react";
import { connect } from "react-redux";
import { updateList } from "../actions/lists";

class AddPlaceForm_ extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: "",
    rating: ""
  };
  onNameChange(e) {
    this.setState({ name: e.target.value });
  }
  onRatingChange(e) {
    this.setState({ rating: e.target.value });
  }
  handleSubmit() {
    this.props.updateList({
      listId: this.props.listId,
      place: { name: this.state.name, rating: this.state.rating }
    });
    this.setState({ name: "", rating: "" });
  }
  render() {
    return (
      <div>
        <p> Add a place </p>
        <input
          label="Name"
          onChange={this.onNameChange}
          value={this.state.name}
        />
        <input
          label="Rating"
          onChange={this.onRatingChange}
          value={this.state.rating}
        />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

export const AddPlaceForm = connect(null, { updateList })(AddPlaceForm_);
