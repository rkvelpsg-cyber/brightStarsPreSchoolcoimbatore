import { ArrowRight, Calendar, CheckCircle } from "lucide-react";

export function Admissions() {
  const benefits = [
    "Safe and nurturing environment",
    "Experienced teachers",
    "Play-based learning approach",
    "Age-appropriate curriculum",
  ];

  return (
    <section
      id="admissions"
      className="page-section page-section-vivid py-20 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Now Open for 2026</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Admissions Open for 2026
          </h2>

          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Give your child the best start in life at Bright Stars Play School.
            Admissions are now open for Playgroup, Nursery, Junior KG and Senior
            KG.
          </p>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-4"
              >
                <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                <span className="text-white font-medium text-left">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-bold text-lg flex items-center gap-2 group">
              Apply for Admission
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all transform hover:scale-105 font-medium text-lg">
              Download Brochure
            </button>
          </div>

          {/* Additional Info */}
          <p className="mt-8 text-white/90 text-lg">
            Limited seats available. Enroll today to secure your child's spot!
          </p>
        </div>
      </div>
    </section>
  );
}
