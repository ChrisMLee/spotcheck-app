import React from "react";
import { fetchLists } from "../actions/lists";
import { connect } from "react-redux";
import { List } from "./list";
import { getListsIsFetching } from "../lib/store-queries";
import { AddListForm } from "./add-list-form";

class Lists_ extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLists();
  }
  render() {
    if (this.props.listsIsFetching) {
      return <h3>Loading</h3>;
    }
    return (
      <div>
        <button onClick={this.props.fetchLists}>Fetch Lists</button>
        <h3>Lists</h3>
        {this.props.lists &&
          this.props.lists.map(id => <List id={id} key={id} />)}
        <AddListForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.listsIds,
  listsIsFetching: getListsIsFetching(state)
});

export const Lists = connect(mapStateToProps, { fetchLists })(Lists_);
