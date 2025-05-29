import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden">
        {/* Property Image */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={property.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
            alt={property.title}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getStatusColor(property.type)} text-white px-3 py-1 text-sm font-medium`}>
            {getStatusText(property.type)}
          </Badge>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-coral text-coral" : "text-muted-gray hover:text-coral"}`} />
          </Button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* View Details Button */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <Link href={`/properties/${property.id}`}>
            <Button className="w-full bg-white text-royal-blue hover:bg-royal-blue hover:text-white transition-all duration-300 font-semibold">
              View Details
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        {/* Price and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-royal-blue">
            {formatPrice(property.price, property.type)}
          </h3>
          <div className="flex items-center text-warm-gold">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm text-muted-gray">{property.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-lg font-semibold text-dark-gray mb-2 line-clamp-1">
          {property.title}
        </h4>

        {/* Location */}
        <p className="text-muted-gray mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-coral" />
          {property.city}, {property.state}
        </p>

        {/* Property Details */}
        <div className="flex justify-between text-sm text-muted-gray">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.sqft.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
