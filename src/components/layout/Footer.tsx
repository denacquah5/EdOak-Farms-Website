import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded flex items-center justify-center">
                <span className="text-white font-serif font-bold">EF</span>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                EdOak Farms
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              A fully integrated agricultural platform offering managed farm investments, commercial production, and value-added processing in Ghana.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[var(--color-accent)] transition-colors">About Us</Link></li>
              <li><Link to="/farm-for-me" className="hover:text-[var(--color-accent)] transition-colors">Farm For Me</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Our Services</Link></li>
              <li><Link to="/operations" className="hover:text-[var(--color-accent)] transition-colors">Operations</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Commercial Farming</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Processing & Value Addition</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Farm Management</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Agricultural Consulting</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-accent)] transition-colors">Produce Supply & Logistics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span>Accra, Ghana<br/>(Head Office)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <span>+233 59 396 3047</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--color-accent)] shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:info@edoakfarms.com" className="hover:text-white transition-colors">info@edoakfarms.com</a>
                  <a href="mailto:contact@edoakfarms.com" className="hover:text-white transition-colors">contact@edoakfarms.com</a>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} EdOak Farms. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
