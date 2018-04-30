import React from "react";
import { connect } from "react-redux";
import { getPlaceById } from "../lib/store-queries";

const Place_ = props => (
  <div>
    <p>
      {props.place.name}: {props.place.rating}
    </p>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  place: getPlaceById(state, ownProps.id)
});

export const Place = connect(mapStateToProps)(Place_);
