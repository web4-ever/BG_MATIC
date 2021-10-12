import * as Actions from "./actions";
import initialState from "../store/initialState";

export const ImagesReducer = (state = initialState.images, action) => {
  switch (action.type) {
    case Actions.FETCH_IMAGES:
      return {
        list: action.list,
        hasNext: action.hasNext,
      };
    case Actions.RESET_IMAGES:
      return {
        list: action.list,
        hasNext: action.hasNext,
      };
    default:
      return state;
  }
};
