import { motion } from "framer-motion";

import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroWorkflow from "./HeroWorkflow";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 lg:py-16"
    >
      <BackgroundEffects />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroContent />
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-md"
          >
            <HeroWorkflow />
          </motion.div>

        </div>

      </div>
    </section>
  );
}