import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Page Not Found - Rai Construction Solutions";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-montserrat font-bold text-accent/20 leading-none animate-bounce-in">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Oops! Page Not Found
            </h2>
            
            <p className="text-xl text-muted-light leading-relaxed">
              It looks like the page you're looking for doesn't exist or has been moved. 
              Don't worry, our construction team is always building something new!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
              <p className="text-sm text-muted-light">
                <strong>Requested URL:</strong> {location.pathname}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button asChild size="lg" className="btn-construction text-lg px-8 py-4">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="btn-outline-construction text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/projects">
                <Search className="mr-2 h-5 w-5" />
                View Projects
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="btn-outline-construction text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                Contact Support
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 animate-fade-in-up animation-delay-500">
            <p className="text-muted-light mb-4">You might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="hover:text-accent transition-smooth">
                About Us
              </Link>
              <Link to="/services" className="hover:text-accent transition-smooth">
                Our Services
              </Link>
              <Link to="/projects" className="hover:text-accent transition-smooth">
                Portfolio
              </Link>
              <Link to="/blog" className="hover:text-accent transition-smooth">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-accent transition-smooth">
                Contact
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center text-muted-light hover:text-accent transition-smooth"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back to previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
