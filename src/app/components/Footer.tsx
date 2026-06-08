import { Facebook, Instagram, Youtube } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/bompsnimbekaipura/";
const YOUTUBE_URL = "https://www.youtube.com/@Birlaopenmindsdaycarepreschool";
const FACEBOOK_URL = "https://www.facebook.com/";
const PHONE_NUMBER = "+91-7204039777";
const EMAIL_ID = "info@birlaopenmindspreschool.com";
const ADDRESS =
  "No6, Annapurneshwari layout Beside 7 Hills PG for gents, Nimbekaipura, Bengaluru East, Nimbekayipura, Karnataka 560049";

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
    <>
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
                Nurturing young minds with love, care, and creativity in
                Bengaluru East, Karnataka.
              </p>
              <div className="mt-3 text-sm text-white/75">
                <p className="font-semibold text-white/90">School Timings</p>
                <ul className="mt-2 space-y-1">
                  <li>LY-1: 9:30 AM to 12:30 PM</li>
                  <li>LY-2: 9:00 AM to 12:30 PM</li>
                  <li>K-1: 9:00 AM to 12:30 PM</li>
                  <li>K-2: 9:00 AM to 12:30 PM</li>
                </ul>
              </div>
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

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-white/80">
                <li>{ADDRESS}</li>
                <li>
                  Phone:{" "}
                  <a
                    className="hover:text-white transition-colors"
                    href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`}
                  >
                    {PHONE_NUMBER}
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a
                    className="hover:text-white transition-colors"
                    href={`mailto:${EMAIL_ID}`}
                  >
                    {EMAIL_ID}
                  </a>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      window.open(FACEBOOK_URL, "_blank", "noopener,noreferrer")
                    }
                    aria-label="Facebook"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        INSTAGRAM_URL,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                    aria-label="Instagram"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer")
                    }
                    aria-label="YouTube"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all transform hover:scale-110"
                  >
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
    </>
  );
}
