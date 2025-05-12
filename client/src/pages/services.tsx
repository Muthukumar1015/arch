import { motion } from "framer-motion";
import { Link } from "wouter";
import SectionHeading from "@/components/ui/section-heading";
import { ThemedButton } from "@/components/ui/themed-button";
import MotionImage from "@/components/ui/motion-image";
import { services } from "@/lib/utils";
import { Check } from "lucide-react";

export default function Services() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
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
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-heading font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive architectural solutions tailored to your unique vision and requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Offer"
            title="Comprehensive Architectural Services"
            subtitle="From initial concept to final construction, we provide end-to-end architectural solutions for projects of all scales."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="relative h-60 overflow-hidden">
                    <MotionImage 
                      src={serviceImages[index]} 
                      alt={service.title}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          {service.icon === "home-4" && (
                            <>
                              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                              <polyline points="9 22 9 12 15 12 15 22"/>
                            </>
                          )}
                          {service.icon === "building-2" && (
                            <>
                              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                              <path d="M10 6h4"/>
                              <path d="M10 10h4"/>
                              <path d="M10 14h4"/>
                              <path d="M10 18h4"/>
                            </>
                          )}
                          {service.icon === "layout" && (
                            <>
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                              <line x1="3" x2="21" y1="9" y2="9"/>
                              <line x1="9" x2="9" y1="21" y2="9"/>
                            </>
                          )}
                          {service.icon === "landscape" && (
                            <>
                              <circle cx="6" cy="6" r="3"/>
                              <path d="M6 9v12"/>
                              <path d="M13 6h8"/>
                              <path d="M13 12h8"/>
                              <path d="M13 18h8"/>
                            </>
                          )}
                          {service.icon === "plant" && (
                            <>
                              <path d="M11 18a5 5 0 0 1-5-5v-1a5.001 5.001 0 0 1 5-5 5 5 0 0 1 5 5v6"/>
                              <path d="M11 7V4"/>
                              <rect width="8" height="5" x="3" y="15" rx="1"/>
                              <path d="M16 21a5.001 5.001 0 0 1-5-5"/>
                              <path d="M22 21a5 5 0 0 0-8.9-3.1"/>
                              <path d="M19 22v-3"/>
                              <path d="M22 19h-6"/>
                            </>
                          )}
                          {service.icon === "pencil-ruler-2" && (
                            <>
                              <path d="m3 22 6-6"/>
                              <path d="M10 13 13 10"/>
                              <path d="m16 2 6 6"/>
                              <path d="M4.9 15.1 15.2 4.8"/>
                              <path d="m8.6 18.7 7.1-7"/>
                              <path d="m2 22 3-3"/>
                              <path d="M18 22 21 19"/>
                              <path d="m15 16 3-3 3 3-3 3-3-3Z"/>
                            </>
                          )}
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {serviceFeatures[service.id].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={18} className="text-secondary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="px-6 pb-6 mt-auto">
                    <Link href="/booking">
                      <a className="inline-flex items-center text-secondary font-accent font-medium hover:underline">
                        Request this service 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Our Process"
            title="How We Work With You"
            subtitle="Our collaborative design approach ensures your vision is realized at every stage of the project."
            center
            light
          />
          
          <div className="relative mt-20">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-secondary hidden md:block"></div>
            
            {designProcess.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-20 last:mb-0"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 order-1 md:order-2'}`}>
                    <MotionImage 
                      src={step.image} 
                      alt={step.title}
                      className="rounded-lg shadow-xl mb-6 md:mb-0"
                    />
                  </div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-16 order-1 md:order-2' : 'md:pr-16 md:text-right'}`}>
                    <div className="bg-dark bg-opacity-50 p-8 rounded-lg">
                      <div className="flex items-center mb-4 justify-start md:justify-center">
                        <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-xl">
                          {index + 1}
                        </div>
                        <h3 className="text-2xl font-heading font-bold ml-4">{step.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.points.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check size={16} className="text-secondary mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Center point for timeline */}
                  <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 hidden md:block">
                    <div className="w-8 h-8 rounded-full bg-secondary border-4 border-primary"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Client Feedback"
            title="What Our Clients Say"
            subtitle="Hear from the clients who have trusted us with their architectural projects."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="text-secondary text-5xl leading-none">"</div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <MotionImage 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e0c080" className="ml-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-heading font-bold mb-6"
            >
              Ready to Begin Your Project?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Schedule a consultation with our expert architects to discuss your vision and how we can bring it to life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/booking">
                <ThemedButton variant="primary" size="lg">
                  Book a Consultation
                </ThemedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Service images
const serviceImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Residential
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Commercial
  "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Interior
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Urban
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Sustainable
  "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"  // Renovation
];

// Service features
const serviceFeatures = {
  residential: [
    "Custom home design & planning",
    "Renovation & extension design",
    "Multi-family & apartment complexes",
    "Luxury villa & estate architecture",
    "3D visualization & virtual walkthroughs"
  ],
  commercial: [
    "Office & corporate headquarters design",
    "Retail & restaurant architecture",
    "Mixed-use development planning",
    "Hospitality & hotel design",
    "Commercial space optimization"
  ],
  interior: [
    "Full interior design services",
    "Custom furniture design",
    "Material & color consultation",
    "Lighting design & planning",
    "Space planning & layout optimization"
  ],
  urban: [
    "Master planning for communities",
    "Public space & plaza design",
    "Transit-oriented development",
    "Adaptive reuse strategies",
    "Sustainable urban development"
  ],
  sustainable: [
    "Passive solar design",
    "Green roof & wall systems",
    "Energy efficiency optimization",
    "Sustainable material specification",
    "Rainwater harvesting & management"
  ],
  renovation: [
    "Historical building restoration",
    "Adaptive reuse of existing structures",
    "Building extension & addition design",
    "Structural renovation consultation",
    "Heritage conservation solutions"
  ]
};

// Design process steps
const designProcess = [
  {
    id: 1,
    title: "Consultation & Brief",
    description: "We begin by understanding your vision, requirements, and constraints through in-depth discussions.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    points: [
      "Initial client meeting to discuss project goals",
      "Site analysis and evaluation",
      "Budget and timeline assessment",
      "Development of detailed project brief"
    ]
  },
  {
    id: 2,
    title: "Concept Development",
    description: "Our team creates initial design concepts that align with your goals and respond to site conditions.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    points: [
      "Exploration of multiple design directions",
      "Preliminary sketches and 3D models",
      "Material and aesthetic considerations",
      "Concept presentation and client feedback"
    ]
  },
  {
    id: 3,
    title: "Design Development",
    description: "We refine the chosen concept into detailed architectural designs with technical specifications.",
    image: "https://images.unsplash.com/photo-1574602903947-b801602c4878?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    points: [
      "Detailed floor plans and elevations",
      "Material and finish specifications",
      "Structural and systems integration",
      "3D visualization and virtual walkthroughs"
    ]
  },
  {
    id: 4,
    title: "Documentation & Approvals",
    description: "We prepare comprehensive construction documents and manage regulatory approvals.",
    image: "https://images.unsplash.com/photo-1580332449086-43d6ab233610?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    points: [
      "Construction drawings and specifications",
      "Building permit application assistance",
      "Coordination with regulatory authorities",
      "Contractor bidding and selection support"
    ]
  },
  {
    id: 5,
    title: "Construction & Oversight",
    description: "We provide site supervision and quality control to ensure your project is built to specification.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    points: [
      "Regular site visits and construction oversight",
      "Quality control and problem-solving",
      "Coordination with contractors and suppliers",
      "Timeline and budget monitoring"
    ]
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "DD Architecture transformed our vision into a stunning reality. Their attention to detail and commitment to understanding our needs resulted in a home that exceeds all our expectations.",
    name: "Rajesh Mehta",
    role: "Residential Client",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 2,
    quote: "Working with DD Architecture on our corporate headquarters was an exceptional experience. Their innovative approach to commercial design has created a workspace that enhances productivity and reflects our brand identity.",
    name: "Ananya Sharma",
    role: "CEO, TechSphere Solutions",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: 3,
    quote: "The renovation of our heritage property required special sensitivity and expertise. DD Architecture delivered beyond our expectations, preserving historical elements while introducing modern functionality.",
    name: "Vikram Sundaram",
    role: "Heritage Property Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];
