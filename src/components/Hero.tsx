import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-construction.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Construction site with modern architecture"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>

        
      </div>

      {/* Centered Heading */}<div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
  <div
    className={`transition-all duration-1000 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight italic mb-6 text-white animate-fade-in">
      Where Ideas Take Shape –{" "}
      <span className="bg-[#ff5457] bg-clip-text text-transparent font-extrabold animate-pulse-slow">
        Complete Construction Consultancy
      </span>{" "}
      Under One Roof!
    </h1>
  </div>
</div>


      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
