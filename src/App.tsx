import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ticket as TicketIcon, 
  Sparkles, 
  Download, 
  Share2, 
  Heart, 
  Image as ImageIcon,
  ChevronRight,
  Github,
  Twitter,
  Instagram
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Ticket } from './components/Ticket';
import { Editor } from './components/Editor';
import { AnimatedIcon } from './components/AnimatedIcon';
import { type TicketData, type TicketType, TEMPLATES } from './types';

export default function App() {
  const [currentTicket, setCurrentTicket] = useState<TicketData>({
    id: Math.random().toString(36).substr(2, 9),
    type: 'movie',
    title: 'Interstellar',
    subtitle: 'Retro Cinema',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    location: 'Galaxy Theater',
    seat: 'H-12',
    color: '#fce4ec',
    accentColor: '#f06292',
    icon: 'Film',
    timestamp: Date.now(),
  });

  const [gallery, setGallery] = useState<TicketData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ticket-gallery');
    if (saved) {
      setGallery(JSON.parse(saved));
    }
  }, []);

  const saveToGallery = (ticket: TicketData) => {
    const newGallery = [ticket, ...gallery].slice(0, 20);
    setGallery(newGallery);
    localStorage.setItem('ticket-gallery', JSON.stringify(newGallery));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fce4ec', '#f3e5f5', '#e3f2fd', '#fff9c4']
    });

    const newTicket = {
      ...currentTicket,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    
    saveToGallery(newTicket);
    setTimeout(() => setIsGenerating(false), 1000);
  };

  const downloadTicket = async () => {
    if (ticketRef.current === null) return;
    
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fce4ec', '#f3e5f5', '#e3f2fd', '#fff9c4']
      });
      
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `ticket-${currentTicket.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-pink-100 relative overflow-hidden">
      {/* Subtle Moving Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, 50, 100, 0],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-pink-200/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 100, -50, 0],
            rotate: [0, -90, -180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-blue-200/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, 50, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-purple-200/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-20 w-[400px] h-[400px] bg-yellow-100/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-100 clay"
          >
            <AnimatedIcon name="TicketIcon" size={24} />
          </motion.div>
          <span className="font-display font-bold text-xl tracking-tight">Ticket to Memory</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium opacity-70">
          <a href="#create" className="hover:opacity-100 transition-opacity">Create</a>
          <a href="#gallery" className="hover:opacity-100 transition-opacity">Gallery</a>
          <a href="#templates" className="hover:opacity-100 transition-opacity">Templates</a>
        </nav>
        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform active:clay-pressed clay">
          Get Premium
        </button>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 py-20 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-pink-500 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              <span>Make Memories Tangible</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
              Your Memories, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                Stubbed in Style
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              Create aesthetic ticket stubs for your favorite memories. 
              From movies to travels, turn every moment into a collectible digital keepsake.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href="#create" 
                className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 clay active:clay-pressed"
              >
                Generate Ticket <AnimatedIcon name="ChevronRight" size={20} />
              </a>
              <button className="w-full md:w-auto clay px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white transition-all active:clay-pressed">
                View Gallery
              </button>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl mb-4">How It Works</h2>
            <p className="text-gray-500">Four simple steps to eternalize your moments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create', desc: 'Choose a template (Movie, Show, Train, Plane).' },
              { step: '02', title: 'Edit', desc: 'Customize fonts, colors, icons, and layouts.' },
              { step: '03', title: 'Export', desc: 'Download high-res stubs instantly.' },
              { step: '04', title: 'Share', desc: 'Post on social media or save locally.' },
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-[2rem] clay hover:scale-105 transition-transform group">
                <div className="text-4xl font-display font-black text-pink-100 group-hover:text-pink-200 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section */}
        <section id="create" className="px-6 py-20 bg-white/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Preview */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-3xl">Live Preview</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={downloadTicket}
                    className="p-3 rounded-xl glass hover:bg-white transition-all text-gray-600 clay"
                    title="Download PNG"
                  >
                    <AnimatedIcon name="Download" size={20} />
                  </button>
                  <button className="p-3 rounded-xl glass hover:bg-white transition-all text-gray-600 clay">
                    <AnimatedIcon name="Share2" size={20} />
                  </button>
                </div>
              </div>
              
              <motion.div 
                className="relative group"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div ref={ticketRef} className="relative">
                  <Ticket data={currentTicket} />
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-pink-400">100%</div>
                  <div className="text-[10px] uppercase font-bold opacity-50">Customizable</div>
                </div>
                <div className="glass p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-purple-400">4K</div>
                  <div className="text-[10px] uppercase font-bold opacity-50">High Res</div>
                </div>
                <div className="glass p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-blue-400">∞</div>
                  <div className="text-[10px] uppercase font-bold opacity-50">Memories</div>
                </div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="lg:col-span-5">
              <Editor 
                data={currentTicket} 
                onChange={setCurrentTicket} 
                onGenerate={handleGenerate}
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="px-6 py-20 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display font-bold text-3xl mb-2">Your Collection</h2>
              <p className="text-gray-500">A timeline of your most aesthetic moments.</p>
            </div>
            <button className="text-pink-500 font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>

          {gallery.length === 0 ? (
            <div className="glass border-dashed border-2 p-20 rounded-[2rem] text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <ImageIcon size={32} />
              </div>
              <p className="text-gray-400 font-medium">Your gallery is empty. Create your first ticket!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {gallery.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group"
                  >
                    <Ticket data={ticket} className="scale-90 hover:scale-95 transition-transform origin-left" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white rounded-full shadow-lg text-pink-500 hover:scale-110 transition-transform">
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Templates Section */}
        <section id="templates" className="px-6 py-20 bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-4xl mb-4">Premium Templates</h2>
              <p className="text-gray-400">Unlock exclusive designs for every occasion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(['movie', 'show', 'train', 'plane'] as TicketType[]).map((type) => (
                <div key={type} className="clay p-6 rounded-3xl hover:bg-white/10 transition-all group border border-white/10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TicketIcon size={24} className="text-pink-400" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 capitalize">{type} Pack</h3>
                  <p className="text-sm text-gray-500 mb-6">12+ unique retro-inspired layouts for your {type} memories.</p>
                  <button className="w-full py-3 rounded-xl border border-white/20 text-sm font-bold hover:bg-white hover:text-black transition-all">
                    Unlock Pack
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
                <TicketIcon size={18} />
              </div>
              <span className="font-display font-bold text-lg">Ticket to Memory</span>
            </div>
            <p className="text-sm text-gray-500">
              Making memories tangible, one aesthetic stub at a time. Designed for the nostalgic soul.
            </p>
            <div className="flex gap-4">
              <Twitter size={20} className="text-gray-400 hover:text-black cursor-pointer" />
              <Instagram size={20} className="text-gray-400 hover:text-black cursor-pointer" />
              <Github size={20} className="text-gray-400 hover:text-black cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black">Templates</a></li>
              <li><a href="#" className="hover:text-black">Premium</a></li>
              <li><a href="#" className="hover:text-black">Gallery</a></li>
              <li><a href="#" className="hover:text-black">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black">About Us</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Privacy</a></li>
              <li><a href="#" className="hover:text-black">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get notified about new template drops.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-pink-200 outline-none"
              />
              <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 Ticket to Memory. All rights reserved. Built with whimsy.
        </div>
      </footer>

      {/* Generation Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto"
              />
              <p className="font-display font-bold text-xl animate-pulse">Stubbing your memory...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
