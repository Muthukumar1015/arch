import {
  users, projects, articles, contactSubmissions, newsletterSubscriptions,
  type User, type Project, type Article, type ContactSubmission, type NewsletterSubscription,
  type InsertUser, type InsertProject, type InsertArticle, type InsertContactSubmission, type InsertNewsletterSubscription
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(limit?: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getFeaturedArticles(limit?: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Newsletter Subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private articles: Map<number, Article>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentArticleId: number;
  private currentContactSubmissionId: number;
  private currentNewsletterSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.articles = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentArticleId = 1;
    this.currentContactSubmissionId = 1;
    this.currentNewsletterSubscriptionId = 1;

    // Initialize with sample projects
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug
    );
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }

  async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter((project) => project.featured)
      .slice(0, limit);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(
      (article) => article.slug === slug
    );
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.category === category
    );
  }

  async getFeaturedArticles(limit: number = 3): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter((article) => article.featured)
      .slice(0, limit);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const article: Article = { ...insertArticle, id };
    this.articles.set(id, article);
    return article;
  }

  // Contact Submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const submittedAt = new Date();
    const submission: ContactSubmission = { ...insertSubmission, id, submittedAt };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  // Newsletter Subscription methods
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email
    );

    if (existingSubscription) {
      return existingSubscription;
    }

    const id = this.currentNewsletterSubscriptionId++;
    const subscribedAt = new Date();
    const subscription: NewsletterSubscription = { ...insertSubscription, id, subscribedAt };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  // Initialize with sample data
  private initializeData() {
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Glass Tower Complex",
        slug: "glass-tower-complex",
        description: "Award-winning commercial tower with sustainable design elements and innovative workspace solutions.",
        location: "Milan, Italy",
        category: "commercial",
        imageUrl: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf",
        featured: true,
        publishedDate: new Date("2023-02-15"),
        content: "This project features an innovative commercial tower design that prioritizes sustainable elements and creates a dynamic workspace environment. The building's glass facade optimizes natural light while minimizing heat gain through specialized glazing technology. Interior spaces are designed with flexibility in mind, accommodating various work styles and team configurations.\n\nKey features include:\n- 25 floors of premium office space\n- Central atrium with natural ventilation\n- Integrated solar panels\n- Smart building management systems\n- Extensive green terraces on multiple levels"
      },
      {
        title: "Concrete Minimalist Villa",
        slug: "concrete-minimalist-villa",
        description: "Brutalist-inspired family home with focus on natural light and connection to the surrounding landscape.",
        location: "Barcelona, Spain",
        category: "residential",
        imageUrl: "https://pixabay.com/get/ga02c7c3c61d70f1d50b5da1af4c11add58641397e382eacf73c4e0d06b8eddebd02a05ad434f9625ba9b7b82c742a22b3f2c0389f3f2f2906449c16e7173b871_1280.jpg",
        featured: true,
        publishedDate: new Date("2023-01-10"),
        content: "This residential project embraces brutalist design principles while creating a warm, livable family home. Exposed concrete elements provide structural honesty and thermal mass, while expansive glazing connects interior spaces with the surrounding Mediterranean landscape.\n\nThe home features a series of interlocking volumes that create protected outdoor spaces and frame specific views. Interior spaces flow seamlessly, with careful consideration given to the quality of natural light throughout the day.\n\nSustainability features include passive solar design, rainwater harvesting, and native landscaping that reduces water consumption while enhancing biodiversity."
      },
      {
        title: "Luxury Penthouse Interior",
        slug: "luxury-penthouse-interior",
        description: "Complete interior design for a penthouse apartment featuring custom furniture and curated art collection.",
        location: "New York, USA",
        category: "interior",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
        featured: true,
        publishedDate: new Date("2022-12-05"),
        content: "This luxury penthouse interior project transforms a raw architectural space into a sophisticated urban residence. Our design approach balanced the client's extensive art collection with functional living spaces that maintain visual cohesion while serving diverse needs.\n\nBespoke furnishings were designed specifically for the space, complementing key vintage pieces and contemporary classics. The material palette emphasizes natural textures and subtle tonal variations, creating a backdrop that enhances the art without competing for attention.\n\nLighting design was a critical component, with a layered approach that includes architectural, task, and accent lighting to transform the mood of spaces throughout the day and evening."
      },
      {
        title: "Eco Office Complex",
        slug: "eco-office-complex",
        description: "LEED Platinum certified office building with vertical gardens, rainwater harvesting, and solar integration.",
        location: "Singapore",
        category: "sustainable",
        imageUrl: "https://pixabay.com/get/ge86724a128ddaa60a65e7e4272e26107773a118c892bc848e484392088f0bee996c5068ad5a441f3a0a7fc92069ec5dc9c8d97728367b7caee96b7edc58a536d_1280.jpg",
        featured: true,
        publishedDate: new Date("2022-11-20"),
        content: "This pioneering eco-office complex represents a new standard in sustainable commercial architecture. Designed to achieve LEED Platinum certification, the building integrates multiple green technologies while providing world-class office environments.\n\nExtensive vertical gardens cover 60% of the building's exterior, reducing heat gain, filtering air pollution, and creating a biodiversity hotspot in the urban context. These living walls are maintained through an integrated rainwater harvesting system that captures and filters precipitation for irrigation and graywater uses.\n\nThe building's form responds to Singapore's tropical climate, with deep overhangs, strategic orientation, and passive ventilation systems reducing energy demands. Rooftop solar arrays provide 40% of the building's energy needs, while smart building systems continuously optimize performance."
      },
      {
        title: "Contemporary Art Museum",
        slug: "contemporary-art-museum",
        description: "Dynamic cultural space designed to enhance visitor experience and showcase diverse art installations.",
        location: "Oslo, Norway",
        category: "commercial",
        imageUrl: "https://pixabay.com/get/ga0e5aeeb0f7530296baa9b824ce6179d58a9b4d24dfe48e7f2ca08124c3bdf4120357ec34cb13bdbf0d157cc4bf18e4f02815cae81b79e4150a7e2a8bd2da1bf_1280.jpg",
        featured: true,
        publishedDate: new Date("2022-10-15"),
        content: "This museum design creates a series of interconnected exhibition spaces that can be reconfigured to accommodate varying scales of artwork and installations. The building's dynamic form reflects its context beside the fjord, with a facade that responds to changing light conditions throughout the seasons.\n\nCirculation spaces become part of the exhibition experience, offering moments of pause and reflection between galleries. A central atrium provides orientation and serves as a venue for performances and special events.\n\nConstruction utilized local materials and craft traditions, reinterpreted through contemporary fabrication technologies. The result is a building that feels both innovative and rooted in its Nordic context."
      },
      {
        title: "Scandinavian Villa Interior",
        slug: "scandinavian-villa-interior",
        description: "Harmonious interior design focused on natural materials, functionality, and Nordic design principles.",
        location: "Stockholm, Sweden",
        category: "interior",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
        featured: true,
        publishedDate: new Date("2022-09-10"),
        content: "This interior design project embodies the essence of Nordic design philosophy, creating spaces that balance aesthetic refinement with practical functionality. Natural materials feature prominently, with white oak flooring, stone surfaces, and wool textiles establishing a warm, tactile environment.\n\nThe design emphasizes clean lines and a predominantly neutral palette, with strategic use of color in art and accessories. Custom cabinetry throughout the home provides ample storage while maintaining visual simplicity.\n\nLighting design received particular attention, acknowledging Scandinavia's dramatic seasonal variations in natural light. The scheme incorporates numerous light sources at different heights, creating flexible environments that can be adjusted to different activities and times of year."
      }
    ];

    // Sample articles
    const sampleArticles: InsertArticle[] = [
      {
        title: "The Future of Sustainable Architecture: Trends for 2023",
        slug: "sustainable-architecture-trends-2023",
        excerpt: "Exploring innovative materials and techniques that are shaping environmentally conscious design in the architecture industry.",
        category: "sustainability",
        imageUrl: "https://pixabay.com/get/gf2d6ebecf1ae7bb633dc4a4aa3e9ca81428e7a50945ce746f0bfe6e1594eb669c465bafaa938781fb099d68ffa95dbe9652c4fe121fad809a310020462d0277d_1280.jpg",
        featured: true,
        publishedDate: new Date("2023-01-15"),
        content: "Sustainability has moved beyond being a trend to become a fundamental aspect of architectural practice. As we move into 2023, several key developments are shaping how architects and designers approach environmental responsibility in their work.\n\n## Regenerative Design\n\nWhile sustainable design focuses on minimizing environmental impact, regenerative design takes this a step further by creating buildings that actually improve their surroundings. This approach seeks to restore ecosystems, enhance biodiversity, and create positive impacts on both environmental and social systems.\n\nProjects implementing regenerative design principles are incorporating features like extensive habitat creation, on-site food production, and systems that purify water and air beyond the building's own needs.\n\n## Mass Timber Construction\n\nEngineered wood products like cross-laminated timber (CLT) are transforming how we approach structural systems. These materials offer the strength of traditional concrete and steel while sequestering carbon and providing numerous aesthetic and performance benefits.\n\nRecent regulatory changes in many regions now permit taller wooden structures, opening new possibilities for this sustainable material. The visual warmth and biophilic qualities of exposed timber also contribute to occupant wellbeing.\n\n## Circular Economy Materials\n\nThe concept of designing out waste through material reuse and recycling continues to gain momentum. Innovative companies are now creating high-performance building materials from agricultural waste, plastic ocean debris, and even mycelium (fungal networks).\n\nArchitects are increasingly specifying products with documented paths for future reuse, and designing buildings for eventual disassembly rather than demolition. This shift represents a fundamental rethinking of the building lifecycle.\n\n## Conclusion\n\nAs the urgency of climate action increases, architectural innovation continues to accelerate. The coming year promises exciting developments in how we create buildings that minimize environmental impact while maximizing human wellbeing and aesthetic quality."
      },
      {
        title: "Biophilic Design: Bringing Nature Indoors",
        slug: "biophilic-design-bringing-nature-indoors",
        excerpt: "How incorporating natural elements in interior spaces improves wellbeing, productivity, and connection to the environment.",
        category: "interior design",
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        featured: true,
        publishedDate: new Date("2022-12-02"),
        content: "The human connection to nature is deeply rooted in our evolutionary history, yet modern life often separates us from natural environments. Biophilic design addresses this disconnect by incorporating nature into our built environments, with profound benefits for wellbeing and productivity.\n\n## What is Biophilic Design?\n\nBiophilic design goes beyond simply adding plants to a space. It encompasses multiple strategies for connecting occupants with natural patterns, processes, and materials. These can include:\n\n- Direct experiences of nature (plants, water, natural light)\n- Indirect references (natural materials, patterns, colors)\n- Spatial qualities that evoke natural environments (prospect and refuge, mystery, risk/peril)\n\n## Evidence-Based Benefits\n\nResearch consistently demonstrates that biophilic environments offer measurable benefits:\n\n- Hospital patients with views of nature recover more quickly\n- Office workers in biophilic spaces report 15% higher wellbeing and 15% greater creativity\n- Retail environments with natural elements see 8-12% higher customer dwell time and spending\n- Educational spaces with natural light and views lead to 20-26% faster learning rates\n\n## Implementation Strategies\n\nSuccessful biophilic design integrates multiple strategies rather than relying on isolated elements. Consider these approaches:\n\n- **Dynamic lighting:** Systems that change in intensity and color temperature throughout the day to mimic natural light patterns\n- **Natural materials:** Incorporating wood, stone, and other natural materials with visible grain patterns and textures\n- **Complexity and order:** Fractal patterns and balanced variations that echo natural environments\n- **Refuge spaces:** Creating protected areas that offer psychological comfort while maintaining visual connection to larger spaces\n\n## Case Study: Tech Company Headquarters\n\nA recent headquarters project incorporated extensive biophilic elements, including a central atrium with mature trees, water features that provide both visual and acoustic benefits, and extensive use of natural materials. Post-occupancy evaluation showed 32% higher reported job satisfaction and 26% lower absenteeism compared to the company's previous offices.\n\nAs our understanding of biophilic design principles continues to evolve, the integration of nature into our built environments promises to create spaces that better support human health, productivity, and connection to the natural world."
      },
      {
        title: "Digital Tools Revolutionizing Architectural Practice",
        slug: "digital-tools-revolutionizing-architecture",
        excerpt: "An overview of cutting-edge software and technologies transforming design processes and client collaboration in architecture.",
        category: "technology",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        featured: true,
        publishedDate: new Date("2022-11-18"),
        content: "The architectural profession has undergone a dramatic transformation as digital tools continue to evolve. Today's practitioners have access to technologies that are reshaping every aspect of the design and construction process.\n\n## Advanced Building Information Modeling (BIM)\n\nBIM has moved beyond basic 3D modeling to become a comprehensive platform for project development and management. New capabilities include:\n\n- **Generative design:** Algorithms that can produce and evaluate thousands of design options based on specified parameters\n- **Real-time collaboration:** Multiple team members working simultaneously on different aspects of a single model\n- **Enhanced analysis:** Integrated simulation for energy performance, daylighting, acoustics, and other critical factors\n- **Digital twin creation:** Detailed models that continue to serve building management needs throughout a structure's lifecycle\n\n## Virtual and Augmented Reality\n\nImmersive technologies are transforming client communication and design development:\n\n- VR allows clients to experience spaces before construction begins, improving decision-making and reducing changes during construction\n- AR applications overlay digital information onto physical sites or scale models, creating powerful hybrid presentation tools\n- These technologies are becoming increasingly accessible through web-based platforms that don't require specialized hardware\n\n## Computational Design\n\nParametric and computational approaches are enabling new forms of architectural expression and problem-solving:\n\n- Complex geometries that would be challenging to document through traditional methods\n- Optimization of structural systems for material efficiency\n- Facade designs that respond precisely to environmental factors\n- Custom algorithms that address specific project challenges\n\n## Fabrication Integration\n\nThe gap between digital design and physical construction continues to narrow:\n\n- Direct digital fabrication allows complex components to move straight from design to production\n- Robotic construction systems are becoming more adaptable and accessible\n- 3D printing at architectural scales offers new possibilities for form and materiality\n\n## Looking Forward\n\nAs these tools continue to evolve, the architect's role is shifting toward orchestrating increasingly complex systems and information. While technology provides powerful capabilities, the core architectural skills of synthesis, judgment, and human-centered design remain essential in leveraging these tools effectively."
      }
    ];

    // Insert sample projects
    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Insert sample articles
    sampleArticles.forEach(article => {
      this.createArticle(article);
    });
  }
}

export const storage = new MemStorage();
