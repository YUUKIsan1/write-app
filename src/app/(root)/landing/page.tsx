'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

// コンポーネントを動的にインポート（SSR無効）
const Header = dynamic(() => import('@/components/landing/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/landing/Hero'), { ssr: false });
const Features = dynamic(() => import('@/components/landing/Features'), { ssr: false });
const FeaturesDetailed = dynamic(() => import('@/components/landing/FeaturesDetailed'), { ssr: false });
const ProcessFlow = dynamic(() => import('@/components/landing/Features/ProcessFlow'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), { ssr: false });
const Pricing = dynamic(() => import('@/components/landing/Pricing'), { ssr: false });
const Contact = dynamic(() => import('@/components/landing/Contact'), { ssr: false });
const CTA = dynamic(() => import('@/components/landing/CTA'), { ssr: false });
const Footer = dynamic(() => import('@/components/landing/Footer'), { ssr: false });

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useSmoothScroll();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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