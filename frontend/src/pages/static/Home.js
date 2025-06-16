import React from "react";
import home from "../../assets/WelcomePage.png";
import campusImage from "../../assets/WelcomePage.png";

const Home = () => {
  return (
    <div>
      <div className="container-fluid p-0">
        <img src={home} class="img-fluid w-100" alt="Home Page"></img>
      </div>
    </div>
  );
};

export default Home;
