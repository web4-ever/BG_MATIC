import React, { useEffect } from "react";
import {
  deleteFavourite,
  fetchFromLocalStorage,
} from "../reducks/favourites/operations";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../reducks/favourites/selectors";
import ImgIconsearch from "../assets/img/icon-search.svg";

export default function Favorites() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const favourites = getFavourites(selector);

  useEffect(() => {
    dispatch(fetchFromLocalStorage());
  }, []);
  return (
    <div class="favorite">
      <section class="search-main">
        <div class="searchbox2">
          <form action="/search" method="get">
            <input placeholder="School" type="text" name="search" />
            <img src={ImgIconsearch} class="searchimg" />
          </form>
        </div>
        <p class="title">
          <span>Favourites</span>
        </p>
      </section>

      <section class="favourite-images">
        {favourites &&
          favourites.map((favourite) => (
            <div>
              <div class="favourite-image" key={favourite.id}>
                <img
                  src={
                    "https://res.cloudinary.com/www-techis-io/" +
                    favourite.image
                  }
                  alt=""
                />
              </div>
              <div class="favourite-buttons">
                <a href={favourite.image} target="_blank">
                  <input type="submit" value="Download" class="btn" />
                </a>
                <input
                  type="submit"
                  value="Remove"
                  class="btn-2"
                  onClick={() => dispatch(deleteFavourite(favourite.id))}
                />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
