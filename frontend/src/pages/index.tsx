
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
// import GiftCardCreator from '../components/GiftCardCreator';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Add scroll observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animate-reveal class
    document.querySelectorAll('.animate-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        {/* <GiftCardCreator /> */}
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
