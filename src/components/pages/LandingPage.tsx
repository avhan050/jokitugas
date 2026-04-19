'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <div id="fitur">
          <FeaturesSection />
        </div>
        <div id="cara-kerja">
          <HowItWorksSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
