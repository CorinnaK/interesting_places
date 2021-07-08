import { ADD_PLACE } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};
const rng = Math.random();

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        rng,
        action.placeData.title,
        action.placeData.image
      );
      return { places: state.places.concat(newPlace) };
    default:
      return state;
  }
};
