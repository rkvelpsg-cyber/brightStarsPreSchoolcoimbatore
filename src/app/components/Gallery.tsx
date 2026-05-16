import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Gallery() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1509676942850-ca79d4741746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjB0b3lzfGVufDF8fHx8MTc3MzEzNjQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Children playing",
    },
    {
      src: "https://images.unsplash.com/photo-1696527014256-4755b3ac0b4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwZHJhd2luZyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzExNDYyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Kids drawing",
    },
    {
      src: "https://images.unsplash.com/photo-1761208663763-c4d30657c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY2hvb2wlMjBjaGlsZHJlbiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NzMyMTMyODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Classroom activities",
    },
    {
      src: "https://images.unsplash.com/photo-1601339434203-130259102db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMxOTM5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Preschool games",
    },
    {
      src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2hpbGRyZW4lMjBsZWFybmluZ3xlbnwxfHx8fDE3NzMyMTMyODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Teachers interacting with kids",
    },
    {
      src: "https://images.unsplash.com/photo-1549737221-bef65e2604a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcmVhZGluZyUyMGJvb2tzfGVufDF8fHx8MTc3MzIxMzI5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Kids reading books",
    },
    {
      src: "https://images.unsplash.com/photo-1605627079912-97c3810a11a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGFydHMlMjBjcmFmdHN8ZW58MXx8fHwxNzczMjEzMjkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Arts and crafts",
    },
    {
      src: "https://images.unsplash.com/photo-1633762348290-33a37f4d7fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY2hvb2wlMjBwbGF5Z3JvdW5kJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzMyMTMyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Outdoor playground",
    },
  ];

  const borderColors = [
    "border-pink-300",
    "border-blue-300",
    "border-green-300",
    "border-purple-300",
    "border-yellow-300",
    "border-orange-300",
    "border-cyan-300",
    "border-rose-300",
  ];

  return (
    <section id="gallery" className="page-section page-section-rose py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="px-2 text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="px-2 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A glimpse into our vibrant learning environment
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl overflow-hidden border-4 ${borderColors[index]} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
