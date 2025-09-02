import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import three from "@/assets/threedmodel.webp";
import scan from "@/assets/sacn.webp";
import luxury from "@/assets/luxury.webp";


const BlogPage = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="bg-background w-full mt-18 pt-16">
      <Header />

      {/* 🔥 Blog Intro Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              visibleSections.has(0)
                ? "animate-fade-in-up"
                : "opacity-0 translate-y-10"
            }`}
            ref={setSectionRef(0)}
            data-index="0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
              Our{" "}
              <span className="bg-[#ff5457]  bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Explore insights, trends, and expert tips in construction,
              interior design, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-16 py-12">
        {[
          {
            title: "The Impact of 3D Modeling in Construction",
            text: "3D modeling is revolutionizing the construction industry by enhancing visualization, collaboration, and efficiency.",
            img: three,
            points: [
              {
                title: "Enhanced Visualization",
                desc: "Realistic representations improve decision-making.",
              },
              {
                title: "Improved Collaboration",
                desc: "BIM tools streamline data sharing and reduce conflicts.",
              },
              {
                title: "Accurate Cost Estimation",
                desc: "Helps project managers avoid budget overruns.",
              },
              {
                title: "Efficient Design Modifications",
                desc: "Quick design changes optimize projects.",
              },
              {
                title: "Risk Mitigation",
                desc: "Clash detection minimizes errors and delays.",
              },
              {
                title: "Sustainability",
                desc: "Supports energy-efficient designs, reducing waste.",
              },
            ],
            highlight:
              "3D modeling is a game-changer in construction, improving efficiency, collaboration, and sustainability.",
            highlightColor: "border-construction-red",
          },
          {
            title: "The Impact of Scan to BIM on Construction & Renovation",
            text: "Scan to BIM (Building Information Modeling) is transforming the construction industry by converting real-world structures into accurate digital models using 3D laser scanning.",
            img:scan,
            points: [
              {
                title: "Improved Accuracy & Efficiency",
                desc: "Reduces errors and costly rework.",
              },
              {
                title: "Enhanced Renovation",
                desc: "Facilitates precise restoration, especially for historical buildings.",
              },
              {
                title: "Better Collaboration",
                desc: "Centralized digital models for seamless teamwork.",
              },
              {
                title: "Cost & Time Savings",
                desc: "Early clash detection and accurate planning.",
              },
              {
                title: "Streamlined Facility Management",
                desc: "Facilitates tracking and maintenance post-construction.",
              },
            ],
            highlight:
              "As technology advances, Scan to BIM will continue reshaping construction practices, delivering precision and efficiency for modern projects.",
            highlightColor: "border-construction-accent",
          },
          {
            title: "Luxury on a Budget: Affordable Interior Design Tips",
            text: "Achieve a luxurious look without breaking the bank with these budget-friendly design tips.",
            img:luxury,
            points: [
              {
                title: "Invest in Statement Pieces",
                desc: "Add one standout piece like a grand mirror or elegant chandelier.",
              },
              {
                title: "Play with Lighting",
                desc: "Use stylish pendant lights and layered light sources for a warm, inviting feel.",
              },
              {
                title: "Use High-Quality Fabrics",
                desc: "Choose velvet, silk, or linen for curtains and upholstery for a luxurious touch.",
              },
              {
                title: "Incorporate Elegant Colour Schemes",
                desc: "Neutrals with metallic accents create sophistication.",
              },
              {
                title: "Upgrade Your Hardware",
                desc: "Simple changes like new cabinet knobs elevate the space.",
              },
            ],
            highlight:
              "By focusing on thoughtful details and styling, you can create a luxurious space on a budget.",
            highlightColor: "border-construction-red",
          },
        ].map((post, index) => (
          <article
            key={index}
            className={`mb-12 transition-all duration-1000 ${
              visibleSections.has(index + 1)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
            ref={setSectionRef(index + 1)}
            data-index={index + 1}
          >
            <Card className="w-full shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-transform duration-700 hover:-translate-y-2 bg-white">
              <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10 items-center">
                {index % 2 === 1 && (
                  <div className="relative overflow-hidden rounded-xl order-1 md:order-2">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-3xl font-bold text-[#fd5457] mb-6 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {post.text}
                  </p>

                  <div className="space-y-4 mb-8">
                    {post.points.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 transition-transform hover:translate-x-2 duration-300"
                      >
                        <div className="w-2 h-2 bg-construction-red rounded-full mt-2"></div>
                        <div>
                          <span className=" text-bold text-[#3d3d3d] font-bold">
                            {item.title}:
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`bg-construction-light p-6 rounded-lg border-l-4 ${post.highlightColor}`}
                  >
                    <p className="text-construction-neutral leading-relaxed">
                      {post.highlight}
                    </p>
                  </div>
                </div>

                {index % 2 === 0 && (
                  <div className="relative overflow-hidden rounded-xl order-2 md:order-1">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-80 object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>
            </Card>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
