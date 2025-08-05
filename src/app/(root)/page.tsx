'use client'

import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import FeaturesDetailed from '@/components/landing/FeaturesDetailed';
import ProcessFlow from '@/components/landing/Features/ProcessFlow';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import Contact from '@/components/landing/Contact';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function HomePage() {
  useSmoothScroll();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <FeaturesDetailed />
      <ProcessFlow />
      <Testimonials />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}