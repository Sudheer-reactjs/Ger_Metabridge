import ChooseMetabridgeSection from "../Components/Home/ChooseMetabridgeSection";
import EveryStep from "../Components/Home/EveryStepSection";
import TabSection from "../Components/Home/TabSection";
import VideoSection from "../Components/Home/VideoSection";

const Home = () => {
  return (
    <>
      <VideoSection />
      <ChooseMetabridgeSection />
      <TabSection />
      <EveryStep />

       {/* Next Section */}
      <section className=" bg-white py-20 flex items-center justify-center">
        {/* Full Screen Content - Appears after box fills screen */}
          <div
            className=" bg-[#f1f5f8] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-14 overflow-y-auto rounded-[21.95px]"
            

            
          >
            <div className="w-full max-w-[968px]">
              {/* Info Bar */}
              <p className="text-center text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-9">Not everyone has the same goals. That's why we give you access to different account levels.</p>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr_0.95fr] gap-2 md:gap-6">
                {/* Standard Card */}
                <div className="bg-white rounded-[20px] p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Standard</h3>
                  <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Affordable Foundation For Individuals And Small Teams.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Ideal for testing and early campaigns</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Simple setup with essential features</p>
                    </div>
                  </div>
                </div>

                {/* Premium Card */}
                <div className="bg-white rounded-[20px] p-5 md:p-12">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Premium</h3>
                  <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Enhanced performance with advanced reliability and reach.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Higher limits for scaling operations</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Priority support for smoother workflows</p>
                    </div>
                  </div>
                </div>

                {/* Elite Card */}
                <div className="bg-white rounded-[20px] p-5 md:p-8">
                  <h3 className="text-xl md:text-2xl text-[#051420] leading-none mb-3">Elite</h3>
                  <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px] mb-2">
                    Exclusive access, unmatched trust, and priority service.
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]">Whitelisted for maximum deliverability</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#454b51] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-[#0B1013] text-sm md:text-lg satoshi-regular leading-[24px] md:leading-[30px]  ">Dedicated support and fast-track features</p>
                    </div> 
                  </div>
                </div>
              </div>
            </div> 
          </div>
      </section>
    </>
  );
}

export default Home;
