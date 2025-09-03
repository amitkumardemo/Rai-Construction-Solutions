import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Vision from "@/components/Vision";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import BlogSection from "./BlogsSection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Rai Construction Solutions - Complete Construction Consultancy Services"
        description="Leading construction consultancy offering BIM 3D modeling, construction documents, scan to BIM, 3D renders, interior design, and quantity take-off services."
        keywords="BIM 3D modeling, construction documents, scan to BIM, 3D renders, interior design, quantity take-off, construction consultancy, architectural services"
        canonical="https://raiconstructionsolutions.com/"
        ogImage="/logo.png"
        twitterSite="@raiconstructionsolutions"
      />
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
