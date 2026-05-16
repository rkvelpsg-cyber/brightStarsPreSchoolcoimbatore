import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 120);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-[130] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 text-white shadow-2xl ring-2 ring-white/70 transition-all duration-300 hover:scale-110 sm:p-4 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{
        right: "calc(1rem + env(safe-area-inset-right))",
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
    </button>
  );
}
