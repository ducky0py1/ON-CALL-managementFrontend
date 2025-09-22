// src/pages/HomePage.js - Updated with section IDs for navigation
import React from 'react';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import SolutionSection from '../components/SolutionSection';
import BenefitsSection from '../components/BenefitsSection';
import RoiSection from '../components/RoiSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="bg-white">
      {/* Header with Hero section - contains #hero anchor */}
      <Header />
      
      <main>
        {/* About section with anchor */}
        <div id="about">
          <AboutSection />
        </div>
        
        {/* Solution section with anchor */}
        <div id="solution">
          <SolutionSection />
        </div>
        
        {/* Uncomment when FeaturesSection is ready */}
        {/* <div id="features">
          <FeaturesSection />
        </div> */}
        
        {/* Benefits section with anchor */}
        <div id="benefits">
          <BenefitsSection />
        </div>
        
        {/* ROI section */}
        <RoiSection />
        
        {/* Testimonials section */}
        <TestimonialsSection />
      </main>
      
      {/* Footer with contact anchor */}
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;