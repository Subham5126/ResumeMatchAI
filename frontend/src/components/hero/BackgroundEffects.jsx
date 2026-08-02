export default function BackgroundEffects() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.2),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
    </>
  );
}