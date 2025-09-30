import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import HomeFeature from "../components/Home/HomeFeature";
import HomeContact from "../components/Home/HomeContact";
import HomePublisher from "../components/Home/HomePublisher";
import HomeStatistic from "../components/Home/HomeStatistic";
import HomePlans from "../components/Home/HomePlans";

const Home = () => {
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomePublisher></HomePublisher>
      <HomeFeature></HomeFeature>
      <HomeStatistic></HomeStatistic>
      <HomePlans></HomePlans>
      <HomeContact></HomeContact>
    </>
  );
};

export default Home;
