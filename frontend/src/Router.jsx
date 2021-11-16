import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Favorites from "./containers/Favorites";
import Search from "./containers/Search";
import Preview from "./components/Common/Preview";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/favorites"} component={Favorites} />
        <Route exact path={"/search"} component={Search} />
        <Route exact path={"/Preview"} component={Preview} />
      </Switch>
    </>
  );
};
export default Router;
