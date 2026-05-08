import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Facilities", href: "#facilities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Admissions", href: "#admissions" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-glass text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/birla_logo_vector.svg"
                alt="Birla Open Minds Preschool And Day Care logo"
                className="h-16 w-auto object-contain rounded-md bg-white p-1 shadow-sm mb-3"
              />
              <h3 className="text-sm font-bold leading-snug">
                Birla Open Minds Preschool And Day Care
              </h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Nurturing young minds with love, care, and creativity in Bengaluru
              East, Karnataka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Programs</h3>
            <ul className="space-y-2 text-white/80">
              <li>Playgroup (1.5 - 2.5 years)</li>
              <li>Nursery (2.5 - 3.5 years)</li>
              <li>Junior KG (3.5 - 4.5 years)</li>
              <li>Senior KG (4.5 - 5.5 years)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-white/80">
              <li>
                No6, Annapurneshwari layout Beside 7 Hills PG for gents,
                Nimbekaipura, Bengaluru East, Nimbekayipura, Karnataka 560049
              </li>
              <li>Phone: +91-7204039777</li>
              <li>Email: info@birlaopenmindspreschool.com</li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
            <p>
              © 2026 Birla Open Minds Preschool And Day Care. All Rights
              Reserved.
            </p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-white transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
