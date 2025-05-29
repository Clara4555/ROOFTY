import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-soft-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Rating */}
      <div className="flex items-center mb-6">
        <div className="flex text-warm-gold mr-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <span className="text-sm text-muted-gray">{testimonial.rating}.0</span>
      </div>

      {/* Comment */}
      <p className="text-muted-gray mb-6 leading-relaxed">
        "{testimonial.comment}"
      </p>

      {/* User Info */}
      <div className="flex items-center">
        <img
          src={testimonial.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
          alt={`${testimonial.name} testimonial`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-dark-gray">{testimonial.name}</h4>
          <p className="text-sm text-muted-gray">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}
