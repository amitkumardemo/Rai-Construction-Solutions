import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import construction from "@/assets/construction.webp";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-10 px-4 md:px-16 bg-gray-50 overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side: Image */}
        <div
          className={`lg:w-1/2 w-full transition-all duration-1000 transform ${
            isVisible
              ? "animate-slide-in-left"
              : "opacity-0 translate-x-[-50px]"
          }`}
        >
          <img
            src={construction}
            alt="Construction Solutions"
            className="w-full h-auto rounded-xl shadow-xl object-cover hover:scale-105 hover:shadow-2xl transition-transform duration-500 ease-in-out animate-float"
          />
        </div>

        {/* Right Side: Text Content */}
        <div
          className={`lg:w-1/2 w-full flex flex-col items-start text-left transition-all duration-1000 transform ${
            isVisible
              ? "animate-slide-in-right"
              : "opacity-0 translate-x-[50px]"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-extrabold mb-6 leading-tight ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to{" "}
            <span className="text-4xl md:text-5xl bg-[#ff5457] bg-clip-text text-transparent animate-gradient-move hover:brightness-125 transition duration-300">
              Rai Construction Solutions
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            At Rai Construction Solutions, we bring your construction vision to
            life with precision, innovation, and expertise. We are your trusted
            partner in comprehensive construction consultancy, offering a wide
            range of specialized services tailored to meet every project
            requirement. Our expertise spans various domains, ensuring seamless
            execution to the highest standards.
          </p>

          {/* Services List */}
          <ul className="space-y-4 w-full">
            {[
              {
                title: "3D Modeling Services:",
                desc: "Transforming concepts into detailed 3D models for accurate project visualization.",
              },
              {
                title: "Construction Drawings:",
                desc: "Delivering precise and efficient construction blueprints for seamless execution.",
              },
              {
                title: "Quantity Take-Off:",
                desc: "Providing accurate material and cost estimations to optimize your project budget.",
              },
              {
                title: "Scan to BIM (Point Cloud):",
                desc: "Converting point cloud data into intelligent BIM models for renovations or as-built projects.",
              },
              {
                title: "Interior Designing:",
                desc: "Creating functional and aesthetically pleasing interior spaces that reflect your vision.",
              },
              {
                title: "3D Renders and Walkthroughs:",
                desc: "Immersive visuals and virtual walkthroughs to bring your ideas to life before construction begins.",
              },
            ].map((item, index) => (
              <li
                key={index}
                className={`p-5 rounded-xl shadow-lg bg-[#3d3d3d] text-white border border-transparent hover:border-[#ff5457] hover:scale-[1.03] hover:shadow-[#ff5457]/40 transition-all duration-500 ease-in-out ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2 + 0.6}s` }}
              >
                <strong className="text-[#ff5457]  transition-all duration-300">
                  {item.title}
                </strong>{" "}
                {item.desc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Centered View Services Button */}
      <div
        className={`w-full flex justify-center mt-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{ animationDelay: "2s" }}
      >
        <Button
          asChild
          size="lg"
          className="px-8 py-4 flex items-center gap-2 hover:scale-110 hover:shadow-lg hover:bg-[#fd5457] transition-transform duration-300 ease-in-out"
        >
          <Link to="/services">
            Our Services <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default AboutSection;
