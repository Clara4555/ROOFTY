import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Search, MapPin, Building, Bed, Bath } from "lucide-react";
import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@shared/schema";
import type { PropertyFilters } from "@/lib/types";

export default function Properties() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split("?")[1] || "");
    const initialFilters: PropertyFilters = {};
    
    if (urlParams.get("type")) initialFilters.type = urlParams.get("type")!;
    if (urlParams.get("propertyType")) initialFilters.propertyType = urlParams.get("propertyType")!;
    if (urlParams.get("city")) initialFilters.city = urlParams.get("city")!;
    if (urlParams.get("bedrooms")) initialFilters.bedrooms = parseInt(urlParams.get("bedrooms")!);
    if (urlParams.get("bathrooms")) initialFilters.bathrooms = parseInt(urlParams.get("bathrooms")!);
    
    setFilters(initialFilters);
  }, [location]);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.type) params.set("type", filters.type);
      if (filters.propertyType) params.set("propertyType", filters.propertyType);
      if (filters.city) params.set("city", filters.city);
      if (filters.bedrooms) params.set("bedrooms", filters.bedrooms.toString());
      if (filters.bathrooms) params.set("bathrooms", filters.bathrooms.toString());
      if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
      if (priceRange[1] < 2000000) params.set("maxPrice", priceRange[1].toString());

      const response = await fetch(`/api/properties/search?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    },
  });

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, 2000000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Property Type</Label>
        <Select value={filters.type || ""} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Property Category</Label>
        <Select value={filters.propertyType || ""} onValueChange={(value) => updateFilter("propertyType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="loft">Loft</SelectItem>
            <SelectItem value="duplex">Duplex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-gray w-4 h-4" />
          <Input
            placeholder="City or neighborhood"
            value={filters.city || ""}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">
          Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={2000000}
          min={0}
          step={50000}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Bedrooms</Label>
          <Select value={filters.bedrooms?.toString() || ""} onValueChange={(value) => updateFilter("bedrooms", value ? parseInt(value) : undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Bathrooms</Label>
          <Select value={filters.bathrooms?.toString() || ""} onValueChange={(value) => updateFilter("bathrooms", value ? parseInt(value) : undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-soft-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-dark-gray mb-4">
            Properties for Sale & Rent
          </h1>
          <p className="text-muted-gray text-lg">
            Discover your perfect home from our curated selection of premium properties.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-2xl p-6 h-fit shadow-lg">
            <h3 className="text-lg font-semibold text-dark-gray mb-6 flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </h3>
            <FilterContent />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <p className="text-muted-gray">
                  {properties.length} properties found
                </p>
                
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-dark-gray mb-6">Filters</h3>
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sort Dropdown */}
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="size">Size: Largest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Properties Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {properties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Building className="w-16 h-16 text-muted-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-dark-gray mb-2">
                  No properties found
                </h3>
                <p className="text-muted-gray mb-6">
                  Try adjusting your filters or search criteria.
                </p>
                <Button onClick={clearFilters} className="bg-royal-blue text-white">
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
