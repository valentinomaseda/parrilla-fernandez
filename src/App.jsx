import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import ValueInfoSection from "./components/ValueInfoSection";
import LocationHoursSection from "./components/LocationHoursSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-wood-dark text-stone-100">
      <Navbar />
      <HeroSection />
      <AboutSection />

      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="noise-dark relative bg-grain [background-size:8px_8px]"
      >
        <MenuSection />
        <GallerySection />
        <ValueInfoSection />
        <LocationHoursSection />
      </motion.main>

      <Footer />
    </div>
  );
}
