import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Menu, X, Phone, Mail, Tractor } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, profile } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Farm For Me', path: '/farm-for-me' },
    { name: 'Services', path: '/services' },
    { name: 'Operations', path: '/operations' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Contact Strip */}
      <div className="bg-[var(--color-primary-dark)] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center"><Mail className="w-3 h-3 mr-2" /> info@edoakfarms.com</span>
            <span className="flex items-center"><Mail className="w-3 h-3 mr-2" /> contact@edoakfarms.com</span>
          </div>
          <div className="flex space-x-6">
            <span className="flex items-center"><Phone className="w-3 h-3 mr-2" /> +233 59 396 3047</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="EdOak Farms" className="h-10 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                  isActive(link.path) ? 'text-[var(--color-accent)]' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link to={profile?.role === 'admin' || user?.email === 'denacquah5@gmail.com' ? '/admin' : '/dashboard'}>
                <Button variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-slate-50 text-[var(--color-accent)]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[var(--color-accent)]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-2 px-3">
            {user ? (
              <Link to={profile?.role === 'admin' || user?.email === 'denacquah5@gmail.com' ? '/admin' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full" variant="outline">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full" variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
