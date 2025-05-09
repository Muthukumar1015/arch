import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-0 h-screen flex items-center bg-light">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Modern architectural building" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            We craft spaces that inspire
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Award-winning architecture and interior design studio creating innovative, sustainable and aesthetic solutions worldwide.
          </p>
          <Link href="/projects" className="btn-primary">
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
