import axios from "axios";
require("dotenv").config();

const {
  REACT_APP_ENVIRONMENT,
  REACT_APP_API_BASE_URL_PROD,
  REACT_APP_API_BASE_URL_DEV,
} = process.env;
var baseURL;

if (REACT_APP_ENVIRONMENT === "PRODUCTION") {
  baseURL = REACT_APP_API_BASE_URL_PROD;
} else {
  baseURL = REACT_APP_API_BASE_URL_DEV;
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  IMAGES//////////////
export default class API {
  getImages = async (page, search, tagId) => {
    // let url = "/images/?page=" + page;
    // if (tagId) {
    //   url += "&tag=" + tagId;
    // }
    // if (search) {
    //   url += "&search=" + search;
    // }
    const images = await api
      .get("/images/", { params: { page, search, tag: tagId } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return images;
  };
  getImage = async (id) => {
    const images = await api
      .get("/images/" + id + "/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return images;
  };
  getTags = async () => {
    const tags = await api
      .get("/tags/")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return tags;
  };
}
