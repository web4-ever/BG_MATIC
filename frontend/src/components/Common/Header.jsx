import React, { useEffect, useState } from "react";
import ImgLogo from "../../assets/images/BGmatic-logo-header.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../reducks/tags/selectors";
import { fetchTags } from "../../reducks/tags/operations";
import { fetchImages, resetImages } from "../../reducks/images/operations";
import { Link, useHistory } from "react-router-dom";

function Header(props) {
  const { setSearch } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const tags = getTags(selector);
  const history = useHistory();
  let [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const pushToSearch = (tagId, tagName) => {
    dispatch(resetImages());
    dispatch(fetchImages(1, null, tagId));
    history.push("/search", { tagName });
    setSearch && setSearch(null);
    setSelectedTag(tagId);
  };

  return (
    <header>
      <div class="logo">
        <Link to={"/"}>
          <img src={ImgLogo} alt="" />
        </Link>
        <Link to={"/favorites"}>
          <input type="submit" value="Favourites" class="button" />
        </Link>
      </div>
      <nav class="navbar">
        <ul>
          {tags &&
            tags.map((tag) => (
              <li
                className={selectedTag === tag.id ? "active" : ""}
                onClick={() => pushToSearch(tag.id, tag.name)}
                key={tag.id}
              >
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
