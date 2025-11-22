import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIImageGenerator from './components/AIImageGenerator';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GalleryPage from './components/GalleryPage';

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generator" element={<AIImageGenerator />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;