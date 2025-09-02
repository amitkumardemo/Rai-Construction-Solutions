import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import projectMoonstoneVilla from "@/assets/project-moonstone-villa.jpg";
import projectTranquilCrest from "@/assets/project-tranquil-crest.jpg";
import projectLilyfieldHouse from "@/assets/project-lilyfield-house.jpg";

const Projects = () => {
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

  const projects = [
    {
      title: "Moonstone Villa",
      description:
        "A stunning modern architectural masterpiece blending contemporary aesthetics with natural textures.",
      image: projectMoonstoneVilla,
      delay: "0ms",
    },
    {
      title: "Tranquil Crest",
      description:
        "A blend of modern sophistication with classical charm, featuring arched windows and ornamental patterns.",
      image: projectTranquilCrest,
      delay: "200ms",
    },
    {
      title: "Lilyfield House",
      description:
        "A modern townhouse with a clean geometric façade, integrating natural wood and glass elements.",
      image: projectLilyfieldHouse,
      delay: "400ms",
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-background ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-gradient-construction mb-6">
            Some Of Our Popular{" "}
            <span className="text-[#ff5457] bold">Dream</span> Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of exceptional construction projects that
            showcase our expertise in delivering innovative solutions and
            architectural excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card group transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: isVisible ? project.delay : "0ms" }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-smooth group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-construction opacity-0 group-hover:opacity-80 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                    <Link to="/projects">
                      <p className="font-montserrat font-semibold">
                        View Details
                      </p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-montserrat font-semibold text-foreground group-hover:text-accent transition-smooth">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Read More Link */}
                <div className="pt-2">
                  <Link
                    to="/projects"
                    className="inline-flex items-center text-[#ff5457] font-inter font-medium hover:text-accent-light transition-smooth group"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-accent/20 group-hover:border-t-accent/40 transition-smooth"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-[#3d3d3d] hover:bg-[#ff5457] text-lg px-8 py-4"
          >
            <Link to="/projects">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
