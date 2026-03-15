import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import ValueInfoSection from "./components/ValueInfoSection";
import LocationHoursSection from "./components/LocationHoursSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-wood-dark text-stone-100">
      <Navbar />
      <HeroSection />

      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-grain [background-size:8px_8px]"
      >
        <MenuSection />
        <ValueInfoSection />
        <LocationHoursSection />
      </motion.main>

      <Footer />
    </div>
  );
}
