import React from "react";
import { connect } from "react-redux";
import { getListById } from "../lib/store-queries";
import { Place } from "./place";
import { deleteList } from "../actions/lists";
import { AddPlaceForm } from "./add-place-form";

const List_ = props => (
  <div className="List">
    <div style={{ display: "flex" }}>
      <h4>{props.list.title}</h4>
      <button onClick={() => props.deleteList(props.id)}>x</button>
    </div>
    <ul>{props.list.places.map(id => <Place id={id} key={id} />)}</ul>
    <AddPlaceForm listId={props.id} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  list: getListById(state, ownProps.id)
});

export const List = connect(mapStateToProps, { deleteList })(List_);
