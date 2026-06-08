import { PlayCircle } from "lucide-react";

export function Testimonials() {
  const videoTestimonials = [
    {
      src: "/Parent_Birla_1.mp4",
      title: "Parent Testimonial 1",
      subtitle: "Real feedback from our school community",
      color: "from-pink-400 to-rose-400",
    },
    {
      src: "/Parent_2_Birla.mp4",
      title: "Parent Testimonial 2",
      subtitle: "Parents sharing their experience",
      color: "from-purple-400 to-indigo-400",
    },
  ];

  return (
    <section className="page-section page-section-rose py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="px-2 text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="px-2 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from parents who trust us with their children
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {videoTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/55 relative"
            >
              <div
                className={`absolute -top-4 left-8 bg-gradient-to-r ${testimonial.color} rounded-full p-3 shadow-lg`}
              >
                <PlayCircle className="w-6 h-6 text-white" />
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/60 bg-black/90">
                <video
                  src={testimonial.src}
                  controls
                  preload="metadata"
                  className="h-[320px] w-full object-contain md:h-[360px]"
                />
              </div>

              <div className="pt-4 px-1">
                <p className="font-semibold text-gray-900 text-lg">
                  {testimonial.title}
                </p>
                <p className="text-gray-600 mt-1">{testimonial.subtitle}</p>
              </div>

              <div
                className={`absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-r ${testimonial.color} opacity-10 rounded-full`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
