import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import MotionImage from "@/components/ui/motion-image";
import { teamMembers } from "@/lib/utils";
import { Linkedin, Twitter, Mail } from "lucide-react";

// Extended team data for the dedicated team page
const extendedTeamMembers = [
  ...teamMembers,
  {
    id: 5,
    name: "Vikram Singh",
    role: "Urban Planning Specialist",
    bio: "With a background in urban design and planning, Vikram specializes in creating sustainable community spaces and master plans.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "vikram@ddarchitecture.com"
    }
  },
  {
    id: 6,
    name: "Lakshmi Venkatesh",
    role: "Sustainable Design Expert",
    bio: "Leading our green initiatives, Lakshmi brings expertise in sustainable design principles and environmental certifications to all projects.",
    image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "lakshmi@ddarchitecture.com"
    }
  },
  {
    id: 7,
    name: "Rohan Patel",
    role: "Technical Director",
    bio: "Supervising the technical aspects of projects, Rohan ensures seamless integration of design vision with engineering requirements.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rohan@ddarchitecture.com"
    }
  },
  {
    id: 8,
    name: "Tanya Sharma",
    role: "Client Relations Manager",
    bio: "Tanya oversees client communications and ensures that project objectives and client expectations are consistently met.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "tanya@ddarchitecture.com"
    }
  }
];

export default function Team() {
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
            <h1 className="text-5xl font-heading font-bold mb-6">Our Team</h1>
            <p className="text-xl text-gray-300">
              Meet the talented professionals behind DD Architecture's exceptional designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Leadership"
            title="Meet Our Directors"
            subtitle="Our founding partners who guide the vision and direction of DD Architecture."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            {extendedTeamMembers.slice(0, 2).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="relative md:w-1/3">
                  <MotionImage 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-heading font-bold mb-1">{member.name}</h3>
                  <p className="text-secondary font-accent mb-4">{member.role}</p>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <p className="text-gray-700 mb-4">
                      {member.bio}
                    </p>
                    <p className="text-gray-700">
                      {leadershipBios[index]}
                    </p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Expertise"
            title="Our Core Team"
            subtitle="The talented professionals who bring creativity, technical expertise, and passion to every project."
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {extendedTeamMembers.slice(2).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary bg-opacity-50 rounded-lg overflow-hidden"
              >
                <div className="relative overflow-hidden group">
                  <MotionImage 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-secondary bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a href={member.social.linkedin} className="text-primary hover:text-dark transition-colors">
                        <Linkedin size={24} />
                      </a>
                      <a href={member.social.twitter} className="text-primary hover:text-dark transition-colors">
                        <Twitter size={24} />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-primary hover:text-dark transition-colors">
                        <Mail size={24} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold">{member.name}</h3>
                  <p className="text-secondary font-accent mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Culture */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                label="Our Culture"
                title="How We Work Together"
                className="text-left mb-6"
              />
              
              <p className="text-gray-700 mb-6">
                At DD Architecture, we foster a collaborative environment where creativity thrives and innovation is encouraged. Our studio culture is built on open communication, mutual respect, and a shared passion for exceptional design.
              </p>
              
              <p className="text-gray-700 mb-8">
                We believe that diverse perspectives lead to stronger design solutions, and we actively cultivate a team with varied backgrounds, experiences, and specialties. Regular design critiques, knowledge-sharing sessions, and professional development opportunities ensure continuous growth for every team member.
              </p>
              
              <div className="space-y-6">
                {cultureValues.map((value, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      <value.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-bold mb-1">{value.title}</h4>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <MotionImage 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Team collaboration session" 
                  className="rounded-lg shadow-xl mb-4" 
                />
                <MotionImage 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Design studio workspace" 
                  className="rounded-lg shadow-xl" 
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-xl hidden md:block">
                  <p className="text-gray-700 italic">
                    "We don't just build structures, we build relationships - with our clients, our communities, and each other."
                  </p>
                  <p className="text-right font-medium mt-3">— Deepak Sharma, Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              label="Careers"
              title="Join Our Team"
              subtitle="We're always looking for talented individuals who are passionate about architecture and design."
              center
              light
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-dark bg-opacity-50 p-8 rounded-lg"
            >
              <h3 className="text-xl font-heading font-bold mb-6">Current Openings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {openPositions.map((position, index) => (
                  <div key={index} className="border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-secondary hover:bg-black hover:bg-opacity-30">
                    <h4 className="text-lg font-heading font-bold mb-2">{position.title}</h4>
                    <p className="text-gray-300 mb-4">{position.description}</p>
                    <div className="flex items-center text-secondary text-sm">
                      <span className="mr-4">{position.type}</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-300 mb-8">
                Don't see a position that matches your skills? We're always interested in hearing from exceptional candidates.
                Send your portfolio and resume to <a href="mailto:careers@ddarchitecture.com" className="text-secondary hover:underline">careers@ddarchitecture.com</a>
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:careers@ddarchitecture.com" className="px-8 py-3 bg-secondary text-primary font-accent font-medium rounded-sm hover:bg-white transition-colors">
                  Apply Now
                </a>
                <a href="/contact" className="px-8 py-3 border-2 border-white text-white font-accent font-medium rounded-sm hover:bg-white hover:text-primary transition-colors">
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Leadership extended bios
const leadershipBios = [
  "With over two decades of experience in architecture, Deepak founded DD Architecture in 2005 with a vision to create spaces that inspire and endure. His design philosophy combines innovation with cultural sensitivity, resulting in buildings that are both forward-thinking and contextually appropriate. Deepak has led numerous award-winning projects and frequently lectures at architectural schools across India.",
  
  "Priya joined DD Architecture in 2007 and has been instrumental in developing the firm's sustainable design practice. Her background in environmental design and traditional Tamil architecture informs her unique approach that bridges heritage and innovation. Under her direction, the firm has completed numerous projects that showcase excellence in both aesthetics and sustainability."
];

// Culture and values
import { 
  LightbulbIcon, 
  Users, 
  Heart, 
  Zap, 
  Target 
} from "lucide-react";

const cultureValues = [
  {
    title: "Collaborative Spirit",
    description: "We believe the best ideas emerge through collaboration, with each team member contributing their unique perspective and expertise.",
    icon: Users
  },
  {
    title: "Creative Excellence",
    description: "We push the boundaries of design, constantly exploring new approaches and refining our craft to deliver exceptional results.",
    icon: LightbulbIcon
  },
  {
    title: "Passion for Impact",
    description: "We are driven by the knowledge that our work shapes how people experience the world, and we take this responsibility seriously.",
    icon: Heart
  },
  {
    title: "Continuous Learning",
    description: "We foster an environment of growth and development, where curiosity is encouraged and knowledge is shared.",
    icon: Zap
  },
  {
    title: "Client-Centered Approach",
    description: "We listen deeply to our clients' needs and aspirations, building relationships based on trust and mutual respect.",
    icon: Target
  }
];

// Open positions
const openPositions = [
  {
    title: "Senior Architect",
    description: "Seeking an experienced architect to lead project teams and mentor junior staff while maintaining design excellence.",
    type: "Full-time",
    location: "Chennai, Tamil Nadu"
  },
  {
    title: "Interior Designer",
    description: "Looking for a creative interior designer with experience in high-end residential and commercial projects.",
    type: "Full-time",
    location: "Chennai, Tamil Nadu"
  },
  {
    title: "Junior Architect",
    description: "Opportunity for a talented architect with 2-3 years of experience to join our growing team.",
    type: "Full-time",
    location: "Chennai, Tamil Nadu"
  },
  {
    title: "Architectural Visualizer",
    description: "Seeking a skilled visualizer with expertise in 3D modeling, rendering, and animation.",
    type: "Contract/Freelance",
    location: "Remote/Chennai"
  }
];
