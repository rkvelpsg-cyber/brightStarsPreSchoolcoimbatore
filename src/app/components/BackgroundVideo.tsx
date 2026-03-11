export function BackgroundVideo() {
  return (
    <div className="app-video-backdrop" aria-hidden="true">
      <video autoPlay loop muted playsInline preload="auto">
        <source src="/videos/school-background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
