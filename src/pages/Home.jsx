import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import HomeFeature from "../components/Home/HomeFeature";
import HomeContact from "../components/Home/HomeContact";
import HomePublisher from "../components/Home/HomePublisher";
import HomeStatistic from "../components/Home/HomeStatistic";

const Home = () => {
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomePublisher></HomePublisher>
      <HomeStatistic></HomeStatistic>
      <HomeFeature></HomeFeature>
      <HomeContact></HomeContact>
    </>
  );
};

export default Home;
