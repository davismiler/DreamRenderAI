import React, { memo } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import landingImage from '../assets/images/landing1.webp';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
          <Sparkles className="w-4 h-4 text-blue-400" />
          AI-Powered Creation
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-foreground tracking-tight">
          Create Stunning <br />
          <span className="ai-gradient-text">
            AI Images Instantly
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 font-light leading-relaxed">
          Transform your imagination into breathtaking visuals with our cutting-edge
          AI technology. Professional-quality images in seconds.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/generator"
            className="w-full sm:w-auto inline-flex items-center justify-center ai-gradient hover:opacity-90 text-white font-medium py-3.5 px-10 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Generate Now
          </Link>
          <Link
            to="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 font-medium text-gray-300 glass-card rounded-2xl hover:bg-gray-800/50 transition-colors duration-300"
          >
            View Gallery
          </Link>
        </div>
      </div>
      
      {/* Landing Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="relative group">
          <div className="glowing-card rounded-3xl overflow-hidden">
            <img
              src={landingImage}
              alt="AI Image Generation"
              className="w-full h-auto object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-semibold text-pink-400">1M+</p>
            <p className="mt-1 text-gray-300 font-light">Images Generated</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-purple-400">50K+</p>
            <p className="mt-1 text-gray-300 font-light">Happy Users</p>
          </div>
          <div>
            <p className="text-4xl font-semibold text-blue-400">99.9%</p>
            <p className="mt-1 text-gray-300 font-light">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);