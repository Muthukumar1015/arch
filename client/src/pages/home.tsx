import { Link } from "wouter";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ThemedButton } from "@/components/ui/themed-button";
import { ChevronDown } from "lucide-react";
import MotionImage from "@/components/ui/motion-image";
import { services, projects, galleryImages, teamMembers, blogPosts } from "@/lib/utils";
import AnimatedText from "@/components/ui/animated-text";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  // State for project filtering
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter projects based on selected category
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <MotionImage 
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Modern architectural building" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <AnimatedText 
            text="Transforming Spaces Into Extraordinary Experiences"
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight"
            accent={true}
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white mb-8 max-w-3xl mx-auto"
          >
            Award-winning architectural design firm in Chennai creating innovative, sustainable, and beautiful spaces.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/booking">
              <ThemedButton variant="primary">
                Book a Consultation
              </ThemedButton>
            </Link>
            <Link href="/projects">
              <ThemedButton variant="secondary">
                Explore Our Work
              </ThemedButton>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <Link href="#about">
            <a className="text-white animate-bounce">
              <ChevronDown size={36} />
            </a>
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <SectionHeading
                label="About Us"
                title="Crafting Architectural Excellence Since 2005"
                className="text-left mb-6"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-700 mb-6"
              >
                DD Architecture is a premier architectural firm based in Chennai, dedicated to creating spaces that inspire, 
                function flawlessly, and stand as testaments to innovative design. Our multidisciplinary team brings together 
                expertise in architecture, interior design, urban planning, and sustainable development.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-700 mb-8"
              >
                With each project, we strive to balance aesthetic vision with practical functionality, 
                environmental responsibility, and client objectives. Our award-winning designs span residential, 
                commercial, institutional, and public spaces across Tamil Nadu and beyond.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6 mb-8"
              >
                <div className="flex items-start">
                  <div className="text-secondary text-2xl mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Award Winning</h3>
                    <p className="text-sm text-gray-600">Multiple national design awards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-secondary text-2xl mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">200+ Projects</h3>
                    <p className="text-sm text-gray-600">Completed across India</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-secondary text-2xl mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Expert Team</h3>
                    <p className="text-sm text-gray-600">30+ skilled professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-secondary text-2xl mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.786 1.786 0 0 1 11.985 3a1.796 1.796 0 0 1 1.547.919l3.724 6.709"/><path d="m17.693 5.291 1.457-2.529A1.833 1.833 0 0 1 20.782 2a1.85 1.85 0 0 1 1.642.979 1.817 1.817 0 0 1-.031 1.748l-1.013 1.758"/></svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg">Sustainable Design</h3>
                    <p className="text-sm text-gray-600">Eco-friendly approaches</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link href="/about">
                  <a className="inline-flex items-center text-secondary font-accent font-medium hover:underline">
                    Learn more about our story 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:w-1/2 order-1 lg:order-2 relative"
            >
              <MotionImage 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                alt="Interior design of modern office" 
                className="w-full h-auto rounded-lg shadow-xl" 
              />
              <MotionImage 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Architectural blueprint" 
                className="absolute -bottom-10 -left-10 w-2/5 rounded-lg shadow-xl border-8 border-white hidden md:block" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Offer"
            title="Our Architectural Services"
            subtitle="We provide comprehensive architectural services tailored to meet the unique needs and vision of each client."
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark bg-opacity-50 p-8 rounded-lg transition-all duration-300 hover:transform hover:scale-105 hover:bg-secondary hover:text-primary group"
              >
                <div className="mb-4 text-secondary group-hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-800 mb-4">
                  {service.description}
                </p>
                <Link href="/services">
                  <a className="inline-flex items-center text-secondary group-hover:text-primary font-accent text-sm font-medium hover:underline">
                    Learn more 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Our Portfolio"
            title="Featured Projects"
            subtitle="Explore our diverse portfolio of architectural projects spanning residential, commercial, and public spaces."
            center
          />
          
          <div className="flex flex-wrap justify-center mb-8">
            {["all", "residential", "commercial", "public", "interior"].map((filter) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "project-filter px-4 py-2 m-2 border rounded-sm font-accent text-sm font-medium transition-colors",
                  activeFilter === filter
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-secondary hover:text-white hover:border-secondary"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                {filter === "all" && " Projects"}
              </motion.button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card relative overflow-hidden rounded-lg group"
              >
                <MotionImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80"
                  hoverEffect
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <Link href="/projects">
                    <a className="inline-flex items-center text-secondary font-accent text-sm font-medium hover:underline">
                      View Project 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <ThemedButton className="bg-primary hover:bg-secondary">
                View All Projects
              </ThemedButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Section - Brief Preview */}
      <section id="gallery-preview" className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Visual Inspiration"
            title="Our Design Gallery"
            subtitle="A curated collection of architectural highlights showcasing our design philosophy and attention to detail."
            center
            light
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="gallery-item overflow-hidden rounded-lg cursor-pointer"
              >
                <MotionImage
                  src={image.image}
                  alt={image.alt}
                  className="w-full h-64"
                  hoverEffect
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/gallery">
              <ThemedButton className="bg-secondary text-primary hover:bg-white">
                Explore Full Gallery
              </ThemedButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Team Section - Brief Preview */}
      <section id="team-preview" className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Our Experts"
            title="Meet Our Team"
            subtitle="Our talented team of architects and designers brings diverse expertise and passion to every project."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.slice(0, 4).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="team-member text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg group">
                  <MotionImage
                    src={member.image}
                    alt={`Team member - ${member.role}`}
                    className="w-full h-80"
                  />
                  <div className="absolute inset-0 bg-secondary bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a href={member.social.linkedin} className="text-primary hover:text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/></svg>
                      </a>
                      <a href={member.social.twitter} className="text-primary hover:text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"/></svg>
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-primary hover:text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold">{member.name}</h3>
                <p className="text-secondary font-accent">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/team">
              <ThemedButton className="bg-primary text-white hover:bg-secondary">
                Meet the Full Team
              </ThemedButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section id="blog-preview" className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="News & Insights"
            title="Our Latest Articles"
            subtitle="Stay updated with architectural trends, project insights, and design inspiration from our team."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="blog-card bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-60">
                  <MotionImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 bg-secondary text-primary px-4 py-2 font-accent text-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                    <span className="mx-2">|</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {post.author}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <Link href="/blog">
                    <a className="inline-flex items-center text-secondary font-accent font-medium hover:underline">
                      Read More 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                      </svg>
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/blog">
              <ThemedButton className="bg-primary text-white hover:bg-secondary">
                View All Articles
              </ThemedButton>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-heading font-bold mb-6"
            >
              Ready to Transform Your Space?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl mb-8"
            >
              Book a consultation with our expert architects and begin your journey towards exceptional design.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/booking">
                <ThemedButton variant="primary" size="lg">
                  Schedule Your Consultation
                </ThemedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
