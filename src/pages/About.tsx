import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  Box,
  FileText,
  Calculator,
  Scan,
  Palette,
  Video,
  CheckCircle,
  Clock,
  Award,
  Users,
} from "lucide-react";
import aboutHero from "@/assets/project-moonstone-villa.jpg";
import whyChooseUs from "@/assets/project-tranquil-crest.jpg";
import about from "@/assets/about.webp"
import chose from "@/assets/chose.jpg"


const AboutUs = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    {
      icon: Box,
      title: "3D Modeling Services",
      description:
        "Transforming concepts into detailed 3D models for accurate project visualization.",
    },
    {
      icon: FileText,
      title: "Construction Drawings",
      description:
        "Delivering precise construction blueprints for seamless execution.",
    },
    {
      icon: Calculator,
      title: "Quantity Take-Off",
      description:
        "Providing accurate material and cost estimations to optimize budgets.",
    },
    {
      icon: Scan,
      title: "Scan to BIM",
      description:
        "Converting point cloud data into intelligent BIM models for renovations.",
    },
    {
      icon: Palette,
      title: "Interior Designing",
      description:
        "Crafting functional & aesthetically pleasing interior spaces.",
    },
    {
      icon: Video,
      title: "3D Renders & Walkthroughs",
      description:
        "Providing immersive visuals & virtual walkthroughs for projects.",
    },
  ];

  const whyChooseUsItems = [
    {
      icon: CheckCircle,
      title: "Innovative Solutions",
      description:
        "We integrate the latest technology to bring your vision to life.",
    },
    {
      icon: Award,
      title: "Quality Construction",
      description:
        "We use premium materials to ensure durability and excellence.",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We value your time and complete projects within deadlines.",
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description:
        "Your satisfaction is our priority. We work closely with you.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="About Us - Rai Construction Solutions"
        description="Learn about Rai Construction Solutions, your trusted partner in construction consultancy, offering innovative and precise construction services."
        keywords="construction consultancy, BIM 3D modeling, construction drawings, scan to BIM, 3D renders, interior design, quantity take-off"
        canonical="https://raiconstructionsolutions.com/about"
        ogImage="/logo.png"
        twitterSite="@raiconstructionsolutions"
      />
      <Header />
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 mt-8">
          <h1
            id="hero-title"
            data-animate
            className={`text-4xl md:text-6xl font-bold text-primary-foreground text-center transition-all duration-700 ${
              isVisible["hero-title"] ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            ABOUT <span className="text-[#ff5457]">US</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div
              id="hero-image"
              data-animate
              className={`order-2 lg:order-1 transition-all duration-700 ${
                isVisible["hero-image"] ? "animate-fade-in-left" : "opacity-0"
              }`}
            >
              <img
                src={about}
                alt="Modern construction building"
                className="w-full h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div
              id="hero-content"
              data-animate
              className={`order-1 lg:order-2 space-y-6 transition-all duration-700 delay-200 ${
                isVisible["hero-content"]
                  ? "animate-fade-in-right"
                  : "opacity-0"
              }`}
            >
              <p className="text-lg text-foreground">
                Welcome to{" "}
                <span className="text-[#fd5457] font-semibold">
                  Rai Construction Solutions
                </span>{" "}
                – Your trusted partner in construction excellence.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Bringing Your Vision to Life with Precision, Innovation &
                Expertise.
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                At Rai Construction Solutions, we specialize in comprehensive
                construction consultancy with a commitment to precision,
                quality, and innovation. From conceptualization to execution, we
                ensure seamless project delivery with expert insights and
                cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            id="what-we-do-header"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["what-we-do-header"]
                ? "animate-fade-in-up"
                : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a wide range of specialized construction services
              tailored to meet every project requirement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={service.title}
                id={`service-${index}`}
                data-animate
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                  isVisible[`service-${index}`]
                    ? "animate-scale-in"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* Gradient hover border layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5457] to-[#3d3d3d] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <CardContent className="relative z-10 p-6 text-center bg-white dark:bg-[#1e1e1e] rounded-2xl">
                  <div className="bg-[#ff5457]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-[#ff5457] group-hover:text-[#3d3d3d] transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-[#ff5457] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-[#3d3d3d] transition-colors duration-300">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            id="explore-services"
            data-animate
            className={`text-center transition-all duration-700 ${
              isVisible["explore-services"] ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <Link to="/services">
              <Button
                size="lg"
                className="bg-[#ff5457] hover:bg-[#3d3d3d] text-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            id="why-choose-header"
            data-animate
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible["why-choose-header"]
                ? "animate-fade-in-up"
                : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              At{" "}
              <span className="font-semibold text-primary">
                Rai Construction Solutions
              </span>
              , we combine{" "}
              <span className="font-semibold">cutting-edge technology</span>{" "}
              with a{" "}
              <span className="font-semibold">client-centric approach</span> to
              deliver excellence in every project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div
              id="why-choose-image"
              data-animate
              className={`transition-all duration-700 ${
                isVisible["why-choose-image"]
                  ? "animate-fade-in-left"
                  : "opacity-0"
              }`}
            >
              <img
                src={chose}
                alt="Why choose us"
                className="w-full h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUsItems.map((item, index) => (
                <div
                  key={item.title}
                  id={`why-choose-${index}`}
                  data-animate
                  className={`group text-center p-6 transition-all duration-700 ${
                    isVisible[`why-choose-${index}`]
                      ? "animate-fade-in-right"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-[#3d3d3d]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 group-hover:bg-[#ff5457]/10">
                    <item.icon className="w-8 h-8 text-[#3d3d3d] group-hover:text-[#ff5457] transition-colors duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Message from Founder Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            id="founder-message"
            data-animate
            className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
              isVisible["founder-message"] ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
              Message from the Founder
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed mb-8">
              <p>
                At{" "}
                <span className="font-semibold text-primary">
                  Rai Construction Solutions
                </span>
                , our journey has been fueled by a passion for transforming
                construction projects into seamless, innovative, and
                high-quality experiences. From the very beginning, we envisioned
                a company that not only delivers exceptional construction
                consultancy but also embraces cutting-edge technology to help
                our clients succeed at every stage of their projects.
              </p>

              <p>
                As a team, we provide a comprehensive suite of services
                including 3D modeling, construction drawings, quantity
                take-offs, Scan to BIM, interior designing, 3D renders, and
                walkthroughs—all under one roof. Our goal is simple: to be your
                trusted partner, offering intelligent solutions that ensure your
                projects are executed with precision, efficiency, and
                creativity.
              </p>

              <p>
                We understand that every project is unique, and we take pride in
                crafting tailored solutions that meet your specific needs. Our
                commitment to innovation, attention to detail, and dedication to
                customer satisfaction drive us to go beyond traditional
                construction methods, creating spaces that inspire and exceed
                expectations.
              </p>

              <p>
                Thank you for choosing{" "}
                <span className="font-semibold text-primary">
                  Rai Construction Solutions
                </span>
                . Together, let's build your vision into reality.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="font-semibold text-foreground text-lg">
                Sincerely,
              </p>
              <p className="font-bold text-[#fd5457] text-xl mt-2">
                Mrinal Rai
              </p>
              <p className=" text-[#fd5457]">
                Founder, Rai Construction Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div
            id="contact-cta"
            data-animate
            className={`transition-all duration-700 ${
              isVisible["contact-cta"] ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Your Vision?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Contact us today and let's discuss how we can bring your
              construction projects to life with precision and innovation.
            </p>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#ff5457] text-white hover:bg-[#3d3d3d]"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
