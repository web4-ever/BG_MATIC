import API from "../../API";
import { fetchImagesAction } from "./actions";

const api = new API();

export const fetchImages = (page) => {
  return async (dispatch, getState) => {
    return api
      .getImages(page)
      .then((images) => {
        const prevImages = getState().images.list;
        const nextImages = [...prevImages, ...images["results"]];
        let hasNext = false;
        if (images["next"]) {
          hasNext = true;
        }
        dispatch(fetchImagesAction(nextImages, hasNext));
      })
      .catch((error) => {
        alert("Failed to connect API: /posts/");
      });
  };
};
