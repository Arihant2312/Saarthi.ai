import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AiTools from '../components/AiTools';
import Testimonial from '../components/Testimonial';
import Plan from '../components/Plan';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Full-page dark radial gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at top, #1c1c1c, #000000)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* AI Tools Section */}
        <AiTools />

        {/* Testimonial Title */}
        <div className="text-center text-white font-semibold text-3xl p-4 ">
          Loved by <span className="text-4xl text-pink-400 font-extrabold">Creators</span>
        </div>

        {/* Testimonial Section */}
        <Testimonial />

        {/* Plan Section */}
        <Plan className="" />

        {/* FAQ Section */}
        <Faq />

        {/* Footer */}
        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
