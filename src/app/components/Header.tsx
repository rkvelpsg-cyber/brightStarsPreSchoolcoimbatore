import { Instagram, Menu, MessageCircle, X, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/bompsnimbekaipura/";
const YOUTUBE_URL = "https://www.youtube.com/@Birlaopenmindsdaycarepreschool";

export function Header() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector("#home");

    // On pages without a hero section (for example forms), keep the header visible.
    if (!heroSection) {
      setIsHeroVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Facilities", href: "#facilities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Admissions", href: "#admissions" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const openAdmissionsPage = () => {
    window.open("/apply-admission", "_blank", "noopener,noreferrer");
    setIsMobileMenuOpen(false);
  };

  const openLoginPage = () => {
    window.open("/login", "_blank", "noopener,noreferrer");
    setIsMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/917204039777?text=Hello%20Birla%20Open%20Minds%20Preschool%20And%20Day%20Care%2C%20I%20have%20a%20query.",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeroVisible
          ? "translate-y-0 opacity-100 pointer-events-auto bg-transparent py-4 border-b border-transparent"
          : "-translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex min-w-0 items-center gap-2 lg:gap-3 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <img
              src="/birla_logo_vector.svg"
              alt="Birla Open Minds Preschool And Day Care logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto flex-shrink-0 object-contain"
            />
            <div className="min-w-0">
              <h1 className="school-brand-title header-brand-fun max-w-[44vw] text-xs sm:text-sm md:text-base lg:max-w-[14rem] xl:max-w-none lg:text-lg xl:text-xl font-bold leading-tight break-words">
                Birla Open Minds Preschool And Day Care
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="header-menu-fun text-white/95 hover:text-yellow-200 transition-colors font-medium text-xs xl:text-sm whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Social Media Icons */}
            <div className="flex items-center gap-1 mr-1">
              <button
                className="p-1.5 rounded-full text-pink-500 hover:bg-pink-50 transition-colors"
                aria-label="Instagram"
                onClick={() =>
                  window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")
                }
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                className="p-1.5 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                aria-label="YouTube"
                onClick={() =>
                  window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer")
                }
              >
                <Youtube className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 p-2.5 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-600"
              aria-label="Contact on WhatsApp"
              title="Contact on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </button>

            <button
              onClick={openLoginPage}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:brightness-110 hover:shadow-lg xl:px-5 xl:text-sm"
            >
              Login
            </button>

            {/* Enroll Now Button */}
            <button
              onClick={openAdmissionsPage}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105 font-medium text-xs xl:px-6 xl:text-sm"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Social Icons + Menu Button */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              className="p-1.5 rounded-full text-pink-500 hover:bg-pink-50 transition-colors"
              aria-label="Instagram"
              onClick={() =>
                window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")
              }
            >
              <Instagram className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-full text-red-600 hover:bg-red-50 transition-colors"
              aria-label="YouTube"
              onClick={() =>
                window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer")
              }
            >
              <Youtube className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="shrink-0 p-2 text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 rounded-3xl bg-white/72 backdrop-blur-xl px-4 pb-4 pt-4 border border-white/40 shadow-lg">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-500 transition-colors font-medium text-left py-2"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={openWhatsApp}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-white shadow-lg transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </button>
              <button
                onClick={openLoginPage}
                className="mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-md transition hover:brightness-110"
              >
                Login
              </button>
              <button
                onClick={openAdmissionsPage}
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all font-medium text-center"
              >
                Enroll Now
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
