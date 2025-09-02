import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import service3DModeling from "@/assets/service-3d-modeling.jpg";
import serviceConstructionDocs from "@/assets/service-construction-docs.jpg";
import serviceScanToBim from "@/assets/service-scan-to-bim.jpg";
import service3DRenders from "@/assets/service-3d-renders.jpg";
import serviceInteriorDesign from "@/assets/service-interior-design.jpg";
import serviceQuantityTakeoff from "@/assets/service-quantity-takeoff.jpg";

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Show immediately on mobile screens (<768px), else false
  const [isVisible, setIsVisible] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (isVisible) return; // already visible on mobile

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" } // triggers earlier on mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const services = [
    {
      title: "BIM 3D Modeling",
      description:
        "Enhance project accuracy with intelligent 3D models integrating architectural, structural, and MEP components for seamless planning and execution.",
      image: service3DModeling,
      delay: "0ms",
    },
    {
      title: "Construction Documents",
      description:
        "Comprehensive architectural, structural, and MEP plans ensuring compliance, minimizing errors, and improving project execution.",
      image: serviceConstructionDocs,
      delay: "200ms",
    },
    {
      title: "Scan to BIM",
      description:
        "Convert laser scan data into accurate BIM models for renovation, retrofits, and as-built documentation, improving precision and efficiency.",
      image: serviceScanToBim,
      delay: "400ms",
    },
    {
      title: "Renders & Walkthroughs",
      description:
        "Experience projects before construction with high-quality 3D renders and interactive walkthroughs for better visualization and decision-making.",
      image: service3DRenders,
      delay: "600ms",
    },
    {
      title: "Interior Designing",
      description:
        "Transform spaces with creative designs, functional layouts, and aesthetic enhancements tailored to residential and commercial needs.",
      image: serviceInteriorDesign,
      delay: "800ms",
    },
    {
      title: "Quantity Take-Off",
      description:
        "Accurate estimation of materials and costs using BIM and detailed drawings, ensuring optimized resource allocation and cost efficiency.",
      image: serviceQuantityTakeoff,
      delay: "1000ms",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-muted-light/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-gradient-construction mb-6">
            Our <span className="text-[#ff5457] bold">Expert</span> Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive range of specialized services tailored to
            meet every project requirement. Our expertise spans various domains,
            ensuring seamless execution to the highest standards.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {services.map((service, index) => (
            <Link key={index} to="/services">
              <div
                className={`service-card group transition-all duration-1000 h-full flex flex-col ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: isVisible ? service.delay : "0ms" }}
              >
                {/* Service Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-construction opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                  {/* Hover overlay with icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 p-3 rounded-full shadow-accent">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-montserrat font-semibold text-foreground group-hover:text-[#ff5457] transition-smooth">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <Link
                      to="/services"
                      className="inline-flex items-center text-[#ff5457] font-inter font-medium hover:text-accent-light transition-smooth group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
