import React, { useState, useEffect } from "react";
import ImgIconCross from "../../assets/img/icon-cross.svg";
import ImgIconHeart from "../../assets/img/icon-heart.svg";
import ImgRightPreviewHuman from "../../assets/img/right-preview-human.svg";
import ImgRightPreviewBottom from "../../assets/img/right-preview-bottom.svg";
import { getFavourites } from "../../reducks/favourites/selectors";
import API from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite } from "../../reducks/favourites/operations";

const api = new API();

function Preview({ setShowPreview, selectedImageId }) {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [image, setImage] = useState(null);
  const [showFavourite, setShowFavourite] = useState(true);
  const favourites = getFavourites(selector);
  useEffect(() => {
    api
      .getImage(selectedImageId)
      .then((image) => {
        setImage(image);
      })
      .catch((error) => {
        alert("Failed to connect API: /images/:id/");
      });
  }, []);

  const clickFavourite = (image) => {
    setShowFavourite(false);
    dispatch(addFavourite(image));
  };
  return (
    <section class="preview">
      <div class="preview-black-cover">
        <img
          src={ImgIconCross}
          alt=""
          class="icon-cross"
          onClick={() => setShowPreview(false)}
        />
        <div class="preview-main">
          <div class="preview-main-inner">
            <div class="left-side">
              {image && (
                <img
                  src={
                    "https://res.cloudinary.com/www-techis-io/" + image.image
                  }
                  alt=""
                  class="left-image"
                />
              )}
              {image &&
                Object.values(favourites).filter(
                  (favoriteImage) => image.id == favoriteImage.id
                ).length === 0 && (
                  <img
                    class="heart"
                    src={ImgIconHeart}
                    onClick={() => clickFavourite(image)}
                  />
                )}
              {image && (
                <div class="black-box-bottom">
                  <p class="one">{image.name}</p>
                  <p class="two">{image.description}</p>
                </div>
              )}
            </div>

            <div class="right-side">
              {image && (
                <div class="right-inner">
                  <p>Preview</p>
                  <img
                    src={
                      "https://res.cloudinary.com/www-techis-io/" + image.image
                    }
                    alt=""
                    class="background"
                  />
                  <div class="inner">
                    <img src={ImgRightPreviewHuman} alt="" class="human" />
                    <img src={ImgRightPreviewBottom} alt="" class="bottom" />
                  </div>
                  <button class="download-button">Download</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Preview;
