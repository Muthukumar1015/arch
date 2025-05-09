import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function About() {
  const teamMembers = [
    {
      name: "Sofia Rossi",
      position: "Principal Architect & Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Marcus Chen",
      position: "Design Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Elena Kowalski",
      position: "Interior Design Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "James Patel",
      position: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Architecture+Design</title>
        <meta 
          name="description" 
          content="Learn about Architecture+Design, our values, our team of professionals, and our approach to creating inspirational spaces."
        />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-20">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl mb-6">
                  Founded in 2005, Architecture+Design has grown from a small studio in Milan to an internationally recognized practice with a global portfolio of award-winning projects.
                </p>
                <p className="text-gray-600 mb-6">
                  Our journey began with a simple vision: to create spaces that inspire and elevate the human experience. Today, that vision continues to drive our work across residential, commercial, cultural, and public realms.
                </p>
                <p className="text-gray-600">
                  We believe that thoughtful design has the power to transform lives and communities. Every project, regardless of scale or budget, receives our full creative attention and technical expertise.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Our design team collaborating" 
                  className="w-full h-auto rounded-md shadow-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-md">
                <h3 className="font-display text-xl font-bold mb-4">Design Excellence</h3>
                <p className="text-gray-600">
                  We pursue creative solutions that balance beauty, functionality, and technical innovation. Our designs aim to create meaningful connections between people, buildings, and their surroundings.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-md">
                <h3 className="font-display text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  Environmental responsibility is integral to our practice. We design with the future in mind, embracing strategies and technologies that minimize ecological impact and maximize resource efficiency.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-md">
                <h3 className="font-display text-xl font-bold mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  Great design emerges from dialogue. We foster collaborative relationships with clients, consultants, builders, and communities to create outcomes that exceed expectations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-bold mb-10 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 overflow-hidden rounded-full">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 object-cover mx-auto"
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center bg-gray-50 p-12 rounded-md">
            <h2 className="font-display text-3xl font-bold mb-4">Let's Create Something Extraordinary</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for new challenges and collaborations. Contact us to discuss how we can help bring your vision to life.
            </p>
            <Link href="/contact">
              <button className="btn-primary">Get in Touch</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
