import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../reducks/images/operations";
import { getImages, getHasNext } from "../reducks/images/selectors";
import { getFavourites } from "../reducks/favourites/selectors";
import {
  addFavourite,
  fetchFromLocalStorage,
} from "../reducks/favourites/operations";
import ImgIconsearch from "../assets/img/icon-search.svg";
import ImgIconHeart from "../assets/img/icon-heart.svg";
import Preview from "../components/Common/Preview";

export default function Search() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const images = getImages(selector);
  const hasNext = getHasNext(selector);
  const [page, setPage] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const favourites = getFavourites(selector);

  useEffect(() => {
    dispatch(fetchFromLocalStorage());
    dispatch(fetchImages(page));
    setPage(page + 1);
  }, []);

  const clickImage = (imageId) => {
    setSelectedImageId(imageId);
    setShowPreview(true);
  };

  const clickShowMore = () => {
    dispatch(fetchImages(page));
    setPage(page + 1);
  };

  const clickFavourite = (image) => {
    dispatch(addFavourite(image));
  };
  return (
    <>
      {showPreview && (
        <Preview
          setShowPreview={setShowPreview}
          selectedImageId={selectedImageId}
        />
      )}
      <div class="search-page">
        <section class="search-main">
          <div class="searchbox2">
            <form>
              <input placeholder="Search" type="text" />
              <img src={ImgIconsearch} class="searchimg" />
            </form>
          </div>
          <p class="title">
            <span class="thin">Search</span>"School"
          </p>
        </section>

        <section class="image-list">
          <ul class="grid">
            {images &&
              images.map((image) => (
                <li key={image.id}>
                  <img
                    src={
                      "https://res.cloudinary.com/www-techis-io/" + image.image
                    }
                    class="image"
                    alt=""
                    onClick={() => clickImage(image.id)}
                  />
                  {image &&
                    Object.values(favourites).filter(
                      (favoriteImage) => image.id == favoriteImage.id
                    ).length === 0 && (
                      <img
                        class="icon-heart"
                        src={ImgIconHeart}
                        onClick={() => clickFavourite(image)}
                      />
                    )}
                </li>
              ))}
          </ul>
          {hasNext && (
            <div class="button">
              <input type="submit" value="Show more" onClick={clickShowMore} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
