import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Star,
  Sparkles,
  ChevronRight as SwipeIcon,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import admissionImage from "../../imports/Poster6.jpeg";
const smartClassroom = "/VG6_1769.JPG";
const indoorPlay = "/VG6_1737.JPG";
import ballPool from "../../imports/Image_3.jpeg";
const toddlerActivity = "/VG6_1694.JPG";

interface SlideData {
  id: number;
  image: string;
  headline: string;
  subheading: string;
  buttons?: { text: string; variant: "primary" | "secondary" }[];
  contact?: { address?: string; phone?: string };
  features?: string[];
  discount?: string;
}

// Premium Button Component
const PremiumButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}) => {
  const baseClasses = `
    relative overflow-hidden
    px-8 py-4 md:px-10 md:py-5
    rounded-full text-base md:text-lg font-bold
    transition-all duration-300
    transform hover:scale-105 hover:shadow-2xl
    ${className}
  `;

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-[#F47C20] to-[#A32035] text-white hover:from-[#A32035] hover:to-[#F47C20]"
      : "bg-white/20 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white hover:text-[#F47C20]";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

const slides: SlideData[] = [
  {
    id: 1,
    image: admissionImage,
    headline: "Your Child's Journey to Excellence Begins Here",
    subheading: "Admissions Open for Academic Year 2026–2027",
    buttons: [
      { text: "Book a School Tour", variant: "primary" },
      { text: "Call Now", variant: "secondary" },
    ],
    contact: {
      address: "Budigere Cross, Nimbekaipura, Bengaluru",
      phone: "+91 72040 39777",
    },
  },
  {
    id: 2,
    image: smartClassroom,
    headline: "Interactive Smart Learning Environment",
    subheading: "Technology-enabled classrooms for modern early education.",
    buttons: [{ text: "Explore Facilities", variant: "primary" }],
  },
  {
    id: 3,
    image: indoorPlay,
    headline: "Safe & Fun Indoor Play Zone",
    subheading:
      "Encouraging physical activity, creativity, and joyful learning.",
    buttons: [{ text: "Visit Campus", variant: "primary" }],
  },
  {
    id: 4,
    image: ballPool,
    headline: "Learning Through Fun Activities",
    subheading:
      "Hands-on play experiences that improve social and motor skills.",
    buttons: [{ text: "Visit Campus", variant: "primary" }],
  },
  {
    id: 5,
    image: toddlerActivity,
    headline: "Designed Especially for Early Childhood Development",
    subheading: "A safe, colorful, and engaging environment for every child.",
    buttons: [{ text: "Admissions Open", variant: "primary" }],
  },
  {
    id: 6,
    image: "/VG6_1610.JPG",
    headline: "A Bright and Caring Preschool Campus",
    subheading:
      "Discover a safe, joyful environment where children learn, explore, and grow every day.",
    buttons: [
      { text: "Explore Facilities", variant: "primary" },
      { text: "Book a School Tour", variant: "secondary" },
    ],
  },
  {
    id: 7,
    image: "/School_Promo_3.jpeg",
    headline: "Where Learning Feels Like Home",
    subheading:
      "Thoughtfully designed spaces, loving educators, and engaging activities for early childhood development.",
    buttons: [
      { text: "Visit Campus", variant: "primary" },
      { text: "Apply Now", variant: "secondary" },
    ],
  },
];

const FloatingParticle = ({
  delay,
  duration,
  x,
  y,
}: {
  delay: number;
  duration: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-[#F47C20]/30"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [y, `-${parseInt(y) + 100}px`],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    style={{ left: x, top: y }}
  />
);

const FloatingStar = ({ delay, index }: { delay: number; index: number }) => {
  const positions = ["10%", "25%", "40%", "60%", "75%", "90%"];
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: [0, 1, 0.5, 1, 0],
        y: [-20, 0, -10, 0, -20],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ left: positions[index % positions.length], top: "20%" }}
    >
      <Star className="w-4 h-4 text-[#F47C20] fill-[#F47C20]" />
    </motion.div>
  );
};

const FloatingSparkle = ({
  delay,
  index,
}: {
  delay: number;
  index: number;
}) => {
  const positions = ["15%", "35%", "55%", "70%", "85%"];
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ left: positions[index % positions.length], top: "30%" }}
    >
      <Sparkles className="w-3 h-3 text-white" />
    </motion.div>
  );
};

const FloatingConfetti = ({
  delay,
  index,
}: {
  delay: number;
  index: number;
}) => {
  const colors = ["#F47C20", "#A32035", "#FFFFFF", "#FFF7F0"];
  const positions = [
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
  ];
  return (
    <motion.div
      className="absolute w-2 h-3 rounded-sm"
      style={{
        backgroundColor: colors[index % colors.length],
        left: positions[index % positions.length],
        top: "10%",
      }}
      initial={{ opacity: 0, y: -50, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["0vh", "100vh"],
        rotate: [0, 360, 720],
        x: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const sliderRef = useRef<Slider>(null);

  const openRoleLogin = (role: "admin" | "parent") => {
    window.open(`/login/${role}`, "_blank", "noopener,noreferrer");
  };

  const handleCarouselCta = (buttonText: string) => {
    const lowerText = buttonText.toLowerCase();
    const WHATSAPP_NUMBER = "917204039777";

    if (
      lowerText.includes("admission") ||
      lowerText.includes("book") ||
      lowerText.includes("apply")
    ) {
      const admissionsSection = document.querySelector("#admissions");
      if (admissionsSection) {
        admissionsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (lowerText.includes("counselor") || lowerText.includes("call")) {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Birla%20Open%20Minds%20Preschool%20And%20Day%20Care%2C%20I%20would%20like%20to%20inquire%20about%20admissions.`,
        "_blank",
        "noopener,noreferrer",
      );
    } else if (
      lowerText.includes("explore") ||
      lowerText.includes("facilities") ||
      lowerText.includes("visit") ||
      lowerText.includes("campus")
    ) {
      const facilitiesSection = document.querySelector("#facilities");
      if (facilitiesSection) {
        facilitiesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  // Hide swipe hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    accessibility: true,
    adaptiveHeight: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    arrows: false,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide
            ? "bg-[#F47C20] w-8"
            : "bg-white/50 hover:bg-white/80"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <div
      id="home"
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen min-h-[72vh] h-[86vh] md:h-[94vh] lg:h-[100vh] overflow-hidden"
    >
      {/* Mobile Swipe Hint */}
      {showSwipeHint && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden absolute bottom-24 right-6 z-30 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Swipe to explore
          </span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <SwipeIcon className="w-4 h-4" />
          </motion.div>
        </motion.div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
      </button>

      <Slider ref={sliderRef} {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-screen min-h-[72vh] h-[86vh] md:h-[94vh] lg:h-[100vh]"
          >
            {/* Background Image with Zoom Animation */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: currentSlide === index ? 1.05 : 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            </motion.div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Cinematic Vignette */}
            <div className="carousel-vignette" />

            {/* Floating Particles */}
            {currentSlide === index && (
              <>
                {[...Array(8)].map((_, i) => (
                  <FloatingParticle
                    key={`particle-${i}`}
                    delay={i * 0.5}
                    duration={3 + i * 0.3}
                    x={`${10 + i * 12}%`}
                    y="80%"
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <FloatingStar key={`star-${i}`} delay={i * 0.6} index={i} />
                ))}
                {[...Array(4)].map((_, i) => (
                  <FloatingSparkle
                    key={`sparkle-${i}`}
                    delay={i * 0.8}
                    index={i}
                  />
                ))}
                {/* Special confetti for discount slide */}
                {slide.discount &&
                  [...Array(12)].map((_, i) => (
                    <FloatingConfetti
                      key={`confetti-${i}`}
                      delay={i * 0.2}
                      index={i}
                    />
                  ))}
              </>
            )}

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    currentSlide === index
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-3xl"
                >
                  {/* Special Discount Badge for Slide 6 */}
                  {slide.discount && currentSlide === index && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                      className="inline-block mb-6"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F47C20] to-[#A32035] rounded-full blur-xl opacity-60 animate-pulse" />
                        <div className="relative bg-gradient-to-r from-[#F47C20] to-[#A32035] text-white px-8 py-4 rounded-full font-black text-2xl md:text-3xl shadow-2xl">
                          Save {slide.discount}!
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      currentSlide === index
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="hero-headline text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight text-with-shadow"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {slide.headline}
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      currentSlide === index
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hero-subheading text-lg md:text-xl lg:text-2xl text-white/95 mb-6 md:mb-8 leading-relaxed text-with-shadow"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {slide.subheading}
                  </motion.p>

                  {/* Features List for Special Slides */}
                  {slide.features && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        currentSlide === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-3 mb-6"
                    >
                      {slide.features.map((feature, i) => (
                        <div
                          key={i}
                          className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          ✨ {feature}
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Contact Information */}
                  {slide.contact && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        currentSlide === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-white/20"
                    >
                      <div className="flex flex-col gap-3">
                        {slide.contact.address && (
                          <div className="flex items-start gap-3 text-white">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#F47C20] flex-shrink-0 mt-1" />
                            <span
                              className="text-base md:text-lg font-medium"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {slide.contact.address}
                            </span>
                          </div>
                        )}
                        {slide.contact.phone && (
                          <div className="flex items-center gap-3 text-white">
                            <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#F47C20] flex-shrink-0" />
                            <a
                              href={`tel:${slide.contact.phone.replace(/\s/g, "")}`}
                              className="text-base md:text-lg font-bold hover:text-[#F47C20] transition-colors"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {slide.contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* CTA Buttons */}
                  {slide.buttons && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        currentSlide === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {slide.buttons.map((button, i) => (
                          <PremiumButton
                            key={i}
                            variant={button.variant}
                            onClick={() => handleCarouselCta(button.text)}
                          >
                            {button.text}
                          </PremiumButton>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <PremiumButton
                          variant="secondary"
                          onClick={() => openRoleLogin("admin")}
                          className="border-blue-200/70 bg-blue-600/35 hover:bg-blue-600"
                        >
                          Admin Login
                        </PremiumButton>
                        <PremiumButton
                          variant="secondary"
                          onClick={() => openRoleLogin("parent")}
                          className="border-cyan-200/70 bg-cyan-600/35 hover:bg-cyan-600"
                        >
                          Parent Login
                        </PremiumButton>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom CSS for Slick Dots */}
      <style>{`
        .slick-dots li button:before {
          display: none;
        }
      `}</style>
    </div>
  );
}
