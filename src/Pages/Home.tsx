import ChooseMetabridgeSection from "../Components/Home/ChooseMetabridgeSection";
import EveryStep from "../Components/Home/EveryStepSection";
import ImagePinnedSection from "../Components/Home/ImagePinnedSection";
import MetaBridgeGridSection from "../Components/Home/MetaBridgeGridSection";
import TabSection from "../Components/Home/TabSection";
import VideoSection from "../Components/Home/VideoSection";


const Home = () => {
  return (
    <>
      <VideoSection />
      <ChooseMetabridgeSection />
      <TabSection />
      <EveryStep />
      <MetaBridgeGridSection /> 
      <ImagePinnedSection />
    </>
  );
}

export default Home;
