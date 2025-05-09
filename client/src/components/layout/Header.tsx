import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Articles", path: "/articles" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "fixed w-full bg-white z-50 transition-all duration-300",
      isScrolled ? "shadow-md py-2" : "py-3"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-wider">
          Deva<span className="text-accent"> Architecture</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={cn(
                    "text-sm uppercase tracking-wider font-semibold transition-colors", 
                    location === link.path ? "text-accent" : "hover:text-accent"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-xl" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <nav className={cn(
        "bg-white w-full transition-all duration-300 overflow-hidden md:hidden",
        isMenuOpen ? "max-h-[300px] border-t border-gray-100" : "max-h-0"
      )}>
        <ul className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                href={link.path} 
                className={cn(
                  "block text-sm uppercase tracking-wider font-semibold transition-colors", 
                  location === link.path ? "text-accent" : "hover:text-accent"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
