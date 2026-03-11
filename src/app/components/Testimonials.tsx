import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      text: "Bright Stars Play School has been wonderful for our child. The teachers are caring and the learning environment is joyful.",
      author: "Parent, Coimbatore",
      rating: 5,
      color: "from-pink-400 to-rose-400",
    },
    {
      text: "My daughter loves going to school every day. The activities are fun and educational.",
      author: "Parent",
      rating: 5,
      color: "from-blue-400 to-cyan-400",
    },
    {
      text: "The best preschool in Coimbatore! Our son has grown so much in confidence and creativity. Highly recommend!",
      author: "Parent, Coimbatore",
      rating: 5,
      color: "from-purple-400 to-indigo-400",
    },
  ];

  return (
    <section className="page-section page-section-rose py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from parents who trust us with their children
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/55 relative"
            >
              {/* Quote Icon */}
              <div
                className={`absolute -top-4 left-8 bg-gradient-to-r ${testimonial.color} rounded-full p-3 shadow-lg`}
              >
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div
                className={`pt-4 border-t-2 border-gradient-to-r ${testimonial.color}`}
              >
                <p className="font-semibold text-gray-900">
                  — {testimonial.author}
                </p>
              </div>

              {/* Decorative element */}
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
