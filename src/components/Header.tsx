import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import white from "@/assets/logo-white.png"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Our Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = isHome && !scrolled ? "text-white" : "text-[#3d3d3d]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHome
          ? scrolled
            ? "bg-white/90 shadow-md backdrop-blur-sm"
            : "bg-transparent"
          : "bg-white/90 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Left Side: Logo + Text */}
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 min-w-0 hover:scale-105 transition-transform"
          >
            <img
              src={isHome && !scrolled ? white : logo} // white logo in hero section, colored logo otherwise
              alt="Rai Construction Logo"
              className="h-16 sm:h-16 md:h-16 lg:h-16 w-auto object-contain flex-shrink-0"
            />

            <span
              className={`font-montserrat text-[#fd5457] font-bold text-[15px] sm:text-[17px] md:text-[20px] lg:text-[20px] whitespace-nowrap`}
            >
              Rai Construction Solutions
            </span>
          </Link>

          {/* Right Side: Nav + CTA + Mobile Toggle */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[#ff5457]"
                      : `${textColor} hover:text-[#ff5467]`
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#ff5457] transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0 hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button className="bg-[#ff5467] text-white hover:bg-[#ff6f7f]">
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${textColor} lg:hidden`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/90 backdrop-blur-sm p-4 space-y-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block font-medium ${
                  isActive(item.href)
                    ? "text-[#ff5457]"
                    : `${
                        isHome ? "text-[#3d3d3d]" : textColor
                      } hover:text-[#ff5467]`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-[#ff5467] text-white w-full hover:bg-[#ff6f7f]">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Get Quote
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
