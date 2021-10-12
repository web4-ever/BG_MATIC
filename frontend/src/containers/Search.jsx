import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../reducks/images/operations";
import { getImages, getHasNext } from "../reducks/images/selectors";
import { getFavourites } from "../reducks/favourites/selectors";
import { addFavourite } from "../reducks/favourites/operations";
import ImgIconsearch from "../assets/img/icon-search.svg";
import ImgIconHeart from "../assets/img/icon-heart.svg";
import Preview from "../components/Common/Preview";
import queryString from "query-string";

export default function Search() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const parsed = queryString.parse(window.location.search);
  const images = getImages(selector);
  const hasNext = getHasNext(selector);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const favourites = getFavourites(selector);

  useEffect(() => {
    if (parsed.page != undefined) {
      setPage(parsed.page);
    }
    if (parsed.search != undefined) {
      setSearch(parsed.search);
    }
    if (parsed.tag_id != undefined) {
      setTagId(parsed.tag_id);
    }
  }, [parsed]);

  const clickImage = (imageId) => {
    setSelectedImageId(imageId);
    setShowPreview(true);
  };

  useEffect(() => {
    if (search) {
      dispatch(fetchImages(page, search, null));
    }
    if (tagId) {
      dispatch(fetchImages(page, null, tagId));
    }
  }, [page, search, tagId]);

  const clickShowMore = () => {
    if (page) {
      setPage(page + 1);
    }
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
            <form action="/search" method="get">
              <input placeholder="Search" type="text" name="search" />
              <img src={ImgIconsearch} class="searchimg" />
            </form>
          </div>
          <p class="title">
            {search && <span class="thin">Search "{search}"</span>}
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
