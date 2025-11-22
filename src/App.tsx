import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Loader2 } from 'lucide-react';

// Lazy load components for code splitting
const HomePage = lazy(() => import('./components/HomePage'));
const AIImageGenerator = lazy(() => import('./components/AIImageGenerator'));
const GalleryPage = lazy(() => import('./components/GalleryPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-col min-h-screen w-full font-sans relative">
        {/* Dark Horizon Glow - Base Background Layer */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generator" element={<AIImageGenerator />} />
                <Route path="/gallery" element={<GalleryPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;