import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-blue-950/55 to-fuchsia-950/60"></div>
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl"></div>
        <div className="absolute bottom-16 right-[10%] h-56 w-56 rounded-full bg-pink-300/15 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Nurturing Young Minds with Love and Care
          </h1>
          <p className="text-lg md:text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
            Birla Open Minds Preschool And Day Care provides a joyful, safe, and
            creative environment where children learn through play, discovery,
            and imagination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("#programs")}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-medium text-lg flex items-center gap-2 group"
            >
              Explore Programs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-8 py-4 bg-white text-purple-600 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-medium text-lg border-2 border-white"
            >
              Book a Visit
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/45 to-transparent"></div>
    </section>
  );
}
