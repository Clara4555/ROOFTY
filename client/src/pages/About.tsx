import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import TestimonialCard from "@/components/TestimonialCard";
import type { Testimonial } from "@shared/schema";

export default function About() {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Roofty was established with a vision to revolutionize the real estate industry through technology and exceptional service.",
      icon: Target,
    },
    {
      year: "2019",
      title: "First 1,000 Properties",
      description: "Reached our first major milestone of 1,000 listed properties, serving clients across major metropolitan areas.",
      icon: CheckCircle,
    },
    {
      year: "2021",
      title: "Award Recognition",
      description: "Received the 'Innovation in Real Estate Technology' award from the National Real Estate Association.",
      icon: Award,
    },
    {
      year: "2023",
      title: "50,000+ Happy Clients",
      description: "Celebrated helping over 50,000 families find their dream homes with our trusted platform and expert agents.",
      icon: Heart,
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "With over 15 years in real estate, Sarah founded Roofty to make home buying accessible and transparent for everyone.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      expertise: "Leadership, Real Estate Strategy",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Michael leads our technology initiatives, bringing cutting-edge solutions to traditional real estate processes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      expertise: "Technology, Product Development",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      bio: "Emily ensures every client receives exceptional service throughout their real estate journey with personalized support.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      expertise: "Customer Relations, Operations",
    },
    {
      name: "David Wilson",
      role: "Head of Sales",
      bio: "David leads our sales team with a focus on building lasting relationships and delivering results for our clients.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      expertise: "Sales Strategy, Market Analysis",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Transparency",
      description: "We believe in complete transparency in all our transactions and communications.",
      gradient: "from-royal-blue to-blue-600",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Every decision we make is centered around delivering the best experience for our clients.",
      gradient: "from-warm-gold to-yellow-500",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from technology to customer support.",
      gradient: "from-sage-green to-green-500",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We conduct our business with the highest level of integrity and ethical standards.",
      gradient: "from-coral to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-royal-blue via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-warm-gold/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce-gentle" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-sage-green/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-warm-gold">Roofty</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              We're revolutionizing real estate with cutting-edge technology, trusted partnerships, and unmatched service to help you find your perfect home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button className="bg-warm-gold text-dark-gray hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg px-8 py-4">
                  Explore Properties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-royal-blue hover:scale-105 transition-all duration-300 font-semibold text-lg px-8 py-4">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
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
              Our <span className="text-royal-blue">Mission</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-4xl mx-auto">
              To make real estate transactions simple, transparent, and stress-free by leveraging innovative technology 
              and providing exceptional service that puts our clients' needs first.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group bg-soft-white rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`bg-gradient-to-br ${value.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-dark-gray mb-4">{value.title}</h3>
                <p className="text-muted-gray leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our <span className="text-royal-blue">Journey</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              From a small startup to a trusted name in real estate, here are the key milestones in our growth story.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-royal-blue/20 hidden lg:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:text-left text-center`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} mb-8 lg:mb-0`}>
                    <Card className="hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-br from-royal-blue to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                            <milestone.icon className="text-white w-6 h-6" />
                          </div>
                          <Badge className="bg-warm-gold text-dark-gray font-semibold">{milestone.year}</Badge>
                        </div>
                        <h3 className="text-xl font-bold text-dark-gray mb-3">{milestone.title}</h3>
                        <p className="text-muted-gray leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:block w-4 h-4 bg-royal-blue rounded-full border-4 border-white shadow-lg z-10" />
                  
                  <div className="lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
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
              Meet Our <span className="text-royal-blue">Team</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Our experienced team of real estate professionals is dedicated to helping you achieve your property goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-dark-gray mb-1">{member.name}</h3>
                    <p className="text-royal-blue font-medium mb-3">{member.role}</p>
                    <p className="text-muted-gray text-sm mb-4 leading-relaxed">{member.bio}</p>
                    <Badge variant="outline" className="text-xs">
                      {member.expertise}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
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
                Client <span className="text-royal-blue">Success Stories</span>
              </h2>
              <p className="text-xl text-muted-gray max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Roofty.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-royal-blue to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Let our experienced team help you navigate your real estate journey with confidence and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button className="bg-warm-gold text-dark-gray hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg px-8 py-4">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-royal-blue hover:scale-105 transition-all duration-300 font-semibold text-lg px-8 py-4">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
