import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/" },
  ];

  const services = [
    { name: "Buy Property", href: "/properties?type=sale" },
    { name: "Rent Property", href: "/properties?type=rent" },
    { name: "Sell Property", href: "/" },
    { name: "Property Management", href: "/" },
    { name: "Investment Consulting", href: "/" },
    { name: "Financing Solutions", href: "/" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ];

  return (
    <footer className="bg-dark-gray text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            className="animate-fade-in-up"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold text-white mb-6 flex items-center">
              <Home className="w-8 h-8 mr-2 text-warm-gold" />
              Roofty
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing real estate with cutting-edge technology, trusted partnerships, and unmatched service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="bg-royal-blue p-3 rounded-full hover:bg-blue-600 hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="animate-fade-in-up"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-warm-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="animate-fade-in-up"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-warm-gold transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="animate-fade-in-up"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-warm-gold mt-1 flex-shrink-0" />
                <span>123 Real Estate Ave, Suite 100<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-warm-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-warm-gold" />
                <span>info@roofty.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-r-none bg-gray-800 text-white border-gray-700 focus:border-warm-gold"
                />
                <Button className="bg-warm-gold text-dark-gray hover:bg-yellow-400 rounded-l-none">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Roofty. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-warm-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-warm-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-warm-gold transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
