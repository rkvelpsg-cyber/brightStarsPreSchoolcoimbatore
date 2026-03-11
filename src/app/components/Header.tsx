import { Star, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/78 backdrop-blur-xl shadow-lg py-3 border-b border-white/35"
          : "bg-white/64 backdrop-blur-xl py-4 border-b border-white/25"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <div className="relative">
              <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Bright Stars
              </h1>
              <p className="text-xs text-gray-600">Play School</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium text-sm"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Enroll Now Button */}
          <button
            onClick={() => scrollToSection("#admissions")}
            className="hidden lg:block px-6 py-2.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105 font-medium"
          >
            Enroll Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
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
                onClick={() => scrollToSection("#admissions")}
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
