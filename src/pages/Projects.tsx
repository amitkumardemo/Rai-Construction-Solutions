import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import projectMoonstoneVilla from "@/assets/project-moonstone-villa.jpg";
import projectTranquilCrest from "@/assets/project-tranquil-crest.jpg";
import projectLilyfieldHouse from "@/assets/project-lilyfield-house.jpg";
import oakridgeenclave from "@/assets/project-okridge-conclave.jpg";
import verdantvista from "@/assets/project-verdant-vista.jpg";
import sunsetridge from "@/assets/project-sunset-ridge residence.jpg";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setIsVisible(true);
    document.title = "Our Projects - Rai Construction Solutions";
  }, []);

  const categories = [
    "All",
    "Luxury Residential",
    "Commercial",
    "Heritage Modern",
    "Urban Contemporary",
  ];

  const projects = [
    {
      title: "Moonstone Villa",
      description:
        "A stunning modern architectural masterpiece blending contemporary aesthetics with natural textures. This luxury residential project showcases our expertise in creating sophisticated living spaces.",
      image: projectMoonstoneVilla,
      category: "Luxury Residential",
      location: "Dubai",
      year: "2024",
      client: "Private Client",
      services: [
        "BIM 3D Modeling",
        "3D Renders & Walkthroughs",
        "Interior Design",
      ],
      details:
        "This 8,500 sq ft luxury villa features cutting-edge design elements, sustainable materials, and smart home integration. Our comprehensive BIM modeling enabled seamless coordination between all trades.",
    },
    {
      title: "Tranquil Crest",
      description:
        "A blend of modern sophistication with classical charm, featuring arched windows and ornamental patterns. This heritage-inspired project demonstrates our versatility in architectural styles.",
      image: projectTranquilCrest,
      category: "Heritage Modern",
      location: "Saudi Arabia",
      year: "2022",
      client: "Private Client",
      services: ["Construction Documents", "Quantity Take-Off", "Scan to BIM"],
      details:
        "A 12,000 sq ft residential complex that honors traditional architecture while incorporating modern amenities. Our detailed construction documents ensured historical accuracy and compliance.",
    },
    {
      title: "Lilyfield House",
      description:
        "A modern townhouse with a clean geometric façade, integrating natural wood and glass elements. This urban project showcases sustainable design and contemporary living.",
      image: projectLilyfieldHouse,
      category: "Urban Contemporary",
      location: "USA",
      year: "2024",
      client: "Private Client",
      services: ["BIM 3D Modeling", "Interior Design", "3D Renders"],
      details:
        "A 4,200 sq ft eco-friendly townhouse featuring energy-efficient systems, green building materials, and innovative space planning solutions for modern urban families.",
    },
    {
      title: "The Oakridge Enclave",
      description:
        "A contemporary residential complex that blends simplicity, functionality, and elegance, featuring natural materials and open layouts for modern living.",
      image: oakridgeenclave,
      category: "Residential Modern",
      location: "Dublin",
      year: "2023",
      client: "Private Client",
      services: [
        "Architectural Design",
        "Sustainable Planning",
        "3D Visualization",
      ],
      details:
        "The Oakridge Enclave is a modern residential community designed with a focus on symmetry, natural materials like brick and wood, and ample green spaces. It combines energy-efficient systems with contemporary aesthetics to offer a serene lifestyle.",
    },
    {
      title: "Verdant Vista",
      description:
        "A sophisticated urban building with balanced design and expansive windows, offering a perfect blend of functionality and aesthetic appeal.",
      image: verdantvista,
      category: "Urban Architecture",
      location: "India",
      year: "2024",
      client: "Private Client",
      services: [
        "Urban Design",
        "Concept Development",
        "Interior Layout Planning",
      ],
      details:
        "Verdant Vista features a minimalist façade with contrasting materials, designed to maximize natural light and create a serene yet vibrant environment for mixed-use functionality.",
    },
    {
      title: "Sunset Ridge Residence",
      description:
        "A bold architectural masterpiece with an angular layout and striking color palette, combining openness and privacy in a lakeside setting.",
      image: sunsetridge,
      category: "Luxury Residential",
      location: "Australia",
      year: "2022",
      client: "Private Client",
      services: ["Custom Home Design", "3D Rendering", "Landscape Integration"],
      details:
        "Sunset Ridge Residence is designed with an innovative courtyard-style layout, arched windows, and pergolas to enhance outdoor living. Its vibrant color scheme and lakeside views make it a unique blend of modern elegance and natural beauty.",
    },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Our <span className="text-[#ff5457]">Dream </span>
                Projects
              </h1>
              <p className="text-xl text-muted-light leading-relaxed">
                Discover our exceptional construction projects that showcase
                innovation, craftsmanship, and architectural excellence across
                various sectors.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${
                    index * 200
                  } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                >
                  <div
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Project Image */}
                    <div
                      className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    >
                      <div className="relative group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-96 object-cover rounded-xl shadow-construction group-hover:shadow-accent transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-construction opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div
                      className={`space-y-6 ${
                        index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                      }`}
                    >
                      <div>
                        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gradient-construction mb-4">
                          {project.title}
                        </h2>

                        {/* Project Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-[#fd5457] " />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-[#fd5457]" />
                            <span>{project.year}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-[#fd5457]" />
                            <span>{project.client}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        {project.details}
                      </p>

                      {/* Services Used */}
                      <div className="space-y-3">
                        <h3 className="font-montserrat font-semibold text-foreground">
                          Services Provided:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.services.map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className="bg-muted-light/50 text-muted-foreground px-3 py-1 rounded-full text-sm font-inter"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="bg-[#3d3d3d] hover:bg-[#fd5457]"
                      >
                        <Link to="/contact">
                          Start Similar Project{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4">
            <div
              className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Ready to Create Your Dream Project?
              </h2>
              <p className="text-xl text-muted-light mb-8 leading-relaxed">
                Let's collaborate to bring your vision to life with the same
                level of excellence and innovation showcased in our portfolio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#fd5457] text-lg px-8 py-4"
                >
                  <Link to="/contact">
                    Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-outline-construction text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
