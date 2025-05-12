import { Link } from "wouter";
import { companyInfo } from "@/lib/utils";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Globe
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-heading font-bold">
                DD <span className="text-secondary">Architecture</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              Creating innovative architectural solutions that transform spaces and enhance lives since 2005.
            </p>
            <div className="flex space-x-4">
              <a 
                href={companyInfo.social.facebook} 
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={companyInfo.social.instagram} 
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={companyInfo.social.linkedin} 
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={companyInfo.social.pinterest} 
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Pinterest"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-secondary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-secondary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Residential Architecture
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Commercial Architecture
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Urban Planning
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Sustainable Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Renovation & Restoration
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold mb-6">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-secondary mr-3 mt-1 shrink-0" size={18} />
                <span className="text-gray-300">
                  {companyInfo.address.street}, {companyInfo.address.area}, {companyInfo.address.city}, {companyInfo.address.state}, {companyInfo.address.zip}
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="text-secondary mr-3 mt-1 shrink-0" size={18} />
                <span className="text-gray-300">{companyInfo.contact.phone}</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-secondary mr-3 mt-1 shrink-0" size={18} />
                <span className="text-gray-300">{companyInfo.contact.email}</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-secondary mr-3 mt-1 shrink-0" size={18} />
                <span className="text-gray-300">
                  Mon - Fri: {companyInfo.hours.weekdays}<br />
                  Sat: {companyInfo.hours.saturday}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} DD Architecture. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
