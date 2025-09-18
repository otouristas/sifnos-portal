import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">TS</span>
              </div>
              <span className="text-lg font-bold text-primary">TravelSifnos.gr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The most complete business directory for Sifnos island. Discover authentic experiences, 
              local businesses, and hidden gems on this beautiful Greek island.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary">
                Categories
              </Link>
              <Link to="/villages" className="text-sm text-muted-foreground hover:text-primary">
                Villages
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
                Blog
              </Link>
              <Link to="/portal" className="text-sm text-muted-foreground hover:text-primary">
                Sifnos Portal
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Business</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/submit-business" className="text-sm text-muted-foreground hover:text-primary">
                List Your Business
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                Pricing Plans
              </Link>
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary">
                Business Login
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@travelsifnos.gr</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+30 22840 xxxxx</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Sifnos, Cyclades, Greece</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} TravelSifnos.gr - Powered by Touristas AI. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Member of:</span>
              <a href="https://hotelssifnos.com" className="hover:text-primary">HotelsSifnos.com</a>
              <a href="https://hotelssantorini.gr" className="hover:text-primary">HotelsSantorini.gr</a>
              <a href="https://greececyclades.com" className="hover:text-primary">GreeceCyclades.com</a>
              <a href="https://cycladesrentacar.com" className="hover:text-primary">CycladesRentacar.com</a>
              <a href="https://discovercyclades.gr" className="hover:text-primary">DiscoverCyclades.gr</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;