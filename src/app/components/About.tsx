import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Sparkles, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="page-section page-section-blue py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="mx-auto w-full px-2 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:whitespace-nowrap mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Birla Open Minds Preschool And Day Care
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <ImageWithFallback
                src="/VG6_1806.JPG"
                alt="Teacher with children"
                className="w-full h-auto object-cover"
              />
              {/* Decorative corners */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-400 rounded-tr-3xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-pink-400 rounded-bl-3xl"></div>
            </div>

            {/* Floating icon */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full p-6 shadow-xl">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Birla Open Minds Preschool And Day Care is a warm and nurturing
              preschool in Bengaluru East dedicated to providing a strong
              foundation for early childhood development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our goal is to create a joyful learning environment where children
              explore, imagine, and grow with confidence. Through play-based
              learning, creative activities, and caring teachers, we help
              children develop essential skills that prepare them for school and
              life.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Play-Based Learning
                  </h3>
                  <p className="text-gray-600">
                    Children learn best through exploration and play
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Caring Teachers
                  </h3>
                  <p className="text-gray-600">
                    Experienced educators who love working with children
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Safe Environment
                  </h3>
                  <p className="text-gray-600">
                    A secure and nurturing space for every child
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
