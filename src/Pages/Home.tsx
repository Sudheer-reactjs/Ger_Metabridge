import VideoSection from "../Components/Home/VideoSection";

const Home = () => {
    return (
        <>
          <VideoSection />

      {/* Next Section - Smooth Transition */}
              {/* Optional: Scroll indicator */}
        
      <section className="relative z-20 bg-[#0b1016]   min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold  leading-tight">
              Next Section Content
            </h2>
            <p className="text-xl  leading-relaxed">
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
