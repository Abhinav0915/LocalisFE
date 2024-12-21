import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const servicesRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToTranslateJson = () => {
    navigate("/translate-json");
  };

  const navigateToTranslatePage = () => {
    navigate("/translate-document");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-teal-500 via-purple-600 to-blue-800 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-white">
          Discover <span className="text-yellow-400">Localis</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-xl">
          Seamless translation services tailored for your needs. Translate JSON files or documents quickly and efficiently.
        </p>
        <button
          onClick={scrollToServices}
          className="mt-10 bg-yellow-400 text-gray-900 py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
        >
          Learn More
        </button>
        <div className="absolute bottom-12 animate-pulse">
          <span className="text-white text-2xl">▼</span>
        </div>
      </header>

      {/* Services Section */}
      <main>
        <section
          ref={servicesRef}
          className="py-20 px-6 sm:px-12 lg:px-32 bg-gray-800 text-gray-100"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold">Our Services</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Empower your business with high-quality translations. Choose from our range of tailored services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1 */}
            <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">Translate JSON Files</h3>
                <p className="text-gray-300 mb-6">
                  Localize your web or mobile applications with ease. Ensure your JSON files are translated accurately.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Efficient and fast JSON localization</li>
                  <li>Supports multiple languages</li>
                  <li>Simple integration</li>
                </ul>
                <button
                  onClick={navigateToTranslateJson}
                  className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-all"
                >
                  Translate JSONs

                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4">Translate Documents</h3>
                <p className="text-gray-300 mb-6">
                  Professional translations for PDFs, Word documents, and more. High accuracy and fast delivery.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Supports multiple file formats</li>
                  <li>Professional-grade quality</li>
                  <li>Quick turnaround</li>
                </ul>
                <button
                  onClick={navigateToTranslatePage}
                  className="mt-6 bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-all"
                >
                  Translate Documents
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Localis. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
