import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import map from "@/assets/map.png"
import emailjs from "@emailjs/browser";
import SEO from "@/components/SEO";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectType: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    document.title = "Contact Us - Rai Construction Solutions";
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Jodhpur, Rajasthan, India"],
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+91 8003431008"],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@raiconstruction.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    },
  ];

  const services = [
    "BIM 3D Modeling",
    "Construction Documents",
    "Scan to BIM",
    "3D Renders & Walkthroughs",
    "Interior Designing",
    "Quantity Take-Off",
    "General Consultation"
  ];

  const projectTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Renovation",
    "New Construction",
    "Mixed Use"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "⚠️ Required fields missing",
        description: "Please fill in your Name, Email, and Message before submitting.",
        variant: "destructive"
      });
      return;
    }

    // ✅ EmailJS Send
    const submittedAt = new Date().toLocaleString();
    const templateParams = {
      ...formData,
      submittedAt,
    };

    emailjs
      .send(
        "service_qpkvjaa", 
        "template_479pv0r", 
        templateParams,
        "lD0Mvi6Nqbvb1pF01" 
      )
      .then(() => {
        setIsSuccessModalOpen(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          projectType: "",
          message: ""
        });
      })
      .catch(() => {
        toast({
          title: "❌ Message not sent",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="min-h-screen ">
      <SEO
        title="Contact Us - Rai Construction Solutions"
        description="Get in touch with Rai Construction Solutions for expert construction consultancy services. Contact us for BIM 3D modeling, construction documents, and more."
        keywords="contact Rai Construction Solutions, construction consultancy contact, BIM services contact, construction documents contact"
        canonical="https://raiconstructionsolutions.com/contact"
        ogImage="/logo.png"
        twitterSite="@raiconstructionsolutions"
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto text-center ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ willChange: "opacity, transform" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                Let's <span className="text-[#ff5457]">Connect</span>
              </h1>
              <p className="text-xl text-muted-light leading-relaxed">
                Ready to start your project? Get in touch with our expert team
                for a free consultation and discover how we can bring your
                construction vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div
                className={`space-y-8 transition-all duration-1000 delay-200 ${
                  isVisible ? "animate-slide-in-left" : "opacity-0"
                }`}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-gradient-construction mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We're here to help you turn your construction dreams into
                    reality. Reach out to us through any of the channels below.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="construction-card group">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-smooth">
                          <info.icon className="h-6 w-6 text-[#fd5457]" />
                        </div>
                        <div>
                          <h3 className="font-montserrat font-semibold text-foreground mb-2 group-hover:text-[#fd5457] transition-smooth">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p
                                key={detailIndex}
                                className="text-muted-foreground text-sm"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <a
                  href="https://maps.app.goo.gl/TH6LTyEhuTTNs18a8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="construction-card bg-muted-light/20 h-64 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden">
                    {/* Map Image (Preview) */}
                    <img
                      src={map} // <-- replace with your map image path
                      alt="Office Location Map"
                      className="w-full h-32 object-cover"
                    />

                    {/* Content */}
                    <div className="text-center text-[#fd5457] p-4">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-accent" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Visit our office location</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible ? "animate-slide-in-right" : "opacity-0"
                }`}
              >
                <div className="construction-card">
                  <h3 className="text-2xl font-montserrat font-bold text-gradient-construction mb-6">
                    Send us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter your full name"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter your email"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company/Organization
                        </label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          placeholder="Enter company name"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Service Interested In
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Project Type
                        </label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) =>
                            handleInputChange("projectType", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us about your project requirements..."
                        className="w-full h-32 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#ff5457] text-lg py-3"
                    >
                      Submit <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4">
            <div
              className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                Need Immediate Assistance?
              </h2>
              <p className="text-xl text-muted-light mb-8 leading-relaxed">
                For urgent project inquiries or immediate consultation, call us
                directly. Our expert team is ready to help you get started right
                away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#fd5457] text-lg px-8 py-4"
                >
                  <a href="tel:+918003431008">
                    <Phone className="mr-2 h-5 w-5" /> Call Now: +91 8003431008
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-outline-construction text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                >
                  <a href="mailto:info@raiconstruction.com">
                    <Mail className="mr-2 h-5 w-5" /> Email Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md mx-auto bg-white rounded-lg shadow-xl border-0">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-2xl font-montserrat font-bold text-gradient-construction">
              Thank You!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your message has been sent successfully. Our team will review your inquiry and get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-[#ff5457] hover:bg-[#e64447] text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Close <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;