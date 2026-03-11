import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Palette, Home, Blocks, BookOpen, Music, Camera } from "lucide-react";

export function Facilities() {
  const facilities = [
    {
      title: "Colorful Classrooms",
      image:
        "https://images.unsplash.com/photo-1601339434203-130259102db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMxOTM5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Palette,
      color: "from-pink-400 to-rose-400",
    },
    {
      title: "Safe Play Area",
      image:
        "https://images.unsplash.com/photo-1633762348290-33a37f4d7fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY2hvb2wlMjBwbGF5Z3JvdW5kJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzMyMTMyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Home,
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Learning Toys and Activity Zone",
      image:
        "https://images.unsplash.com/photo-1509676942850-ca79d4741746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjB0b3lzfGVufDF8fHx8MTc3MzEzNjQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Blocks,
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Story and Reading Corner",
      image:
        "https://images.unsplash.com/photo-1549737221-bef65e2604a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcmVhZGluZyUyMGJvb2tzfGVufDF8fHx8MTc3MzIxMzI5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: BookOpen,
      color: "from-purple-400 to-indigo-400",
    },
    {
      title: "Music and Dance Room",
      image:
        "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGFydHMlMjBjcmFmdHN8ZW58MXx8fHwxNzczMjEzMjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Music,
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "CCTV Security",
      image:
        "https://images.unsplash.com/photo-1761208663763-c4d30657c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY2hvb2wlMjBjaGlsZHJlbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzMyMTMyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
