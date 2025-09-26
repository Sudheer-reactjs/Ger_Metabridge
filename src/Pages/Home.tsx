// import LenisVideoAnimation from "../Components/Home/LenisVideoAnimation";
import VideoSection from "../Components/Home/VideoSection";

const Home = () => {
    return (
        <>
        {/* <LenisVideoAnimation /> */}
          <VideoSection />
                {/* Additional Content */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">More Content Here</h2>
            <p className="text-gray-600 text-lg">
              Add your additional content sections here. The smooth transition from the video 
              section ensures a professional user experience without jarring jumps.
            </p>
          </div>
        </div>
      </section>
      {/* Next Section - Smooth Transition */}
      <section className="relative z-20 bg-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Next Section Content
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              This section appears smoothly after the video scrubbing is complete. 
              The transition from the video section to this section is now smooth and seamless.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Feature One</h3>
                <p className="text-gray-600">Description of your first feature or service.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
                <p className="text-gray-600">Description of your second feature or service.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
                <p className="text-gray-600">Description of your third feature or service.</p>
              </div>
            </div>
            
            <div className="pt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
        </>
    );
}

export default Home;
