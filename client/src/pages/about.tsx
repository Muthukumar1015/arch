import { Link } from "wouter";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ThemedButton } from "@/components/ui/themed-button";
import MotionImage from "@/components/ui/motion-image";

export default function About() {
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
            <h1 className="text-5xl font-heading font-bold mb-6">About Us</h1>
            <p className="text-xl text-gray-300">
              Learn about our story, our values, and the team behind DD Architecture's award-winning designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
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
              <MotionImage 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern architecture building" 
                className="rounded-lg shadow-xl" 
              />
            </motion.div>
            
            <div className="lg:w-1/2">
              <SectionHeading
                label="Our Story"
                title="Architectural Excellence Since 2005"
                className="text-left mb-6"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-700 mb-6">
                  Founded in 2005 by Deepak Sharma, DD Architecture began as a small design studio in Chennai with a vision to create spaces that blend functionality, aesthetics, and sustainability. What started as a three-person team has now grown into one of Tamil Nadu's most respected architectural firms.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Our journey has been defined by a commitment to architectural innovation and client satisfaction. Over the years, we've cultivated relationships with clients ranging from individual homeowners to corporate enterprises, developing a portfolio of diverse projects that showcase our versatility and design excellence.
                </p>
                
                <p className="text-gray-700 mb-8">
                  Today, DD Architecture stands as a testament to our founding principles: creating designs that inspire, spaces that function flawlessly, and structures that stand the test of time while respecting environmental and cultural contexts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/team">
                    <ThemedButton variant="primary">
                      Meet Our Team
                    </ThemedButton>
                  </Link>
                  <Link href="/projects">
                    <ThemedButton variant="secondary">
                      View Our Projects
                    </ThemedButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Our Values"
            title="The Principles That Guide Our Work"
            subtitle="At DD Architecture, our design approach is built on core values that inform every aspect of our practice."
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary bg-opacity-50 p-8 rounded-lg"
              >
                <div className="text-secondary mb-4">
                  <value.icon size={40} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Our Journey"
            title="Key Milestones"
            subtitle="Tracing our growth and achievements through the years."
            center
          />
          
          <div className="relative mt-20">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-heading font-bold text-secondary mb-2">{milestone.year}</h3>
                    <h4 className="text-lg font-medium mb-4">{milestone.title}</h4>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-secondary border-4 border-white z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Recognition"
            title="Awards & Accolades"
            subtitle="Our work has been recognized by prestigious institutions and publications in the field of architecture and design."
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark bg-opacity-50 p-8 rounded-lg border border-gray-800"
              >
                <div className="flex items-start mb-4">
                  <div className="text-secondary mr-4">
                    <award.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{award.title}</h3>
                    <p className="text-secondary text-sm font-accent">{award.year}</p>
                  </div>
                </div>
                <p className="text-gray-300">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-light relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-primary text-white p-12 rounded-lg shadow-xl">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-heading font-bold mb-6"
              >
                Ready to Start Your Architectural Journey?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Whether you're planning a new home, commercial space, or renovation project, our team is ready to bring your vision to life.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link href="/booking">
                  <ThemedButton variant="primary">
                    Book a Consultation
                  </ThemedButton>
                </Link>
                <Link href="/contact">
                  <ThemedButton variant="secondary">
                    Contact Us
                  </ThemedButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Values data
import { 
  Lightbulb, 
  Users, 
  Leaf, 
  CheckCircle, 
  Gem, 
  HeartHandshake, 
  Award,
  Trophy,
  Medal
} from "lucide-react";

const values = [
  {
    id: 1,
    title: "Design Excellence",
    description: "We pursue design excellence in every project, pushing boundaries to create spaces that are both aesthetically pleasing and functionally superior.",
    icon: Lightbulb
  },
  {
    id: 2,
    title: "Client-Centric Approach",
    description: "We prioritize our clients' needs and visions, involving them in every step of the process to ensure their objectives are met and expectations exceeded.",
    icon: Users
  },
  {
    id: 3,
    title: "Sustainability",
    description: "Environmental responsibility is at the core of our design philosophy. We create structures that minimize ecological impact while maximizing energy efficiency.",
    icon: Leaf
  },
  {
    id: 4,
    title: "Quality & Precision",
    description: "We maintain the highest standards of quality in our designs and precision in our execution, leaving no detail overlooked.",
    icon: CheckCircle
  },
  {
    id: 5,
    title: "Innovation",
    description: "We embrace new technologies, materials, and methodologies to constantly evolve our practice and deliver innovative architectural solutions.",
    icon: Gem
  },
  {
    id: 6,
    title: "Community Impact",
    description: "We design with awareness of how our projects affect communities, striving to create spaces that enhance social interaction and cultural identity.",
    icon: HeartHandshake
  }
];

// Milestones data
const milestones = [
  {
    year: "2005",
    title: "Foundation",
    description: "DD Architecture was founded as a small design studio in Anna Nagar, Chennai by Deepak Sharma with a vision of creating meaningful spaces."
  },
  {
    year: "2008",
    title: "First Major Project",
    description: "Completed our first major residential complex, The Harmony Residences, which won the Tamil Nadu Architectural Excellence Award."
  },
  {
    year: "2012",
    title: "Expansion",
    description: "Expanded our team to 20 professionals and moved to a larger office space to accommodate our growing portfolio of projects."
  },
  {
    year: "2015",
    title: "10-Year Anniversary",
    description: "Celebrated a decade of architectural excellence with over 100 successful projects and established a scholarship program for aspiring architects."
  },
  {
    year: "2018",
    title: "International Recognition",
    description: "Received our first international award for the Chennai Cultural Heritage Center, gaining recognition beyond India's borders."
  },
  {
    year: "2021",
    title: "Sustainability Initiative",
    description: "Launched the 'Green Architecture Initiative' focusing on sustainable design practices and completed our first net-zero energy building."
  },
  {
    year: "2023",
    title: "Present Day",
    description: "Today, DD Architecture stands as one of South India's premier architectural firms with a diverse portfolio of over 200 projects."
  }
];

// Awards data
const awards = [
  {
    id: 1,
    title: "Tamil Nadu Architectural Excellence Award",
    year: "2008 & 2015",
    description: "Awarded for outstanding residential design that harmoniously blends traditional Tamil elements with contemporary architecture.",
    icon: Award
  },
  {
    id: 2,
    title: "National Sustainable Design Award",
    year: "2016",
    description: "Recognized for pioneering eco-friendly design solutions that significantly reduce energy consumption and environmental impact.",
    icon: Leaf
  },
  {
    id: 3,
    title: "Indian Institute of Architects Merit Award",
    year: "2018",
    description: "Honored for excellence in public building design for the Chennai Cultural Heritage Center, which celebrates local heritage.",
    icon: Trophy
  },
  {
    id: 4,
    title: "Asia Pacific Property Awards",
    year: "2019",
    description: "Winner in the Commercial High-rise Architecture category for the Skyline Corporate Tower in Chennai's business district.",
    icon: Medal
  },
  {
    id: 5,
    title: "Green Building Council Platinum Certification",
    year: "2021",
    description: "Highest recognition for our commitment to sustainable building practices and innovative energy-efficient design.",
    icon: Award
  },
  {
    id: 6,
    title: "Interior Design Excellence Award",
    year: "2022",
    description: "Awarded for exceptional interior design work that transforms spaces through innovative use of materials and lighting.",
    icon: Trophy
  }
];
