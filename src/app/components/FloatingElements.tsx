import { Star, Cloud, Sparkles } from "lucide-react";

export function FloatingElements() {
  return (
    <>
      {/* Decorative floating elements */}
      <div className="fixed top-20 left-10 text-yellow-400 opacity-20 animate-bounce pointer-events-none z-0">
        <Star className="w-8 h-8 fill-yellow-400" />
      </div>
      <div className="fixed top-40 right-20 text-pink-400 opacity-20 animate-pulse pointer-events-none z-0">
        <Cloud className="w-10 h-10" />
      </div>
      <div className="fixed bottom-40 left-20 text-blue-400 opacity-20 animate-bounce pointer-events-none z-0" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="fixed top-1/2 right-10 text-purple-400 opacity-20 animate-pulse pointer-events-none z-0" style={{ animationDelay: '0.5s' }}>
        <Star className="w-6 h-6 fill-purple-400" />
      </div>
      <div className="fixed bottom-20 right-1/4 text-green-400 opacity-20 animate-bounce pointer-events-none z-0" style={{ animationDelay: '1.5s' }}>
        <Cloud className="w-8 h-8" />
      </div>
    </>
  );
}
