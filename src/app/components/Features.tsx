import {
  Shield,
  Users,
  Lightbulb,
  BookText,
  Home,
  BookMarked,
  Music,
  Sparkles,
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Safe and Secure Campus",
      icon: Shield,
      color: "from-blue-400 to-cyan-400",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Experienced and Caring Teachers",
      icon: Users,
      color: "from-purple-400 to-pink-400",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Smart Play-Based Learning",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-400",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Activity-Based Curriculum",
      icon: BookText,
      color: "from-green-400 to-emerald-400",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Indoor and Outdoor Play Area",
      icon: Home,
      color: "from-red-400 to-pink-400",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "Storytelling and Creative Arts",
      icon: BookMarked,
      color: "from-indigo-400 to-purple-400",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      title: "Music, Dance and Fun Activities",
      icon: Music,
      color: "from-pink-400 to-rose-400",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      title: "Clean and Child-Friendly Classrooms",
      icon: Sparkles,
      color: "from-cyan-400 to-blue-400",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-500",
    },
  ];

  return (
    <section className="page-section page-section-lilac py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Why Choose Birla Open Minds
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Features that make us the perfect choice for your child's early
            education
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 border border-white/50"
              >
                <div
                  className={`${feature.iconBg} rounded-xl p-4 inline-block mb-4`}
                >
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                <h3 className="font-semibold text-gray-900 text-lg leading-snug">
                  {feature.title}
                </h3>

                {/* Decorative bottom element */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div
                    className={`h-1 w-12 rounded-full bg-gradient-to-r ${feature.color}`}
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
