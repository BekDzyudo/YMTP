import EduProfHome from "./EduProfHome";
import HomeHero from "./HomeHero";
import LidersExpert from "./lidersExpert";
import NewsHome from "./NewsHome";
import Partners from "./Partners";
import RtrHome from "./RtrHome";
import Statistics from "./Statistics";
import Teachers from "./Teachers";

function Home() {
  return (
    <>
      <HomeHero/>
      <NewsHome/>
      <EduProfHome/>
      {/* <Statistics/> */}
      {/* <LidersExpert/> */}
      {/* <Teachers/> */}
      <Partners/>
      <RtrHome/>
    </>
  );
}

export default Home;
