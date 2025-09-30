import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import HomeFeature from "../components/Home/HomeFeature";
import HomeContact from "../components/Home/HomeContact";
import HomePublisher from "../components/Home/HomePublisher";

const Home = () => {
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomePublisher></HomePublisher>
      <HomeFeature></HomeFeature>
      <HomeContact></HomeContact>
    </>
  );
};

export default Home;
