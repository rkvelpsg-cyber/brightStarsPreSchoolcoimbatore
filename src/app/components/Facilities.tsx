import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Palette, Home, Blocks, BookOpen, Music, Camera } from "lucide-react";

export function Facilities() {
  const facilities = [
    {
      title: "Lift Facility",
      image: "/Lift_Facility.jpeg",
      icon: Palette,
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "Classroom Activity Zone",
      image: "/Image%203.jpeg",
      icon: Home,
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Play and Learning Space",
      image: "/Image%205.jpeg",
      icon: Blocks,
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Student Activity Moments",
      image: "/Photo_5.jpeg",
      icon: BookOpen,
      color: "from-purple-400 to-indigo-400",
    },
    {
      title: "CCTV Security Monitoring",
      image: "/CCTV.jpeg",
      icon: Music,
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "School Van Transport",
      image: "/Van.jpeg",
      icon: Camera,
      color: "from-red-400 to-pink-400",
    },
  ];

  return (
    <section id="facilities" className="page-section page-section-lilac py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            World-class facilities designed for your child's comfort and
            development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${facility.color} opacity-40 group-hover:opacity-60 transition-opacity`}
                  ></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3">
                    <div
                      className={`bg-white/20 backdrop-blur-sm rounded-xl p-3`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-lg">
                      {facility.title}
                    </h3>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${facility.color}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
