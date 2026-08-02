import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import HeroWorkflow from "./HeroWorkflow";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white py-6 lg:py-10 border-b border-slate-800/80 bg-grid-mesh"
    >
      <BackgroundEffects />

      <div className="relative mx-auto max-w-[1650px] px-4 sm:px-8 lg:px-12">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7">
            <HeroContent />
          </div>

          {/* Right Interactive Visual Card (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <HeroWorkflow />
          </div>
        </div>
      </div>
    </section>
  );
}