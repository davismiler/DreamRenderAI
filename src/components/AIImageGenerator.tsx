// src/components/AIImageGenerator.tsx
import React, { useState } from 'react';
import { Download, Loader2, Sparkles } from 'lucide-react';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [model, setModel] = useState('img3');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const generateImage = async () => {
    // This function's logic remains the same
    if (!prompt.trim()) return;
    setLoading(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    // Use environment variable if set, otherwise use proxy in dev or direct URL in production
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 
      (import.meta.env.DEV ? '/api' : 'https://api.infip.pro');
    const url = `${apiBaseUrl}/v1/images/generations`;
    const headers = { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" };
    const payload = { model: model, prompt: prompt, n: 1, size: size };
    try {
      const response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(payload) });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const newImage: GeneratedImage = { id: Date.now().toString(), url: data.data[0].url, prompt: prompt };
        setImages(prev => [newImage, ...prev]);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (imageUrl: string, prompt: string) => {
    // This function's logic remains the same
    try {
      const imagePath = new URL(imageUrl).pathname;
      // Use environment variable if set, otherwise use proxy in dev or direct URL in production
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 
        (import.meta.env.DEV ? '/api' : 'https://api.infip.pro');
      const proxiedUrl = `${apiBaseUrl}${imagePath}`;
      const response = await fetch(proxiedUrl);
      if (!response.ok) { throw new Error(`Failed to download image: ${response.statusText}`); }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="min-h-screen text-foreground relative">
      {/* Updated: Responsive padding and vertical spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header */}
        {/* Updated: Responsive font sizes and margins */}
        <header className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight ai-gradient-text">
            Dream Render
            </h1>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Create beautiful imagery with the power of artificial intelligence
          </p>
        </header>

        {/* Generation Form */}
        {/* Updated: Responsive margins and padding */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="space-y-6">
              
              {/* Prompt Input */}
              <div>
                <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your vision
                </label>
                <input
                  id="prompt-input"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A serene landscape with cherry blossoms..."
                  className="w-full text-base sm:text-lg placeholder-gray-500 bg-gray-800/50 border-2 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-2xl px-5 py-3.5 transition-all duration-300 text-foreground"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && generateImage()}
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="size-select" className="block text-sm font-medium text-gray-300 mb-2">
                    Image Size
                  </label>
                  <select
                    id="size-select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none py-3.5 px-5 rounded-2xl transition-all duration-300 text-foreground appearance-none"
                    disabled={loading}
                  >
                    <option value="1024x1024">1024 × 1024</option>
                    <option value="1792x1024">1792 × 1024</option>
                    <option value="1024x1792">1024 × 1792</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="model-select" className="block text-sm font-medium text-gray-300 mb-2">
                    AI Model
                  </label>
                  <select
                    id="model-select"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none py-3.5 px-5 rounded-2xl transition-all duration-300 text-foreground appearance-none"
                    disabled={loading}
                  >
                    <option value="img3">Imagen 3</option>
                    <option value="img4">Imagen 4</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              {/* Updated: Full-width on mobile, auto-width on larger screens */}
              <div className="pt-4">
                <button
                  onClick={generateImage}
                  disabled={loading || !prompt.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center ai-gradient hover:opacity-90 text-white font-medium text-base py-3.5 px-10 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {loading ? 'Generating...' : 'Generate Image'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center mb-12">
            <div className="glass-card rounded-3xl p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                <span className="text-lg font-light text-gray-300">Creating your masterpiece</span>
              </div>
              <div className="w-full h-2 bg-gray-700 mx-auto rounded-full overflow-hidden">
                <div className="h-full ai-gradient animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Images Grid */}
        {images.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-light mb-4 ai-gradient-text">
                Your Creations
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
            </div>
            
            {/* Updated: Responsive grid gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {images.map((image) => (
                <div key={image.id} className="group glowing-card">
                  <div className="glass-card rounded-3xl p-4 sm:p-5 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                    <div className="aspect-square relative overflow-hidden rounded-2xl mb-4">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-gray-300 font-light text-sm line-clamp-2 leading-relaxed">
                        {image.prompt}
                      </p>
                      
                      <button
                        onClick={() => downloadImage(image.url, image.prompt)}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium group/button"
                      >
                        <Download className="w-4 h-4 group-hover/button:animate-bounce" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg mx-auto">
              <h3 className="text-2xl font-light mb-4 ai-gradient-text">
                Ready to Create
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-300 font-light leading-relaxed">
                Enter your creative vision above and let AI transform your ideas into beautiful imagery
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIImageGenerator;