// src/components/Header.tsx
import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/generator', label: 'Generator' },
    { href: '/gallery', label: 'Gallery' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 font-light text-sm transition-all duration-300 rounded-md ${
      isActive
        ? 'text-blue-400 bg-blue-500/20 shadow-sm'
        : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2.5 font-light text-base transition-all duration-300 rounded-lg ${
      isActive
        ? 'text-blue-400 bg-blue-500/20 shadow-sm'
        : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
    }`;

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-white/10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="font-semibold text-xl text-foreground tracking-tight group-hover:text-blue-400 transition-colors">
              Dream<span className="ai-gradient-text">Render</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.label} to={link.href} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-500/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 animate-slideDown">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={mobileLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
