import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import MotionImage from "@/components/ui/motion-image";
import { projects, projectCategories } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

// Extended project data for the projects page
const extendedProjects = [
  ...projects,
  {
    id: 7,
    title: "Metro Art Station",
    category: "public",
    description: "Public transit station that integrates local art installations and creates a cultural touchpoint for commuters.",
    image: "https://images.unsplash.com/photo-1528913303698-272d0d4f3f06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 8,
    title: "Beachfront Villa",
    category: "residential",
    description: "Luxury beachfront home that blends indoor and outdoor living with panoramic ocean views.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 9,
    title: "Tech Hub Offices",
    category: "commercial",
    description: "Innovative workspace for a technology startup featuring flexible collaboration areas and biophilic design.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 10,
    title: "Urban Loft Conversion",
    category: "interior",
    description: "Transformation of an industrial warehouse into a modern residential loft with preserved historical elements.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 11,
    title: "Wellness Center",
    category: "commercial",
    description: "Holistic health facility designed to promote well-being through thoughtful spatial organization and natural elements.",
    image: "https://images.unsplash.com/photo-1545350536-645c906e65b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 12,
    title: "Community Library",
    category: "public",
    description: "Modern public library with multi-functional spaces for learning, community gatherings, and digital access.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

// Project details for modal view
const projectDetails = {
  1: {
    title: "Harmony Residences",
    location: "Chennai, Tamil Nadu",
    year: "2020",
    size: "45,000 sq ft",
    scope: "Architectural Design, Interior Design, Landscape Design",
    description: "Harmony Residences is a contemporary residential complex designed to blend modern architectural elements with traditional Tamil influences. The project features 24 luxury apartments arranged around a central courtyard that serves as a community gathering space.\n\nThe design prioritizes natural ventilation and daylight, with strategically placed windows and balconies that maximize airflow while providing privacy. Sustainable features include rainwater harvesting systems, solar panels, and locally sourced materials.\n\nInterior spaces are designed with flexibility in mind, allowing residents to adapt their living spaces to changing needs. The project also includes shared amenities such as a swimming pool, fitness center, and rooftop garden.",
    challenge: "Balancing the density requirements of urban living with the need for private, comfortable spaces in a tropical climate.",
    solution: "The stepped building form creates private terraces while the central courtyard provides a shared outdoor space. Cross-ventilation strategies minimize reliance on mechanical cooling.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1574873215043-44119461cb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ]
  },
  2: {
    title: "Skyline Corporate Tower",
    location: "Chennai Business District",
    year: "2019",
    size: "120,000 sq ft",
    scope: "Architectural Design, Interior Space Planning, Sustainable Systems Integration",
    description: "Skyline Corporate Tower is a 15-story office building that serves as the headquarters for multiple technology and finance companies. The building features a distinctive glass facade with integrated solar shading devices that respond to the building's orientation.\n\nThe interior spaces are organized around a central atrium that brings natural light deep into the building and serves as a social hub. Each floor offers flexible office layouts that can be configured for open plan or private offices.\n\nThe project achieved LEED Gold certification through its energy-efficient systems, water conservation measures, and sustainable material selections. The rooftop features a garden and solar panels that contribute to the building's energy needs.",
    challenge: "Creating a landmark corporate building that balances iconic design with practical workplace functionality and sustainability goals.",
    solution: "The dynamic facade responds to solar orientation while creating a distinctive visual identity. Interior spaces balance collaboration and privacy needs, while integrated systems minimize environmental impact.",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ]
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Filter projects based on selected category
  const filteredProjects = activeFilter === "all" 
    ? extendedProjects 
    : extendedProjects.filter(project => project.category === activeFilter);

  // Handle project click to open modal
  const openProjectDetails = (id: number) => {
    setSelectedProject(id);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
    setActiveImage(0); // Reset active image
  };

  // Get project details for the selected project
  const getProjectDetails = (id: number) => {
    return projectDetails[id as keyof typeof projectDetails] || null;
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
            <h1 className="text-5xl font-heading font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-300">
              Explore our diverse portfolio of architectural projects spanning residential, commercial, and public spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            subtitle="Browse our architectural works across various categories and scales."
            center
          />
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center mb-12">
            {projectCategories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "px-4 py-2 m-2 border rounded-sm font-accent text-sm font-medium transition-colors",
                  activeFilter === category.id
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-secondary hover:text-white hover:border-secondary"
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="project-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                  onClick={() => openProjectDetails(project.id)}
                >
                  <MotionImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80"
                    hoverEffect
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 text-xs font-accent uppercase rounded-sm">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="inline-flex items-center text-secondary font-accent text-sm font-medium">
                      View Project Details <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project details modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-75"
              onClick={closeProjectDetails}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 z-10"
                onClick={closeProjectDetails}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
              
              {selectedProject && getProjectDetails(selectedProject) ? (
                <div className="p-0">
                  {/* Image gallery */}
                  <div className="relative h-72 md:h-96">
                    <MotionImage
                      src={getProjectDetails(selectedProject)?.images[activeImage] || ""}
                      alt={getProjectDetails(selectedProject)?.title || ""}
                      className="w-full h-full rounded-t-lg"
                    />
                    
                    {/* Navigation arrows */}
                    {getProjectDetails(selectedProject)?.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(prev => 
                              prev === 0 
                                ? (getProjectDetails(selectedProject)?.images.length || 1) - 1 
                                : prev - 1
                            );
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"/>
                          </svg>
                        </button>
                        <button
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(prev => 
                              prev === (getProjectDetails(selectedProject)?.images.length || 1) - 1 
                                ? 0 
                                : prev + 1
                            );
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {getProjectDetails(selectedProject)?.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-secondary' : 'bg-white bg-opacity-50'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(index);
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project details content */}
                  <div className="p-6 md:p-8">
                    <h2 className="text-3xl font-heading font-bold mb-4">
                      {getProjectDetails(selectedProject)?.title}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                        <p className="font-medium">{getProjectDetails(selectedProject)?.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Year</h4>
                        <p className="font-medium">{getProjectDetails(selectedProject)?.year}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Size</h4>
                        <p className="font-medium">{getProjectDetails(selectedProject)?.size}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-heading font-bold text-lg mb-3">Project Scope</h4>
                      <p className="text-gray-700">{getProjectDetails(selectedProject)?.scope}</p>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="font-heading font-bold text-lg mb-3">Project Description</h4>
                      {getProjectDetails(selectedProject)?.description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-heading font-bold text-lg mb-3">Challenge</h4>
                        <p className="text-gray-700">{getProjectDetails(selectedProject)?.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-lg mb-3">Solution</h4>
                        <p className="text-gray-700">{getProjectDetails(selectedProject)?.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p>Project details not available</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
