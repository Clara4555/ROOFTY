import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  Building,
  MessageSquare,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import type { ContactFormData } from "@/lib/types";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredDate: "",
        preferredTime: "",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const updateFormData = (key: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Real Estate Ave, Suite 100", "New York, NY 10001"],
      gradient: "from-royal-blue to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"],
      gradient: "from-sage-green to-green-500",
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["info@roofty.com", "support@roofty.com"],
      gradient: "from-warm-gold to-yellow-500",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      gradient: "from-coral to-red-500",
    },
  ];

  const services = [
    {
      icon: Building,
      title: "Property Sales",
      description: "Comprehensive assistance with buying and selling residential and commercial properties.",
    },
    {
      icon: Users,
      title: "Property Management",
      description: "Full-service property management solutions for landlords and real estate investors.",
    },
    {
      icon: MessageSquare,
      title: "Consultation",
      description: "Expert real estate consultation and market analysis to help you make informed decisions.",
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-warm-gold">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Ready to start your real estate journey? Our team of experts is here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
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
              Contact <span className="text-royal-blue">Information</span>
            </h2>
            <p className="text-xl text-muted-gray max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100">
                  <CardContent className="p-8 text-center">
                    <div className={`bg-gradient-to-br ${info.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-gray mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-gray">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-dark-gray flex items-center">
                    <Send className="w-6 h-6 mr-3 text-royal-blue" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-dark-gray">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          placeholder="John Doe"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-dark-gray">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="john@example.com"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-dark-gray">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-sm font-medium text-dark-gray">
                          Preferred Contact Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => updateFormData("preferredDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-sm font-medium text-dark-gray">
                          Preferred Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => updateFormData("preferredTime", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-dark-gray">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        placeholder="Tell us about your real estate needs, questions, or how we can help you..."
                        rows={5}
                        required
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-royal-blue text-white hover:bg-blue-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg py-3"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Map Placeholder */}
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-dark-gray flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-royal-blue" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-gray mx-auto mb-2" />
                      <p className="text-muted-gray font-medium">Interactive Map</p>
                      <p className="text-sm text-muted-gray">Coming Soon</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-soft-white rounded-lg">
                    <p className="text-dark-gray font-medium">Visit our office:</p>
                    <p className="text-muted-gray">123 Real Estate Ave, Suite 100</p>
                    <p className="text-muted-gray">New York, NY 10001</p>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-dark-gray">
                    How Can We Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div key={service.title} className="flex items-start space-x-3">
                        <div className="bg-royal-blue w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark-gray">{service.title}</h4>
                          <p className="text-sm text-muted-gray">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              Frequently Asked <span className="text-royal-blue">Questions</span>
            </h2>
            <p className="text-xl text-muted-gray">
              Quick answers to common questions about our services and process.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              {
                question: "How quickly can I get a response to my inquiry?",
                answer: "We typically respond to all inquiries within 2-4 hours during business hours, and within 24 hours on weekends and holidays."
              },
              {
                question: "Do you charge for initial consultations?",
                answer: "No, our initial consultations are completely free. We believe in understanding your needs before discussing any service agreements."
              },
              {
                question: "What areas do you serve?",
                answer: "We primarily serve the greater New York metropolitan area, including all five boroughs and surrounding counties. Contact us to confirm service in your specific area."
              },
              {
                question: "Can you help with both buying and selling?",
                answer: "Absolutely! Our team provides comprehensive real estate services including buying, selling, renting, and property management solutions."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-sage-green flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-dark-gray mb-2">{faq.question}</h3>
                      <p className="text-muted-gray">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
