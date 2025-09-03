import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import service3DModeling from "@/assets/service-3d-modeling.jpg";
import serviceConstructionDocs from "@/assets/service-construction-docs.jpg";
import serviceScanToBim from "@/assets/service-scan-to-bim.jpg";
import service3DRenders from "@/assets/service-3d-renders.jpg";
import serviceInteriorDesign from "@/assets/service-interior-design.jpg";
import serviceQuantityTakeoff from "@/assets/service-quantity-takeoff.jpg";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Our Services - Rai Construction Solutions";
  }, []);

  const services = [
    {
      title: "BIM 3D Modeling",
      description: "Transform your construction projects with intelligent 3D models that integrate architectural, structural, and MEP components for seamless planning and execution.",
      image: service3DModeling,
      features: [
        "Architectural BIM Modeling",
        "Structural BIM Services", 
        "MEP Coordination Models",
        "Clash Detection & Resolution",
        "Model-based Quantity Take-offs",
        "4D Scheduling Integration"
      ],
      benefits: "Enhanced project accuracy, reduced construction errors, improved collaboration, and faster project delivery."
    },
    {
      title: "Construction Documents",
      description: "Comprehensive architectural, structural, and MEP plans that ensure compliance, minimize errors, and improve project execution efficiency.",
      image: serviceConstructionDocs,
      features: [
        "Detailed Working Drawings",
        "Construction Documentation",
        "Technical Specifications",
        "Code Compliance Review",
        "Permit Drawing Sets",
        "As-Built Documentation"
      ],
      benefits: "Streamlined approval processes, reduced construction delays, and ensured regulatory compliance."
    },
    {
      title: "Scan to BIM",
      description: "Convert laser scan data into accurate BIM models for renovation, retrofits, and as-built documentation with unprecedented precision and efficiency.",
      image: serviceScanToBim,
      features: [
        "3D Laser Scanning",
        "Point Cloud Processing",
        "As-Built BIM Models",
        "Existing Condition Assessment",
        "Renovation Planning Support",
        "Historical Building Documentation"
      ],
      benefits: "Accurate existing conditions capture, reduced site visits, and precise renovation planning."
    },
    {
      title: "3D Renders & Walkthroughs",
      description: "Experience your projects before construction begins with high-quality 3D renders and interactive walkthroughs for better visualization and decision-making.",
      image: service3DRenders,
      features: [
        "Photorealistic 3D Renders",
        "Virtual Reality Walkthroughs",
        "360° Panoramic Views",
        "Animation & Flythrough",
        "Material & Lighting Studies",
        "Design Iteration Visualization"
      ],
      benefits: "Enhanced client presentations, improved design communication, and reduced design changes."
    },
    {
      title: "Interior Designing",
      description: "Transform spaces with creative designs, functional layouts, and aesthetic enhancements tailored to residential and commercial needs.",
      image: serviceInteriorDesign,
      features: [
        "Space Planning & Layout",
        "3D Interior Visualization",
        "Material & Finish Selection",
        "Furniture & Fixture Design",
        "Lighting Design Solutions",
        "Custom Millwork Design"
      ],
      benefits: "Optimized space utilization, enhanced aesthetic appeal, and increased property value."
    },
    {
      title: "Quantity Take-Off",
      description: "Accurate estimation of materials and costs using BIM and detailed drawings, ensuring optimized resource allocation and cost efficiency.",
      image: serviceQuantityTakeoff,
      features: [
        "Material Quantity Calculations",
        "Cost Estimation Services",
        "Bill of Materials (BOM)",
        "Budget Planning Support",
        "Value Engineering Analysis",
        "Change Order Management"
      ],
      benefits: "Accurate project budgeting, reduced material waste, and improved cost control."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Services - Rai Construction Solutions"
        description="Comprehensive construction consultancy services including BIM 3D modeling, construction documents, scan to BIM, 3D renders, interior design, and quantity take-off."
        keywords="BIM 3D modeling, construction documents, scan to BIM, 3D renders, interior design, quantity take-off, construction services"
        canonical="https://raiconstructionsolutions.com/services"
        ogImage="/logo.png"
        twitterSite="@raiconstructionsolutions"
      />
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
                Our <span className="text-[#ff5457]">Expert Services</span>
              </h1>
              <p className="text-xl text-muted-light leading-relaxed">
                Comprehensive construction consultancy services designed to
                bring your projects to life with precision, innovation, and
                excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((service, index) => (
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
                    {/* Service Image */}
                    <div
                      className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    >
                      <div className="relative group">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-80 object-cover rounded-xl shadow-construction group-hover:shadow-accent transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-construction opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div
                      className={`space-y-6 ${
                        index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                      }`}
                    >
                      <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gradient-construction">
                        {service.title}
                      </h2>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-montserrat font-semibold text-foreground">
                          What We Offer:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-3"
                            >
                              <Check className="h-5 w-5 text-[#fd5457] flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="bg-muted-light/20 rounded-lg p-6">
                        <h4 className="font-montserrat font-semibold text-[#fd5457]  mb-3">
                          Key Benefits:
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.benefits}
                        </p>
                      </div>

                      <Button asChild className="bg-[#fd5457]">
                        <Link to="/contact">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
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
        <section className="py-20  text-white bg-[#3d3d3d]">
          <div className="container mx-auto px-4">
            <div
              className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-light mb-8 leading-relaxed">
                Let's discuss how our expert services can bring your
                construction vision to life with precision and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#fd5457] text-lg px-8 py-4"
                >
                  <Link to="/contact">
                    <span className="text-white">
                      {" "}
                      Get Free Consultation{" "}
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-outline-construction text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                >
                  <Link to="/projects">View Our Work</Link>
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

export default Services;