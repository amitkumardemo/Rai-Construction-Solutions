import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vision from "@/components/Vision";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import BlogSection from "./BlogsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSection/>
        <Vision />
        <Services />
        <Projects />
        <Testimonials />
        <BlogSection/>

      </main>
      <Footer />
    </div>
  );
};

export default Index;
