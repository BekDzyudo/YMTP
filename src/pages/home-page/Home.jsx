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
import SEO from "../../components/SEO";
import { OrganizationSchema, WebSiteSchema } from "../../components/StructuredData";

function Home() {
  return (
    <>
      <SEO 
        title="Bosh sahifa"
        description="O'zbekiston Respublikasi Kasbiy ta'limni rivojlantirish instituti - kasbiy ta'lim, treninglar, sertifikatlashtirish, pedagoglar malakasini oshirish va zamonaviy o'quv dasturlari"
        keywords="kasb-hunar, kasbiy ta'lim, o'qitish, treninglar, sertifikat, pedagoglar, malaka oshirish, o'zbekiston, ta'lim markazi"
        type="website"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      
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
