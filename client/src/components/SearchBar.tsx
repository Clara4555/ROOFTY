import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Key, MapPin, Building, DollarSign, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchFormData } from "@/lib/types";

interface SearchBarProps {
  onSearch?: (data: SearchFormData) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = "" }: SearchBarProps) {
  const [, setLocation] = useLocation();
  const [searchType, setSearchType] = useState<"buy" | "rent">("buy");
  const [formData, setFormData] = useState<SearchFormData>({
    location: "",
    propertyType: "",
    priceRange: "",
    type: "sale",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchData = {
      ...formData,
      type: searchType === "buy" ? "sale" : "rent",
    };

    if (onSearch) {
      onSearch(searchData);
    } else {
      // Navigate to properties page with search params
      const params = new URLSearchParams();
      if (searchData.location) params.set("city", searchData.location);
      if (searchData.propertyType) params.set("propertyType", searchData.propertyType);
      if (searchData.type) params.set("type", searchData.type);
      
      setLocation(`/properties?${params.toString()}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto ${className}`}>
      {/* Search Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-light-gray rounded-lg p-1 flex">
          <Button
            type="button"
            variant={searchType === "buy" ? "default" : "ghost"}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
              searchType === "buy" 
                ? "bg-royal-blue text-white" 
                : "text-muted-gray hover:text-royal-blue"
            }`}
            onClick={() => setSearchType("buy")}
          >
            <Home className="w-4 h-4 mr-2" />
            Buy
          </Button>
          <Button
            type="button"
            variant={searchType === "rent" ? "default" : "ghost"}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
              searchType === "rent" 
                ? "bg-royal-blue text-white" 
                : "text-muted-gray hover:text-royal-blue"
            }`}
            onClick={() => setSearchType("rent")}
          >
            <Key className="w-4 h-4 mr-2" />
            Rent
          </Button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-gray mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-gray w-4 h-4" />
            <Input
              type="text"
              placeholder="City, neighborhood..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-gray mb-2">Property Type</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-gray w-4 h-4 z-10" />
            <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
              <SelectTrigger className="pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-gray mb-2">Price Range</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-gray w-4 h-4 z-10" />
            <Select value={formData.priceRange} onValueChange={(value) => setFormData({ ...formData, priceRange: value })}>
              <SelectTrigger className="pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all duration-300">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="100000-300000">$100k - $300k</SelectItem>
                <SelectItem value="300000-500000">$300k - $500k</SelectItem>
                <SelectItem value="500000-1000000">$500k - $1M</SelectItem>
                <SelectItem value="1000000+">$1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="relative">
          <label className="block text-sm font-medium text-muted-gray mb-2">&nbsp;</label>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-royal-blue to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
}
