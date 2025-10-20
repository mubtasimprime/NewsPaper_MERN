import HomeBanner from "../components/Home/HomeBanner";
import HomeFeature from "../components/Home/HomeFeature";
import HomeContact from "../components/Home/HomeContact";
import HomePublisher from "../components/Home/HomePublisher";
import HomeStatistic from "../components/Home/HomeStatistic";
import HomePlans from "../components/Home/HomePlans";
import FAQ from "../components/Home/FAQ";
import HomePageModal from "../components/HomePageModal";
import HomeTestimonial from "../components/Home/HomeTestimonial";

const Home = () => {
  return (
    <>
      <HomeBanner></HomeBanner>
      <HomePublisher></HomePublisher>
      <HomeFeature></HomeFeature>
      <HomeStatistic></HomeStatistic>
      <HomeTestimonial></HomeTestimonial>
      <HomePlans></HomePlans>
      <FAQ></FAQ>
      <HomeContact></HomeContact>
      <HomePageModal></HomePageModal>
    </>
  );
};

export default Home;
