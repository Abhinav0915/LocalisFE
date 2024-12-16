import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // Create a reference to the Services section
  const servicesRef = useRef<HTMLElement | null>(null);

  const navigate = useNavigate();

  // Function to scroll to the services section
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToTranslateJson = () => {
    navigate("/translate-json");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 text-white">
      {/* Header Section */}
      <header className="flex flex-col justify-center items-center min-h-screen text-center py-12">
        <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
          Welcome to <span className="text-teal-300">Localis</span>
        </h1>
        <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto">
          Localis is your trusted partner for quick and seamless translation
          services. Translate JSON files or documents in a matter of clicks.
        </p>
        <button
          onClick={scrollToServices}
          className="mt-8 bg-teal-600 text-white py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300"
        >
          Get Started
        </button>
      </header>

      {/* Main Content Section */}
      <main>
        {/* Services Grid Section */}
        <section ref={servicesRef} className="px-6 sm:px-12 lg:px-24 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-800">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Whether you're localizing JSON files for your website or
              translating documents and PDFs for a global audience, Localis
              provides a reliable and fast solution to meet your translation
              needs.
            </p>
          </div>

          {/* Services Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* Service 1: Translate JSON Files */}
            <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden p-8 transform transition duration-500 hover:scale-105">
              <h3 className="text-3xl font-semibold mb-4">
                Translate JSON Files
              </h3>
              <p className="text-gray-600 mb-6">
                Localize your JSON files seamlessly for web and mobile
                applications. Our tool ensures smooth translations that keep the
                integrity of your data intact.
              </p>
              <ul className="text-left text-gray-600 mb-6 space-y-2">
                <li>Effortless and fast JSON file conversion.</li>
                <li>Supports multiple languages.</li>
                <li>Easy integration with your projects.</li>
              </ul>
              <button
                className="bg-teal-600 text-white py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300"
                onClick={navigateToTranslateJson}
              >
                Translate JSON Now
              </button>
            </div>

            {/* Service 2: Translate Docs and PDFs */}
            <div className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden p-8 transform transition duration-500 hover:scale-105">
              <h3 className="text-3xl font-semibold mb-4">
                Translate Docs & PDFs
              </h3>
              <p className="text-gray-600 mb-6">
                Need to translate business documents or PDFs? With Localis, get
                your documents translated into multiple languages accurately and
                professionally.
              </p>
              <ul className="text-left text-gray-600 mb-6 space-y-2">
                <li>Supports PDF, DOCX, and other formats.</li>
                <li>Professional translation quality.</li>
                <li>Fast turnarounds for urgent needs.</li>
              </ul>
              <button className="bg-indigo-600 text-white py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300">
                Translate Documents Now
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-100 py-16">
          <h2 className="text-4xl text-center font-semibold text-gray-800 mb-8">
            What Our Users Say
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 px-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 italic">
                "Localis made our website's localization effortless. We were
                able to translate our JSON files quickly and without any
                hassle."
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">Alice Johnson</p>
                <p className="text-sm text-gray-500">Web Developer</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600 italic">
                "We used Localis to translate our marketing materials, and it
                worked seamlessly. Fast, reliable, and accurate translations!"
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">Marketing Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-teal-600 py-12 text-white text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Start using Localis today and experience hassle-free translation
            services for your files. Your global audience is just a click away.
          </p>
          <button className="bg-indigo-600 text-white py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300">
            Get Started Now
          </button>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="text-center">
            <p className="text-sm">© 2024 Localis. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
