import EduProfHome from "./EduProfHome";
import HomeHero from "./HomeHero";
import InteractiveServices from "./InteractiveServices";
import LidersExpert from "./lidersExpert";
import NewsHome from "./NewsHome";
import Partners from "./Partners";
import PrezidentialSpeech from "./PrezidentialSpeech";
import RtrHome from "./RtrHome";
import Statistics from "./Statistics";
import Teachers from "./Teachers";

function Home() {
  return (
    <>
      <HomeHero/>
      <NewsHome/>
      {/* <InteractiveServices/> */}
      <PrezidentialSpeech/>
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
