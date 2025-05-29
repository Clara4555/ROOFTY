import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Shield, Home as HomeIcon, CreditCard, Headphones, Search, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCard from "@/components/TestimonialCard";
import type { Property, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: featuredProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const features = [
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "All listings are verified by our expert team to ensure authenticity and quality.",
      gradient: "from-royal-blue to-blue-600",
      delay: 0,
    },
    {
      icon: HomeIcon,
      title: "Premium Listings",
      description: "Access to exclusive properties and luxury homes you won't find elsewhere.",
      gradient: "from-warm-gold to-yellow-500",
      delay: 0.2,
    },
    {
      icon: CreditCard,
      title: "Easy Financing",
      description: "Connect with top lenders and get pre-approved in minutes with competitive rates.",
      gradient: "from-sage-green to-green-500",
      delay: 0.4,
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated team is always available to help you every step of the way.",
      gradient: "from-coral to-red-500",
      delay: 0.6,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Roofty */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              Why Choose <span className="text-royal-blue">Roofty</span>?
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              We're revolutionizing real estate with cutting-edge technology, trusted partnerships, and unmatched service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group bg-soft-white rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-dark-gray mb-4">{feature.title}</h3>
                <p className="text-muted-gray leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              Featured <span className="text-royal-blue">Properties</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Handpicked luxury properties that define modern living and exceptional value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/properties">
              <Button className="bg-royal-blue text-white px-8 py-4 rounded-xl hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg">
                <Search className="w-5 h-5 mr-2" />
                View All Properties
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              What Our <span className="text-royal-blue">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Real stories from satisfied clients who found their dream homes with Roofty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-royal-blue via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-warm-gold/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce-gentle" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-sage-green/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Find Your <span className="text-warm-gold">Dream Home</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
              Join thousands of satisfied clients who found their perfect home with Roofty. Start your journey today and discover what makes us different.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/properties">
                <Button className="bg-warm-gold text-dark-gray px-8 py-4 rounded-xl hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-royal-blue hover:scale-105 transition-all duration-300 font-semibold text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
