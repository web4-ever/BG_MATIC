export const FETCH_IMAGES = "FETCH_IMAGES";
export const fetchImagesAction = (images, hasNext) => {
  return {
    type: "FETCH_IMAGES",
    list: images,
    hasNext: hasNext,
  };
};
export const RESET_IMAGES = "RESET_IMAGES";
export const resetImagesAction = () => {
  return {
    type: "RESET_IMAGES",
    list: [],
    hasNext: true,
  };
};
