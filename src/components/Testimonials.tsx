import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "A. Mehta",
      role: "",
      company: "",
      rating: 5,
      content:
        "Rai Construction Solutions turned our dream home into reality! From the initial 3D modeling to the final execution, their team ensured every detail was perfect. The stunning renders helped us visualize everything in advance, making the entire process seamless. Highly professional and creative!",
      delay: "0ms",
    },
    {
      name: "V. Sharma",
      role: "",
      company: "",
      rating: 5,
      content:
        "We needed a modern yet functional design for our townhouse project, and Rai Construction Solutions delivered beyond our expectations. Their quantity take-off services ensured we stayed within budget while their 3D walkthroughs helped us make informed decisions. Highly recommended!",
      delay: "200ms",
    },
    {
      name: "S. Roy",
      role: "",
      company: "",
      rating: 5,
      content:
        "The expertise and attention to detail shown by Rai Construction Solutions are unmatched. Their architectural planning, BIM services, and interior design suggestions were exceptional. Tranquil Crest wouldn’t have been the same without their innovative approach!",
      delay: "400ms",
    },
    {
      name: "R. Kapoor",
      role: "",
      company: "",
      rating: 5,
      content:
        "What sets Rai Construction Solutions apart is their ability to blend creativity with technical precision. Their Scan to BIM services saved us a lot of time in renovation, and their consultancy ensured smooth execution. A fantastic experience overall!",
      delay: "600ms",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-muted-light/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-gradient-construction mb-6">
            What Our <span className="text-[#ff5457] bold">Happy</span> Clients
            Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience working with Rai Construction
            Solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`construction-card text-center max-w-3xl mx-auto bg-white transition-all duration-1000 ${
                      isVisible ? "animate-scale-in" : "opacity-0"
                    }`}
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="h-12 w-12 text-[#ff5457] mx-auto opacity-50" />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-[#ff5457] text-[#ff5457]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-montserrat font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-muted-foreground">
                          {testimonial.role}{" "}
                          {testimonial.company && (
                            <>
                              at{" "}
                              <span className="text-[#ff5457] font-medium">
                                {testimonial.company}
                              </span>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-[#ff5457] shadow-[#ff5457]"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setActiveTestimonial(
                activeTestimonial === 0
                  ? testimonials.length - 1
                  : activeTestimonial - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-white shadow-construction hover:shadow-[#ff5457] transition-smooth hover-scale"
          >
            ←
          </button>
          <button
            onClick={() =>
              setActiveTestimonial(
                (activeTestimonial + 1) % testimonials.length
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-white shadow-construction hover:shadow-[#ff5457] transition-smooth hover-scale"
          >
            →
          </button>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
             
              { label: "Projects Delivered", value: "35+" },
              { label: "Expert Team Members", value: "5+" },
              { label: "Years of Excellence", value: "4+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-[#ff5457] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-inter">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
