import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import ValueInfoSection from "./components/ValueInfoSection";
import RacingLegacy from "./components/RacingLegacy";
import LocationHoursSection from "./components/LocationHoursSection";
import Footer from "./components/Footer";
import StatsSection from "./components/StatsSection";
import TourismSection from "./components/TourismSection";
import ReviewsSection from "./components/ReviewsSection";
import MobileScrollIndicator from "./components/MobileScrollIndicator";

export default function App() {
  return (
    <div className="min-h-screen bg-wood-dark text-stone-100">
      <Navbar />
      <MobileScrollIndicator />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <div className="noise-dark relative bg-grain [background-size:8px_8px]">
        <MenuSection />
        <GallerySection />
        <ValueInfoSection />
        <RacingLegacy />
        <LocationHoursSection />
        <TourismSection />
        <div className="max-w-7xl mx-auto">
          <div aria-hidden="true" className="h-0.5 bg-gradient-to-r from-transparent via-brand-cream/60 to-transparent rounded-full" />
        </div>
        <ReviewsSection />
      </div>

      <Footer />
    </div>
  );
}
