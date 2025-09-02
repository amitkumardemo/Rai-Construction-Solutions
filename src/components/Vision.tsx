import { useEffect, useRef, useState } from "react";
import { Target, Lightbulb, Eye, Cog, Award, Zap } from "lucide-react";
import vision from "@/assets/Vision.webp"


const Vision = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Target, label: "Precise 3D Modeling" },
    { icon: Lightbulb, label: "Accurate Planning" },
    { icon: Eye, label: "Immersive Visualizations" },
    { icon: Cog, label: "Construction Drawings" },
    { icon: Award, label: "BIM Modeling" },
    { icon: Zap, label: "Advanced Rendering" },
  ];

  return (
    <section ref={sectionRef} className="py-20  bg-[#3d3d3d] ">
      <div className="container mx-auto px-4 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Vision Content */}
          <div
            className={`text-white transition-all duration-1000 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold mb-6">
              Our <span className="text-[#ff5457]">Vision</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-montserrat font-semibold text-[#ff5457] mb-8">
              Revolutionizing Construction with Innovation & Technology
            </h3>

            <p className="text-lg leading-relaxed mb-6">
              At{" "}
              <span className="text-[#ff5457] font-semibold">
                Rai Construction Solutions
              </span>
              , our vision is to{" "}
              <span className="text-[#ff5457] font-semibold">
                revolutionize the construction industry
              </span>{" "}
              by providing{" "}
              <span className="text-[#ff5457] font-semibold">
                innovative, technology-driven solutions
              </span>{" "}
              that bridge the gap between design and execution.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              We aim to be a{" "}
              <span className="text-[#ff5457] font-semibold">
                one-stop consultancy partner
              </span>
              , empowering architects, contractors, and developers with
              cutting-edge tools and expertise.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-700 hover:translate-x-2"
                >
                  <div className="p-2 bg-accent/20 rounded-full">
                    <feature.icon className="h-5 w-5 text-[#ff5457]" />
                  </div>
                  <span className="font-montserrat font-medium text-base">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Closing Note */}
            <p className="text-lg leading-relaxed mb-4">
              We envision a future where every project is executed{" "}
              <span className="text-[#ff5457] font-semibold">
                efficiently, clearly, and creatively
              </span>
              —transforming ideas into reality with{" "}
              <span className="text-[#ff5457] font-semibold">
                precision and excellence
              </span>
              .
            </p>

            <p className="text-lg leading-relaxed">
              Our commitment is to{" "}
              <span className="text-[#ff5457] font-semibold">
                innovation, quality, and client satisfaction
              </span>
              . We ensure every project benefits from{" "}
              <span className="text-[#ff5457] font-semibold">
                smarter designs, optimized resources, and seamless execution
              </span>
              .
            </p>
          </div>

          {/* Right: Vision Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="relative">
              <img
                src={vision} // replace with your image path
                alt="Vision"
                className="rounded-2xl shadow-lg border border-white/20 object-cover w-full h-[500px]"
              />
              {/* Overlay Accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
