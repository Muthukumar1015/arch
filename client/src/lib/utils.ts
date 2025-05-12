import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Constants for company information
export const companyInfo = {
  name: "DD Architecture",
  address: {
    street: "24 Anna Main Road",
    area: "Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    zip: "600040",
    country: "India"
  },
  contact: {
    phone: "+91 99999 88888",
    officePhone: "+91 44 2345 6789",
    email: "info@ddarchitecture.com",
    projectEmail: "projects@ddarchitecture.com"
  },
  hours: {
    weekdays: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed"
  },
  social: {
    facebook: "https://facebook.com/ddarchitecture",
    instagram: "https://instagram.com/ddarchitecture",
    linkedin: "https://linkedin.com/company/ddarchitecture",
    pinterest: "https://pinterest.com/ddarchitecture"
  }
};

// Project types for forms
export const projectTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "interior", label: "Interior Design" },
  { value: "renovation", label: "Renovation" },
  { value: "consultation", label: "General Consultation" }
];

// Available consultation time slots
export const timeSlots = [
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" }
];

// Format date string to readable format (e.g., "15 May 2023")
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Services offered by the company
export const services = [
  {
    id: "residential",
    icon: "home-4",
    title: "Residential Architecture",
    description: "Bespoke home designs that balance aesthetics with functionality, creating spaces that reflect your personal style and meet your everyday needs."
  },
  {
    id: "commercial",
    icon: "building-2",
    title: "Commercial Architecture",
    description: "Innovative commercial spaces that enhance brand identity, optimize workflow, and create memorable experiences for both employees and customers."
  },
  {
    id: "interior",
    icon: "layout",
    title: "Interior Design",
    description: "Comprehensive interior solutions that transform spaces through thoughtful material selection, custom furnishings, and attention to every detail."
  },
  {
    id: "urban",
    icon: "landscape",
    title: "Urban Planning",
    description: "Strategic urban design solutions that create sustainable, vibrant communities through thoughtful integration of buildings, infrastructure, and green spaces."
  },
  {
    id: "sustainable",
    icon: "plant",
    title: "Sustainable Design",
    description: "Eco-conscious architectural solutions that minimize environmental impact through energy-efficient systems, sustainable materials, and biophilic design elements."
  },
  {
    id: "renovation",
    icon: "pencil-ruler-2",
    title: "Renovation & Restoration",
    description: "Thoughtful transformation of existing structures, preserving historical elements while incorporating modern functionality and design principles."
  }
];

// Project categories for filtering
export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "public", label: "Public" },
  { id: "interior", label: "Interior" }
];

// Projects data
export const projects = [
  {
    id: 1,
    title: "Harmony Residences",
    category: "residential",
    description: "Contemporary residential complex with sustainable features and community spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 2,
    title: "Skyline Corporate Tower",
    category: "commercial",
    description: "Innovative office space designed for collaboration and productivity in urban setting.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 3,
    title: "Serene Living Spaces",
    category: "interior",
    description: "Sophisticated interior design blending contemporary aesthetics with functional living.",
    image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 4,
    title: "Cultural Heritage Center",
    category: "public",
    description: "Iconic public building celebrating Tamil heritage through innovative architectural language.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 5,
    title: "Fashion District Pavilion",
    category: "commercial",
    description: "Upscale retail space merging distinctive branding elements with customer experience design.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 6,
    title: "Tranquil Oasis Villa",
    category: "residential",
    description: "Bespoke luxury residence embracing indoor-outdoor living through thoughtful spatial design.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

// Gallery images
export const galleryImages = [
  {
    id: 1,
    alt: "Modern interior design",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 2,
    alt: "Contemporary building facade",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 3,
    alt: "Architectural blueprint",
    image: "https://images.unsplash.com/photo-1580332449086-43d6ab233610?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 4,
    alt: "Modern office reception area",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 5,
    alt: "Modern home exterior",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 6,
    alt: "Minimalist kitchen design",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 7,
    alt: "Hand drawn architectural sketch",
    image: "https://images.unsplash.com/photo-1474377207190-a7d8b3334068?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  },
  {
    id: 8,
    alt: "Unique architectural detail",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500"
  }
];

// Team members
export const teamMembers = [
  {
    id: 1,
    name: "Deepak Sharma",
    role: "Principal Architect & Founder",
    bio: "With over 20 years of experience in creating award-winning designs across residential and commercial projects.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "deepak@ddarchitecture.com"
    }
  },
  {
    id: 2,
    name: "Priya Ramachandran",
    role: "Design Director",
    bio: "Specializes in sustainable design solutions with a focus on integrating traditional Tamil architecture with modern aesthetics.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priya@ddarchitecture.com"
    }
  },
  {
    id: 3,
    name: "Rajiv Mehta",
    role: "Senior Architect",
    bio: "Expert in commercial and institutional projects with a strong background in urban planning and environmental design.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rajiv@ddarchitecture.com"
    }
  },
  {
    id: 4,
    name: "Aisha Khan",
    role: "Interior Design Lead",
    bio: "Brings creativity and precision to interior spaces with expertise in material selection and custom furniture design.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "aisha@ddarchitecture.com"
    }
  }
];

// Blog posts
export const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Design in Urban India",
    category: "Architecture",
    author: "Priya Ramachandran",
    date: "2023-05-15",
    excerpt: "Exploring innovative approaches to sustainable architecture and how they're reshaping urban landscapes across India...",
    image: "https://images.unsplash.com/photo-1574602903947-b801602c4878?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 2,
    title: "Blending Traditional Tamil Elements with Modern Design",
    category: "Interior Design",
    author: "Aisha Khan",
    date: "2023-04-28",
    excerpt: "How incorporating traditional Tamil architectural elements can create unique and culturally rich modern interiors...",
    image: "https://images.unsplash.com/photo-1616137148650-4aa14651e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 3,
    title: "5 Critical Phases of Successful Architectural Projects",
    category: "Project Planning",
    author: "Rajiv Mehta",
    date: "2023-03-12",
    excerpt: "A comprehensive guide to the key stages of architectural project development from concept to completion...",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

// FAQ items
export const faqItems = [
  {
    id: 1,
    question: "What services does DD Architecture provide?",
    answer: "DD Architecture offers a comprehensive range of services including architectural design, interior design, urban planning, renovation and restoration, sustainable design solutions, and project management. We work on residential, commercial, institutional, and public projects of various scales."
  },
  {
    id: 2,
    question: "How long does the architectural design process take?",
    answer: "The timeline varies depending on the project's complexity and scale. Typically, a residential project's design phase can take 3-6 months, while larger commercial projects may take 6-12 months. During your initial consultation, we'll provide a more specific timeline tailored to your project requirements."
  },
  {
    id: 3,
    question: "How much does it cost to hire an architect?",
    answer: "Our fees are structured based on the project's complexity, scale, and specific requirements. We typically work on a percentage of construction cost, fixed fee, or hourly basis. During your initial consultation, we'll discuss your project goals and provide a detailed fee proposal that aligns with your budget and expectations."
  },
  {
    id: 4,
    question: "Do you handle the construction process as well?",
    answer: "While we don't directly handle construction, we provide comprehensive construction administration services. This includes selecting qualified contractors, reviewing bids, conducting site visits, ensuring construction quality, and verifying that the project is built according to design specifications. We work closely with builders to ensure seamless execution of your project."
  },
  {
    id: 5,
    question: "How do I schedule a consultation with DD Architecture?",
    answer: "You can schedule a consultation through our website's booking section, by calling our office at +91 99999 88888, or by sending an email to info@ddarchitecture.com. During the initial consultation, we'll discuss your project goals, requirements, budget, and timeline to determine how our services can best meet your needs."
  }
];

// Get future available dates (next 14 days, excluding Sundays)
export function getAvailableDates() {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (day 0)
    if (date.getDay() !== 0) {
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
  }
  
  return dates;
}
