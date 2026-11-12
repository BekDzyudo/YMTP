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
import { useTranslation } from "../../i18n/LanguageContext";

function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO 
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        keywords="kasb-hunar, kasbiy ta'lim, o'qitish, treninglar, sertifikat, pedagoglar, malaka oshirish, o'zbekiston, ta'lim markazi"
        type="website"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      
      <HomeHero/>
      <NewsHome/>
      <PrezidentialSpeech/>
      <EduProfHome/>
      {/* <Statistics/> */}
      {/* <LidersExpert/> */}
      {/* <Teachers/> */}
      <Partners/>
      <FaqHome/>
      <InteractiveServices/>
      <RtrHome/>
    </>
  );
}

export default Home;
