export default function BackgroundEffects() {
  return (
    <>
      {/* Ambient glows */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2dd4bf 1px, transparent 1px), linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
    </>
  );
}
