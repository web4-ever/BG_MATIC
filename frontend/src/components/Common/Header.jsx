import React, { useEffect } from "react";
import ImgLogo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../reducks/tags/selectors";
import { fetchTags } from "../../reducks/tags/operations";
import { fetchImages, resetImages } from "../../reducks/images/operations";
import { useHistory } from "react-router";

function Header() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const tags = getTags(selector);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const pushToSearch = (tagId) => {
    dispatch(resetImages());
    dispatch(fetchImages(1,null,tagId));
    history.push("/search");
  };

  return (
    <header>
      <div class="logo">
        <a href="/">
          <img src={ImgLogo} alt="" />
        </a>
        <a href="/favorites">
          <input type="submit" value="Favourites" class="button" />
        </a>
      </div>
      <nav class="navbar">
        <ul>
          {tags &&
            tags.map((tag) => (
              <li onClick={() => pushToSearch(tag.id)} key={tag.id}>
                {tag.name}
              </li>
            ))}
        </ul>
        <div class="nav-empty"></div>
      </nav>
    </header>
  );
}

export default Header;
