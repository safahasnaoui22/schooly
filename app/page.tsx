"use client";

import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ClassesSection from "@/components/ClassesSection";
import MethodSection from "@/components/MethodSection";
import Particles from "@/components/Particles";

import dynamic from 'next/dynamic';
import Avis from "@/components/avis";
import Gallery from "@/components/gallery";
import AmadSchoolFooter from "@/components/AmadSchoolFooter";
import Timeline from "@/components/Timeline";
import Partenaire from "@/components/partenaire";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import Activities from "@/components/Activities";
import FAQ from "@/components/FAQ";
import Steps from "@/components/Steps";
import SchoolStats from "../components/SchoolStats";
import Footer from "@/components/Footer";
import Video from "@/components/Video";


const HistoryCarousel = dynamic(
  () => import('@/components/HistoryCarousel'),
  { 
    ssr: false, // Prevents SSR issues with browser-specific code
    loading: () => <div style={{ height: '100vh', opacity: 0 }} /> // Invisible placeholder
  }
);
export default function Home() {
  return (
       <main className="relative min-h-screen ">
      {/* Background decorative elements */}
      <div className="gradient-bg"></div>
      <div className="particles-container" id="particles"></div>
      
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
      </div>

      {/* Central Orb */}
      <div className="bg-orb" id="centralOrb">
        <div className="orb-core"></div>
        <div className="orb-ring ring-1"></div>
        <div className="orb-ring ring-2"></div>
        <div className="orb-ring ring-3"></div>
      </div>
    
      <HeroSection />
        <SchoolStats />

   <ClassesSection />
      
   <MethodSection />
   <Video/>
<Activities/>


  <Avis />

<Partenaire/>

  <Gallery />




<Footer/>

       <Particles/>
     
    </main>
  );
}