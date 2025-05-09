import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">
              Architecture<span className="text-accent">+</span>Design
            </h3>
            <p className="text-gray-400 mb-6">
              Creating inspiring spaces that transform how people live, work, and experience the built environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-accent">Home</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-accent">Projects</Link></li>
              <li><Link href="/articles" className="text-gray-400 hover:text-accent">Articles</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-accent">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/projects/category/commercial" className="text-gray-400 hover:text-accent">Architecture</Link></li>
              <li><Link href="/projects/category/interior" className="text-gray-400 hover:text-accent">Interior Design</Link></li>
              <li><Link href="/projects/category/commercial" className="text-gray-400 hover:text-accent">Urban Planning</Link></li>
              <li><Link href="/projects/category/commercial" className="text-gray-400 hover:text-accent">Landscape Design</Link></li>
              <li><Link href="/projects/category/sustainable" className="text-gray-400 hover:text-accent">Sustainable Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>123 Design Street, Milan, Italy</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span>info@architectureplus.design</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Architecture+Design. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-400">Cookies Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
