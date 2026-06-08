import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Gallery() {
  const images = [
    {
      src: "/Child.jpg",
      alt: "Children at school activity",
    },
    {
      src: "/Image%202.jpeg",
      alt: "Classroom moments",
    },
    {
      src: "/Image%203.jpeg",
      alt: "Play-based learning session",
    },
    {
      src: "/Image%204.jpeg",
      alt: "Creative classroom fun",
    },
    {
      src: "/Image%205.jpeg",
      alt: "Teacher-guided activity",
    },
    {
      src: "/Photo_4.jpeg",
      alt: "Fun learning highlights",
    },
    {
      src: "/Photo_5.jpeg",
      alt: "Kids activity day",
    },
    {
      src: "/School_Promo_2.jpeg",
      alt: "School event snapshot",
    },
    {
      src: "/School_Promo_3.jpeg",
      alt: "Preschool celebration",
    },
    {
      src: "/Happy_Parents.jpeg",
      alt: "Happy parents and children",
    },
    {
      src: "/Lift_Facility.jpeg",
      alt: "Lift facility and campus access",
    },
    {
      src: "/CCTV.jpeg",
      alt: "CCTV enabled secure campus",
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
              className={`group relative rounded-3xl overflow-hidden border-4 ${borderColors[index % borderColors.length]} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}
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
