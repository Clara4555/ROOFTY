import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Star,
  Phone,
  Mail,
  Home,
  Car,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    enabled: !!id,
  });

  const { data: similarProperties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", { propertyType: property?.propertyType, city: property?.city }],
    enabled: !!property,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to the server
    console.log("Form submitted:", formData);
    // Reset form or show success message
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-6 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-8" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-soft-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-muted-gray mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-dark-gray mb-2">Property Not Found</h1>
          <p className="text-muted-gray mb-6">The property you're looking for doesn't exist.</p>
          <Link href="/properties">
            <Button className="bg-royal-blue text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string, type: string) => {
    const numPrice = parseFloat(price);
    if (type === "rent") {
      return `$${numPrice.toLocaleString()}/mo`;
    }
    return `$${numPrice.toLocaleString()}`;
  };

  const getStatusColor = (type: string) => {
    return type === "sale" ? "bg-sage-green" : "bg-warm-gold text-dark-gray";
  };

  const getStatusText = (type: string) => {
    return type === "sale" ? "For Sale" : "For Rent";
  };

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/properties">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getStatusColor(property.type)} text-white px-3 py-1 text-sm font-medium`}>
                          {getStatusText(property.type)}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={() => setIsFavorited(!isFavorited)}
                        >
                          <Heart className={`w-4 h-4 ${isFavorited ? "fill-coral text-coral" : "text-muted-gray"}`} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white"
                        >
                          <Share2 className="w-4 h-4 text-muted-gray" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Property Summary */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-dark-gray">
                    {property.title}
                  </h1>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-royal-blue">
                      {formatPrice(property.price, property.type)}
                    </p>
                    <div className="flex items-center text-warm-gold mt-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-muted-gray">{property.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-gray mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-coral" />
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>

                <div className="flex flex-wrap gap-6 text-muted-gray">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2" />
                    <span>{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  {property.parking && property.parking > 0 && (
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      <span>{property.parking} Parking</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      <span>Built in {property.yearBuilt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Information */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-gray leading-relaxed">{property.description}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-muted-gray">
                            <CheckCircle className="w-4 h-4 mr-2 text-sage-green" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-muted-gray">
                            <CheckCircle className="w-4 h-4 mr-2 text-sage-green" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="location" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Location & Neighborhood</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-muted-gray">Interactive Map Coming Soon</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="sticky top-24"
            >
              {/* Contact Agent */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-royal-blue" />
                    Contact Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {property.agentName && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-dark-gray">{property.agentName}</h4>
                      <p className="text-sm text-muted-gray">Licensed Real Estate Agent</p>
                    </div>
                  )}
                  
                  <div className="space-y-3 mb-6">
                    {property.agentPhone && (
                      <div className="flex items-center text-muted-gray">
                        <Phone className="w-4 h-4 mr-3 text-royal-blue" />
                        <span>{property.agentPhone}</span>
                      </div>
                    )}
                    {property.agentEmail && (
                      <div className="flex items-center text-muted-gray">
                        <Mail className="w-4 h-4 mr-3 text-royal-blue" />
                        <span>{property.agentEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-royal-blue text-white hover:bg-blue-800">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Visit */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-royal-blue" />
                    Schedule a Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Any specific questions or requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-sage-green text-white hover:bg-green-600">
                      Schedule Visit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties
                .filter(p => p.id !== property.id)
                .slice(0, 3)
                .map((similarProperty, index) => (
                  <PropertyCard key={similarProperty.id} property={similarProperty} index={index} />
                ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
