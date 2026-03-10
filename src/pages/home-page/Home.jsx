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
import FaqHome from "./FaqHome";

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
      <FaqHome/>
      <RtrHome/>
    </>
  );
}

export default Home;
