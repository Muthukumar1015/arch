import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import MotionImage from "@/components/ui/motion-image";
import { blogPosts } from "@/lib/utils";
import { ThemedButton } from "@/components/ui/themed-button";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ChevronRight } from "lucide-react";

// Extended blog posts data for the dedicated blog page
const extendedBlogPosts = [
  ...blogPosts,
  {
    id: 4,
    title: "The Intersection of Technology and Traditional Architecture",
    category: "Innovation",
    author: "Deepak Sharma",
    date: "2023-02-15",
    excerpt: "How modern technologies like parametric design and computational modeling are being combined with traditional Tamil architectural principles...",
    image: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 5,
    title: "Adaptive Reuse: Breathing New Life into Historical Structures",
    category: "Renovation",
    author: "Rajiv Mehta",
    date: "2023-01-18",
    excerpt: "Exploring successful approaches to renovating and repurposing heritage buildings while preserving their historical significance...",
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 6,
    title: "Commercial Design Trends for Post-Pandemic Workspaces",
    category: "Commercial Architecture",
    author: "Priya Ramachandran",
    date: "2022-12-10",
    excerpt: "Key considerations for designing flexible, healthy, and collaborative commercial environments in the evolving workplace landscape...",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 7,
    title: "Biophilic Design: Connecting Architecture with Nature",
    category: "Sustainable Design",
    author: "Aisha Khan",
    date: "2022-11-05",
    excerpt: "Incorporating natural elements and patterns into architectural and interior design to enhance well-being and environmental connection...",
    image: "https://images.unsplash.com/photo-1509774318503-cd3e5f2c74f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 8,
    title: "Urban Density: Challenges and Solutions for Indian Cities",
    category: "Urban Planning",
    author: "Deepak Sharma",
    date: "2022-10-20",
    excerpt: "Addressing the complexities of creating livable, sustainable urban environments in rapidly densifying Indian metropolitan areas...",
    image: "https://images.unsplash.com/photo-1642058402513-7378941a151f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    id: 9,
    title: "Material Innovation in Contemporary Architecture",
    category: "Materials",
    author: "Priya Ramachandran",
    date: "2022-09-12",
    excerpt: "Exploring cutting-edge building materials that are revolutionizing architectural design, sustainability, and construction methods...",
    image: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

// Blog categories for filtering
const categories = [
  { id: "all", label: "All Categories" },
  { id: "architecture", label: "Architecture" },
  { id: "interior-design", label: "Interior Design" },
  { id: "sustainable", label: "Sustainable Design" },
  { id: "urban-planning", label: "Urban Planning" },
  { id: "innovation", label: "Innovation" }
];

// Extended blog post content (for the first blog post)
const featuredPostContent = {
  title: "The Future of Sustainable Design in Urban India",
  author: "Priya Ramachandran",
  date: "2023-05-15",
  category: "Architecture",
  image: "https://images.unsplash.com/photo-1574602903947-b801602c4878?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  content: [
    "Sustainable architecture has moved from being a niche specialty to a fundamental aspect of contemporary design practice. In the context of rapidly urbanizing Indian cities, where environmental challenges are becoming increasingly acute, sustainable design is not just an ethical choice but a practical necessity.",
    
    "The climate crisis, coupled with India's commitment to reducing carbon emissions, has placed architects at the forefront of creating solutions that balance human needs with environmental responsibility. At DD Architecture, we approach sustainable design as an integrated process rather than a set of add-on features.",
    
    "Our recent projects incorporate several key sustainable strategies that are particularly relevant to urban India:",
    
    "### Climate-Responsive Design",
    
    "The tropical climate of Chennai presents both challenges and opportunities. By orienting buildings to minimize solar heat gain, incorporating cross-ventilation, and using appropriate shading devices, we can significantly reduce energy consumption while maintaining comfortable indoor environments. Our Harmony Residences project exemplifies this approach, with its carefully designed facade that responds to different solar exposures.",
    
    "### Water Conservation",
    
    "Water scarcity is a growing concern in many Indian cities. Our designs incorporate comprehensive water management systems, including rainwater harvesting, greywater recycling, and water-efficient fixtures. The Cultural Heritage Center features a rainwater collection system that meets nearly 40% of the building's water needs.",
    
    "### Local and Sustainable Materials",
    
    "We prioritize materials that have low embodied energy, are locally sourced, and contribute to healthy indoor environments. Traditional materials like compressed earth blocks, lime plaster, and reclaimed timber are reinterpreted in contemporary contexts, reducing environmental impact while connecting to local building traditions.",
    
    "### Integration of Renewable Energy",
    
    "Solar energy, in particular, offers tremendous potential in India's sunny climate. Our designs increasingly incorporate photovoltaic systems, solar water heating, and passive solar strategies. The Skyline Corporate Tower generates 15% of its energy needs through integrated solar panels on its facade and roof.",
    
    "### Urban Agriculture and Biodiversity",
    
    "Green roofs, vertical gardens, and productive landscapes not only improve building performance but also enhance biodiversity and provide food security. The Tranquil Oasis Villa integrates edible landscaping that supplies fresh produce to its residents while creating natural cooling effects.",
    
    "Looking forward, we see several emerging trends that will shape sustainable architecture in urban India:",
    
    "- **Net-Zero Energy Buildings:** Moving beyond efficiency to create buildings that produce as much energy as they consume",
    "- **Circular Economy Approaches:** Designing for disassembly, material reuse, and waste reduction",
    "- **Biophilic Design:** Deepening connections between occupants and nature for wellbeing and environmental awareness",
    "- **Climate Resilience:** Preparing buildings and communities for climate change impacts like flooding and heat waves",
    
    "The future of sustainable design in urban India lies not just in technical solutions but in creating a new design paradigm that reconnects people with natural systems, respects cultural heritage, and builds resilience for future challenges. As architects, we have both the responsibility and the opportunity to lead this transformation toward a more sustainable built environment."
  ],
  relatedPosts: [2, 4, 7]
};

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  
  // Filter blog posts based on selected category (simplified mapping for the mock data)
  const getCategoryForFilter = (category: string) => {
    const categoryMap: Record<string, string[]> = {
      "architecture": ["Architecture", "Project Planning"],
      "interior-design": ["Interior Design"],
      "sustainable": ["Sustainable Design"],
      "urban-planning": ["Urban Planning"],
      "innovation": ["Innovation", "Materials"]
    };
    
    return categoryMap[category] || [];
  };
  
  const filteredPosts = activeFilter === "all"
    ? extendedBlogPosts
    : extendedBlogPosts.filter(post => 
        getCategoryForFilter(activeFilter).includes(post.category)
      );
  
  // Toggle between post list and single post view
  const viewPost = (id: number) => {
    setSelectedPost(id);
    window.scrollTo(0, 0);
  };
  
  const backToList = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {selectedPost === null ? (
        // Blog posts listing view
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
                <h1 className="text-5xl font-heading font-bold mb-6">Our Blog</h1>
                <p className="text-xl text-gray-300">
                  Insights, news, and perspectives from the DD Architecture team.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* Blog Posts */}
          <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
              <SectionHeading
                label="Articles"
                title="Latest Insights & News"
                subtitle="Stay updated with architectural trends, project insights, and design inspiration from our team."
                center
              />
              
              {/* Category Filter */}
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
              
              {/* Featured Post (first post) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden mb-16"
              >
                <div className="relative h-96">
                  <MotionImage 
                    src={extendedBlogPosts[0].image}
                    alt={extendedBlogPosts[0].title}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="inline-block bg-secondary text-primary px-4 py-2 font-accent text-sm mb-4">
                      {extendedBlogPosts[0].category}
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">{extendedBlogPosts[0].title}</h2>
                    <div className="flex items-center text-sm">
                      <div className="flex items-center mr-6">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(extendedBlogPosts[0].date)}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>{extendedBlogPosts[0].author}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 mb-6">{extendedBlogPosts[0].excerpt}</p>
                  <button
                    onClick={() => viewPost(extendedBlogPosts[0].id)}
                    className="inline-flex items-center text-secondary font-accent font-medium hover:underline"
                  >
                    Read Full Article <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.div>
              
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="blog-card bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden h-60">
                      <MotionImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full"
                        hoverEffect
                      />
                      <div className="absolute bottom-0 left-0 bg-secondary text-primary px-4 py-2 font-accent text-sm">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar size={14} className="mr-2" />
                        {formatDate(post.date)}
                        <span className="mx-2">|</span>
                        <User size={14} className="mr-2" />
                        {post.author}
                      </div>
                      
                      <h3 className="text-xl font-heading font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-700 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <button
                        onClick={() => viewPost(post.id)}
                        className="inline-flex items-center text-secondary font-accent font-medium hover:underline"
                      >
                        Read More <ChevronRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Subscribe Section */}
          <section className="py-20 bg-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-heading font-bold mb-6">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-300 mb-8">
                    Stay updated with the latest architectural insights, project announcements, and industry trends.
                  </p>
                  
                  <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                    <ThemedButton variant="primary" type="submit">
                      Subscribe
                    </ThemedButton>
                  </form>
                  
                  <p className="text-gray-400 text-sm mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // Single blog post view (for simplicity, showing only the first post content)
        <>
          {/* Single Post Header */}
          <section className="pt-32 pb-10 bg-light">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={backToList}
                  className="inline-flex items-center text-secondary font-accent font-medium hover:underline mb-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  Back to All Articles
                </button>
                
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="h-96 relative">
                    <MotionImage 
                      src={featuredPostContent.image}
                      alt={featuredPostContent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-8 sm:p-12">
                    <div className="inline-block bg-secondary text-primary px-4 py-2 font-accent text-sm mb-6">
                      {featuredPostContent.category}
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                      {featuredPostContent.title}
                    </h1>
                    
                    <div className="flex items-center text-gray-500 mb-8 border-b border-gray-200 pb-8">
                      <div className="flex items-center mr-6">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(featuredPostContent.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>{featuredPostContent.author}</span>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      {featuredPostContent.content.map((paragraph, idx) => {
                        if (paragraph.startsWith("###")) {
                          return (
                            <h3 key={idx} className="text-xl font-heading font-bold mt-8 mb-4">
                              {paragraph.replace("### ", "")}
                            </h3>
                          );
                        }
                        
                        if (paragraph.startsWith("-")) {
                          return (
                            <ul key={idx} className="list-disc pl-6 mb-6">
                              {paragraph.split("\n").map((item, i) => (
                                <li key={i} className="mb-2">{item.replace("- ", "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        
                        return (
                          <p key={idx} className="text-gray-700 mb-6">{paragraph}</p>
                        );
                      })}
                    </div>
                    
                    {/* Author Bio */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <div className="flex items-start">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                          alt="Priya Ramachandran" 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-heading font-bold">About the Author</h4>
                          <p className="text-secondary font-accent text-sm mb-2">{featuredPostContent.author}</p>
                          <p className="text-gray-700 text-sm">
                            Design Director at DD Architecture specializing in sustainable design solutions with a focus on integrating traditional Tamil architecture with modern aesthetics.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Share */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex items-center">
                        <span className="mr-4 font-medium">Share this article:</span>
                        <div className="flex space-x-3">
                          <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"/>
                            </svg>
                          </a>
                          <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"/>
                            </svg>
                          </a>
                          <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12,2.2467A9.7533,9.7533,0,0,0,8.5392,21.374V14.1842H6.4107V11.1583H8.5392V8.83542C8.5392,6.17,9.9184,4.66667,12.3184,4.66667a15.06513,15.06513,0,0,1,2.1467.18583V7.39667H13.1942c-1.24,0-1.6292.775-1.6292,1.5708v1.99083h2.7733l-.4417,3.02583H11.565V21.5825A9.7558,9.7558,0,0,0,12,2.2467Z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Related Posts */}
          <section className="py-20 bg-light">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-heading font-bold mb-8">Related Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredPostContent.relatedPosts.map((postId, index) => {
                    const post = extendedBlogPosts.find(p => p.id === postId);
                    if (!post) return null;
                    
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                      >
                        <div className="h-48 overflow-hidden">
                          <MotionImage
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full"
                            hoverEffect
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-heading font-bold mb-3">{post.title}</h3>
                          <button
                            onClick={() => viewPost(post.id)}
                            className="inline-flex items-center text-secondary font-accent text-sm font-medium hover:underline"
                          >
                            Read Article <ChevronRight size={16} className="ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="text-center mt-12">
                  <button
                    onClick={backToList}
                    className="px-8 py-3 bg-primary text-white font-accent font-medium rounded-sm hover:bg-secondary transition-colors"
                  >
                    View All Articles
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
