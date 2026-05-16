import { Baby, Smile, BookOpen, GraduationCap } from "lucide-react";

export function Programs() {
  const programs = [
    {
      title: "Playgroup (LY-1)",
      age: "Age 2 - 3 years",
      description:
        "A fun introduction to learning through play, music, stories, and social interaction.",
      icon: Baby,
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
    {
      title: "Nursery (LY-2)",
      age: "Age 3 - 4 years",
      description:
        "Children begin learning basic concepts, colors, shapes, and communication skills.",
      icon: Smile,
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Junior KG (K-1)",
      age: "Age 4 - 5 years",
      description:
        "Focus on creativity, storytelling, early writing, and problem solving.",
      icon: BookOpen,
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Senior KG (K-2)",
      age: "Age 5 - 6 years",
      description:
        "Preparation for primary school with language, numbers, and confidence building activities.",
      icon: GraduationCap,
      color: "from-purple-400 to-indigo-400",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <section id="programs" className="page-section page-section-neutral py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="px-2 text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Programs
          </h2>
          <p className="px-2 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Age-appropriate learning programs designed for every stage of early
            childhood
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className={`glass-card ${program.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 border-2 border-transparent hover:border-opacity-50`}
                style={{
                  borderColor: `rgba(${index * 60}, ${100 + index * 20}, ${200 - index * 30}, 0.3)`,
                }}
              >
                <div
                  className={`${program.iconBg} rounded-2xl p-4 inline-block mb-6`}
                >
                  <Icon className={`w-10 h-10 ${program.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {program.title}
                </h3>

                <div
                  className={`inline-block px-4 py-1.5 bg-gradient-to-r ${program.color} text-white rounded-full text-sm font-medium mb-4`}
                >
                  {program.age}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 flex gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color}`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} opacity-60`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} opacity-30`}
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
