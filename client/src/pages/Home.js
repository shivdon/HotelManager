import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg">
      <div className="intro-card">
        <h1 style={{ color: "#FFFFFF" }}>
          Do you want to have a Stay at lowest cost in your dream hotel?
        </h1>
        <div className="d-grid gap-2 col-8 mx-auto">
          <Link to="/hotels">
            <button className="mt-3 btn btn-primary btn-block btn-lg">
              Click To Explore your Dream!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
