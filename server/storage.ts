import { users, properties, testimonials, type User, type InsertUser, type Property, type InsertProperty, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Properties
  getProperty(id: number): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  searchProperties(filters: {
    type?: string;
    propertyType?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;

  // Testimonials
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentTestimonialId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample properties
    const sampleProperties: Omit<Property, 'id'>[] = [
      {
        title: "Modern Villa with Pool",
        description: "Stunning modern villa featuring contemporary architecture, spacious interiors, and a beautiful swimming pool. Perfect for luxury living with high-end finishes throughout.",
        price: "849000",
        type: "sale",
        propertyType: "villa",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2850,
        address: "123 Beverly Hills Drive",
        city: "Beverly Hills",
        state: "CA",
        zipCode: "90210",
        latitude: "34.0736",
        longitude: "-118.4004",
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Swimming Pool", "Garage", "Garden", "Security System", "Air Conditioning"],
        features: ["Modern Kitchen", "Walk-in Closet", "Fireplace", "Hardwood Floors"],
        yearBuilt: 2020,
        parking: 2,
        isActive: true,
        isFeatured: true,
        rating: "4.9",
        agentName: "Sarah Johnson",
        agentPhone: "+1 (555) 123-4567",
        agentEmail: "sarah@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Downtown Luxury Apartment",
        description: "Sophisticated apartment in the heart of Manhattan with breathtaking city views. Features modern amenities and premium finishes in a prime location.",
        price: "4200",
        type: "rent",
        propertyType: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        address: "456 Manhattan Avenue",
        city: "Manhattan",
        state: "NY",
        zipCode: "10001",
        latitude: "40.7505",
        longitude: "-73.9934",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Gym", "Concierge", "Rooftop Terrace", "Pet Friendly"],
        features: ["City Views", "Modern Kitchen", "In-unit Laundry"],
        yearBuilt: 2018,
        parking: 1,
        isActive: true,
        isFeatured: true,
        rating: "4.8",
        agentName: "Michael Chen",
        agentPhone: "+1 (555) 234-5678",
        agentEmail: "michael@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Family Home with Garden",
        description: "Charming family home with a beautiful garden, perfect for raising children. Features spacious rooms and a quiet neighborhood setting.",
        price: "625000",
        type: "sale",
        propertyType: "house",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2100,
        address: "789 Austin Street",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        latitude: "30.2672",
        longitude: "-97.7431",
        images: [
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Garden", "Garage", "Basement", "Patio"],
        features: ["Updated Kitchen", "Hardwood Floors", "Bay Windows"],
        yearBuilt: 2015,
        parking: 2,
        isActive: true,
        isFeatured: true,
        rating: "4.7",
        agentName: "Emily Rodriguez",
        agentPhone: "+1 (555) 345-6789",
        agentEmail: "emily@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Penthouse with City Views",
        description: "Luxurious penthouse offering panoramic city views and premium amenities. The epitome of sophisticated urban living.",
        price: "6800",
        type: "rent",
        propertyType: "condo",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2400,
        address: "321 Miami Beach Drive",
        city: "Miami",
        state: "FL",
        zipCode: "33139",
        latitude: "25.7617",
        longitude: "-80.1918",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Ocean View", "Pool", "Gym", "Valet Parking", "24/7 Security"],
        features: ["Floor-to-ceiling Windows", "Private Balcony", "Premium Appliances"],
        yearBuilt: 2019,
        parking: 2,
        isActive: true,
        isFeatured: true,
        rating: "5.0",
        agentName: "David Wilson",
        agentPhone: "+1 (555) 456-7890",
        agentEmail: "david@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cozy Cottage Retreat",
        description: "Charming cottage-style home with rustic appeal and modern comforts. Perfect for those seeking a peaceful retreat.",
        price: "485000",
        type: "sale",
        propertyType: "house",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1800,
        address: "654 Portland Avenue",
        city: "Portland",
        state: "OR",
        zipCode: "97201",
        latitude: "45.5152",
        longitude: "-122.6784",
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Garden", "Fireplace", "Patio", "Storage Shed"],
        features: ["Cottage Style", "Updated Kitchen", "Cozy Interior"],
        yearBuilt: 2010,
        parking: 1,
        isActive: true,
        isFeatured: true,
        rating: "4.6",
        agentName: "Lisa Anderson",
        agentPhone: "+1 (555) 567-8901",
        agentEmail: "lisa@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Minimalist Modern Home",
        description: "Sleek modern home with clean lines and minimalist design. Features the latest in smart home technology and energy efficiency.",
        price: "920000",
        type: "sale",
        propertyType: "house",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        address: "987 Seattle Drive",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        latitude: "47.6062",
        longitude: "-122.3321",
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        amenities: ["Smart Home", "Solar Panels", "Electric Car Charging", "Modern Kitchen"],
        features: ["Minimalist Design", "Large Windows", "Open Floor Plan"],
        yearBuilt: 2021,
        parking: 2,
        isActive: true,
        isFeatured: true,
        rating: "4.9",
        agentName: "Robert Kim",
        agentPhone: "+1 (555) 678-9012",
        agentEmail: "robert@roofty.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    sampleProperties.forEach(property => {
      const id = this.currentPropertyId++;
      this.properties.set(id, { ...property, id });
    });

    // Sample testimonials
    const sampleTestimonials: Omit<Testimonial, 'id'>[] = [
      {
        name: "Sarah Johnson",
        location: "Beverly Hills, CA",
        rating: 5,
        comment: "Roofty made finding our dream home incredibly easy. The platform is intuitive, and their team provided exceptional support throughout the entire process.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Michael Chen",
        location: "Austin, TX",
        rating: 5,
        comment: "The financing options and agent connections were game-changers. We secured our mortgage at an excellent rate and closed in record time.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
        createdAt: new Date(),
      },
      {
        name: "Emily Rodriguez",
        location: "Miami, FL",
        rating: 5,
        comment: "As first-time buyers, we were overwhelmed, but Roofty's team guided us every step of the way. Couldn't be happier with our new home!",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
        createdAt: new Date(),
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.isActive);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.isActive && p.isFeatured);
  }

  async searchProperties(filters: {
    type?: string;
    propertyType?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Property[]> {
    let results = Array.from(this.properties.values()).filter(p => p.isActive);

    if (filters.type) {
      results = results.filter(p => p.type === filters.type);
    }
    if (filters.propertyType) {
      results = results.filter(p => p.propertyType === filters.propertyType);
    }
    if (filters.city) {
      results = results.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters.minPrice) {
      results = results.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      results = results.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }
    if (filters.bedrooms) {
      results = results.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    if (filters.bathrooms) {
      results = results.filter(p => p.bathrooms >= filters.bathrooms!);
    }

    return results;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const newProperty: Property = {
      ...property,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;

    const updated: Property = {
      ...existing,
      ...property,
      updatedAt: new Date(),
    };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Testimonial methods
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.isActive);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();
