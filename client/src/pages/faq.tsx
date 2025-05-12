import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { faqItems } from "@/lib/utils";
import { ChevronDown, ChevronUp, Mail, MessageSquare } from "lucide-react";
import { ThemedButton } from "@/components/ui/themed-button";
import { Link } from "wouter";

// Extended FAQ items organized by categories
const extendedFaqItems = {
  general: [
    ...faqItems,
    {
      id: 6,
      question: "What sets DD Architecture apart from other architectural firms?",
      answer: "DD Architecture combines deep technical expertise with a strong focus on client collaboration. We pride ourselves on our ability to blend traditional Tamil architectural elements with contemporary design, our commitment to sustainable practices, and our track record of delivering projects that exceed client expectations both aesthetically and functionally."
    },
    {
      id: 7,
      question: "Do you offer virtual consultations?",
      answer: "Yes, we offer virtual consultations for clients who cannot visit our office in person. These sessions are conducted via video conference and include screen sharing capabilities for reviewing plans, images, and other visual materials. While we prefer in-person meetings for initial consultations when possible, our virtual options provide a convenient alternative."
    }
  ],
  process: [
    {
      id: 1,
      question: "What is your typical design process?",
      answer: "Our design process typically follows five key phases: 1) Consultation & Brief Development, where we understand your needs and project goals; 2) Concept Design, exploring design directions and spatial relationships; 3) Design Development, refining the chosen concept with technical details; 4) Documentation, preparing comprehensive drawings for approvals and construction; and 5) Construction Support, providing oversight during the building phase to ensure design integrity."
    },
    {
      id: 2,
      question: "How long does the entire architectural process take?",
      answer: "The timeline varies significantly based on project scope and complexity. For residential projects, the design phase typically takes 3-6 months, with construction adding another 12-18 months. Commercial projects generally require 6-12 months for design and 18-36 months for construction. Factors affecting the timeline include regulatory approvals, client decision-making, contractor selection, and unforeseen site conditions."
    },
    {
      id: 3,
      question: "How involved will I be in the design process?",
      answer: "Client involvement is essential to our process. We structure our approach to include regular client meetings at key milestones for feedback and approval. These typically occur at the end of each design phase. Beyond formal meetings, we maintain open communication through email and phone. The level of involvement can be tailored to your preferences, from hands-on participation in design decisions to a more delegated approach."
    }
  ],
  services: [
    {
      id: 1,
      question: "Do you provide interior design services?",
      answer: "Yes, we offer comprehensive interior design services that can be engaged either as part of an architectural project or as a standalone service. Our interior design team works closely with our architects to ensure cohesive design integration. Services include space planning, material selection, custom furniture design, lighting design, and finish specifications."
    },
    {
      id: 2,
      question: "Can you handle project management during construction?",
      answer: "Yes, we offer construction administration services where we act as your representative during the building phase. This includes regular site visits to monitor construction quality, reviewing contractor submittals and shop drawings, addressing design clarifications, and ensuring the project is built according to design specifications. This service helps maintain design integrity and can prevent costly mistakes."
    },
    {
      id: 3,
      question: "Do you work on residential renovations or only new constructions?",
      answer: "We work on both new constructions and renovations. Renovation projects, including heritage property restorations, form a significant part of our portfolio. These projects often present unique challenges and opportunities that our team is well-equipped to address, balancing respect for existing structures with modern functionality and design sensibilities."
    }
  ],
  financial: [
    {
      id: 1,
      question: "How do architectural fees work?",
      answer: "Our fee structure is typically determined as a percentage of the construction cost, ranging from 8-12% depending on project complexity and scope of services. We also offer fixed fee arrangements for certain project types or phases. Fees are usually billed in phases corresponding to project milestones (concept design, development, documentation, etc.). For smaller projects, we may offer hourly rates for specific services."
    },
    {
      id: 2,
      question: "What is the typical budget range for your projects?",
      answer: "Our projects range widely in budget based on scope, complexity, and finishes. Luxury residential projects typically start at ₹3,000 per square foot, while commercial projects generally begin at ₹2,500 per square foot. Various factors affect costs, including site conditions, structural requirements, material selections, and mechanical/electrical systems. During initial consultations, we provide budget guidance specific to your project."
    },
    {
      id: 3,
      question: "How can I finance my architectural project?",
      answer: "While we don't provide financial services directly, we collaborate with clients and their financial advisors to develop phased approaches that align with funding capabilities. Many clients work with banks offering construction loans or home improvement loans. We can provide the detailed plans and specifications required for loan applications and can help structure the project to match financing parameters if needed."
    }
  ],
  technical: [
    {
      id: 1,
      question: "What sustainable design practices do you incorporate?",
      answer: "Our sustainable design approach includes passive strategies (orientation, shading, natural ventilation), energy-efficient systems (high-performance HVAC, LED lighting), water conservation (rainwater harvesting, low-flow fixtures), sustainable material selection, renewable energy integration (solar panels), and biophilic design elements. We can pursue green building certifications when desired and quantify sustainability benefits through energy modeling and lifecycle cost analysis."
    },
    {
      id: 2,
      question: "How do you handle local building codes and regulations?",
      answer: "We maintain comprehensive knowledge of local building codes, zoning regulations, and approval processes. Our team coordinates with relevant authorities, prepares documentation for submissions, and follows up throughout the approval process. When necessary, we can develop creative design solutions that respect regulatory requirements while meeting client objectives, and can represent clients in variance requests or special approvals."
    },
    {
      id: 3,
      question: "What technology do you use in your design process?",
      answer: "We utilize industry-leading technologies including Building Information Modeling (BIM) with Revit for 3D modeling and documentation, rendering software for photorealistic visualizations, virtual reality for immersive design experiences, computational design tools for complex form finding and optimization, and energy modeling software to analyze building performance. These tools enhance design quality, coordination, and client communication."
    }
  ]
};

// FAQ category definitions
const faqCategories = [
  { id: "general", label: "General Questions" },
  { id: "process", label: "Design Process" },
  { id: "services", label: "Our Services" },
  { id: "financial", label: "Fees & Budgeting" },
  { id: "technical", label: "Technical Aspects" }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedItems, setExpandedItems] = useState<Record<string, number>>({
    general: 0, // Open the first item in each category by default
    process: 0,
    services: 0,
    financial: 0,
    technical: 0
  });
  
  // Toggle FAQ item expansion
  const toggleItem = (category: string, index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [category]: prev[category] === index ? -1 : index
    }));
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
            <h1 className="text-5xl font-heading font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300">
              Find answers to common questions about our architectural services, process, and approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories & Questions */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 m-2 border rounded-sm font-accent text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-secondary text-white border-secondary"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-secondary hover:text-white hover:border-secondary"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          
          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {extendedFaqItems[activeCategory as keyof typeof extendedFaqItems].map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button 
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => toggleItem(activeCategory, index)}
                  >
                    <span className="text-lg font-heading font-bold">{item.question}</span>
                    {expandedItems[activeCategory] === index ? (
                      <ChevronUp className="text-secondary transition-transform text-2xl" size={24} />
                    ) : (
                      <ChevronDown className="text-secondary transition-transform text-2xl" size={24} />
                    )}
                  </button>
                  <div 
                    className={`px-6 pb-6 transition-all duration-300 ${
                      expandedItems[activeCategory] === index ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-gray-700">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Support */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-dark bg-opacity-50 p-8 rounded-lg"
              >
                <div className="text-secondary mb-4">
                  <Mail size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Contact Us Directly</h3>
                <p className="text-gray-300 mb-6">
                  Couldn't find the answer you're looking for? Our team is here to help with any specific questions about our services or your project.
                </p>
                <Link href="/contact">
                  <ThemedButton variant="primary">
                    Get in Touch
                  </ThemedButton>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-dark bg-opacity-50 p-8 rounded-lg"
              >
                <div className="text-secondary mb-4">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Schedule a Consultation</h3>
                <p className="text-gray-300 mb-6">
                  Ready to discuss your project with our architects? Book a consultation to get personalized advice and insights.
                </p>
                <Link href="/booking">
                  <ThemedButton variant="primary">
                    Book Now
                  </ThemedButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Additional Resources"
            title="Learn More About Architecture"
            subtitle="Explore these resources to deepen your understanding of architectural concepts and processes."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <resource.icon size={64} className="text-secondary" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <a href={resource.link} className="inline-flex items-center text-secondary font-accent font-medium hover:underline">
                    {resource.linkText}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Resource items
import { BookOpen, FileText, Lightbulb } from "lucide-react";

const resources = [
  {
    title: "Architecture Guide",
    description: "A comprehensive guide to architectural styles, terms, and concepts to help you better understand and communicate your vision.",
    link: "/blog",
    linkText: "Read the Guide",
    icon: BookOpen
  },
  {
    title: "Project Planning Checklist",
    description: "A step-by-step checklist to help you prepare for your architectural project and ensure you've considered all important aspects.",
    link: "/blog",
    linkText: "Download Checklist",
    icon: FileText
  },
  {
    title: "Design Inspiration Gallery",
    description: "Browse our curated collection of design ideas and architectural inspirations to help refine your aesthetic preferences.",
    link: "/gallery",
    linkText: "Explore Gallery",
    icon: Lightbulb
  }
];
