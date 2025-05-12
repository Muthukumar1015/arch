import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import MotionImage from "@/components/ui/motion-image";
import { galleryImages } from "@/lib/utils";

// Extended gallery data for the dedicated gallery page
const extendedGalleryImages = [
  ...galleryImages,
  {
    id: 9,
    alt: "Modern skyscraper with glass facade",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 10,
    alt: "Luxury residential bathroom",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 11,
    alt: "Contemporary office hallway",
    image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 12,
    alt: "Rooftop garden on urban building",
    image: "https://images.unsplash.com/photo-1533786581596-e7e075683b78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 13,
    alt: "Modern apartment building exterior",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 14,
    alt: "Minimalist living room interior",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 15,
    alt: "Green building with vertical garden",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 16,
    alt: "Modern hotel lobby design",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  }
];

// Gallery categories
const categories = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" }
];

// Assign categories to gallery items for filtering
const categorizedGallery = extendedGalleryImages.map((image, index) => {
  // Assign categories based on image ID or content
  let category = "exterior";
  if ([3, 7, 10, 14, 16].includes(image.id)) {
    category = "interior";
  } else if ([2, 5, 9, 13, 15].includes(image.id)) {
    category = "exterior";
  } else if ([4, 11, 12].includes(image.id)) {
    category = "commercial";
  } else if ([1, 6, 8].includes(image.id)) {
    category = "residential";
  }
  
  return { ...image, category };
});

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Filter gallery images based on selected category
  const filteredImages = activeFilter === "all"
    ? categorizedGallery
    : categorizedGallery.filter(image => image.category === activeFilter);
  
  // Handle image click to open lightbox
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-primary text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-heading font-bold mb-6">Design Gallery</h1>
            <p className="text-xl text-gray-300">
              A visual showcase of our architectural work and design philosophy across various projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Visual Inspiration"
            title="Architectural Showcase"
            subtitle="Browse our collection of architectural highlights demonstrating our attention to detail and design excellence."
            center
          />
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 m-2 border rounded-sm font-accent text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-secondary hover:text-white hover:border-secondary"
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="gallery-item overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(image.image)}
                >
                  <MotionImage
                    src={image.image}
                    alt={image.alt}
                    className="w-full h-64 sm:h-72"
                    hoverEffect
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <SectionHeading
                label="Design Philosophy"
                title="Our Approach to Architecture"
                className="text-left mb-6"
                light
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-300 mb-6">
                  At DD Architecture, we believe that exceptional architecture exists at the intersection of art, science, and human experience. Our design philosophy is rooted in creating spaces that not only look beautiful but also function seamlessly and evoke emotional responses.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Every project begins with a deep understanding of the site, context, and client needs. We draw inspiration from both natural and cultural elements, seeking to create designs that are timeless yet innovative, respecting traditions while embracing modern technologies.
                </p>
                
                <p className="text-gray-300 mb-6">
                  Our commitment to sustainability is integrated throughout our design process, ensuring that our buildings not only serve their inhabitants but also respect and enhance the natural environment for generations to come.
                </p>
                
                <div className="space-y-4">
                  {designPrinciples.map((principle, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                        <principle.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold mb-1">{principle.title}</h4>
                        <p className="text-gray-400 text-sm">{principle.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="lg:w-1/2 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <MotionImage 
                  src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500" 
                  alt="Architect at work" 
                  className="rounded-lg mb-4" 
                />
                <MotionImage 
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                  alt="Modern architectural detail" 
                  className="rounded-lg" 
                />
              </div>
              <div className="mt-8">
                <MotionImage 
                  src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" 
                  alt="Building model" 
                  className="rounded-lg mb-4" 
                />
                <MotionImage 
                  src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500" 
                  alt="Architectural drawing" 
                  className="rounded-lg" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[90vh]"
            >
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Design principles
import { Sun, UserCheck, Landmark, Leaf, ArrowUpRight } from "lucide-react";

const designPrinciples = [
  {
    title: "Contextual Harmony",
    description: "Creating architecture that respects and responds to its surrounding environment, both built and natural.",
    icon: Landmark
  },
  {
    title: "Human-Centered Design",
    description: "Prioritizing the experience and well-being of the people who will inhabit and use the spaces we create.",
    icon: UserCheck
  },
  {
    title: "Environmental Responsibility",
    description: "Designing with ecological sensitivity and minimizing the environmental footprint of our buildings.",
    icon: Leaf
  },
  {
    title: "Light & Space",
    description: "Masterful use of natural light and thoughtful spatial organization to create uplifting environments.",
    icon: Sun
  },
  {
    title: "Forward-Thinking Innovation",
    description: "Embracing new technologies and approaches while maintaining timeless design principles.",
    icon: ArrowUpRight
  }
];
