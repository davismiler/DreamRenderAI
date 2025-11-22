import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-card py-12 relative overflow-hidden border-t border-white/10">
      {/* Decorative Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center space-y-6 px-4 text-center">
        {/* Divider Line */}
        <div className="w-16 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>

        {/* Designed By Credit */}
        <p className="text-sm text-gray-400 tracking-wider">
          DESIGNED BY{' '}
          <a
            href="https://github.com/davismiler"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:text-blue-400 transition-colors duration-300"
          >
            davismiler
          </a>
        </p>
        {/* Social Links */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/davismiler"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

        {/* Bottom Tags */}
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          Dream Render • <span className="ai-gradient-text">Limited Edition</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
