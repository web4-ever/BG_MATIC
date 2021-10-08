import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { PostsReducer } from "../posts/reducers";
import { ImagesReducer } from "../images/reducers";
import { FavouritesReducer } from "../favourites/reducers";
import { TagsReducer } from "../tags/reducers";

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      posts: PostsReducer,
      images: ImagesReducer,
      favourites: FavouritesReducer,
      tags: TagsReducer,
    }),
    compose(
      applyMiddleware(routerMiddleware(history), thunk),
      // DEBUG MODE
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
