import { Header } from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import { About } from "../components/About";
import { Programs } from "../components/Programs";
import { Features } from "../components/Features";
import { Facilities } from "../components/Facilities";
import { Gallery } from "../components/Gallery";
import { VideoTestimonials } from "../components/VideoTestimonials";
import { Testimonials } from "../components/Testimonials";
import { Admissions } from "../components/Admissions";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { FloatingElements } from "../components/FloatingElements";
import { ScrollToTop } from "../components/ScrollToTop";
import { AdmissionFlyerPopup } from "../components/AdmissionFlyerPopup";

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingElements />
      <Header />
      <HeroCarousel />
      <About />
      <Programs />
      <Features />
      <Facilities />
      <Gallery />
      <VideoTestimonials />
      <Testimonials />
      <Admissions />
      <Contact />
      <Footer />
      <ScrollToTop />
      <AdmissionFlyerPopup />
    </div>
  );
}
