import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderNav = lazy(() => import("./components/nav/Header"));
const Hotels = lazy(() => import("./pages/Hotels"));
const Rooms = lazy(() => import("./pages/Rooms"));
const Update = lazy(() => import("./pages/Update"));
const Hotel = lazy(() => import("./pages/Hotel"));
const Home = lazy(() => import("./pages/Home"));
const Page404 = lazy(() => import("./pages/Page404"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5 text-primary">
          __HOTELIER <LoadingOutlined className="h4 p-3 text-danger" /> ___BY
          SHIVANSH MEHTA
        </div>
      }
    >
      props
      <HeaderNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hotels" component={Hotels} />
        <Route exact path="/hotel/:slug" component={Hotel} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/rooms/:slug" component={Update} />
        <Route exact path="*" component={Page404} />
      </Switch>
    </Suspense>
  );
};

export default App;
