import { ChevronDown, Palette, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const scrollToNext = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Main heading */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Draw.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient">
                Collaborate.
              </span>{' '}
              Create.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A minimalist, real-time whiteboard for creative minds. 
              Sketch, brainstorm, and bring ideas to life together.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">Real-time Sync</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium">Team Collaboration</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
              <Palette className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700 font-medium">Intuitive Tools</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href='/signin'>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300" >
              Start Doodling
            </button>
            </Link>
            <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Join Room
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="cursor-pointer animate-fade-in" style={{ animationDelay: '0.8s' }} onClick={scrollToNext}>
            <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors duration-300">
              <span className="text-sm font-medium mb-2">Discover How</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas mockup */}
      <div className="absolute bottom-0 right-0 w-80 h-60 bg-white/80 backdrop-blur-sm rounded-tl-3xl border-l border-t border-gray-200 hidden lg:block animate-slide-in-right">
        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-blue-300 rounded animate-expand" style={{ animationDelay: '1s' }}></div>
            <div className="h-2 bg-purple-300 rounded animate-expand" style={{ animationDelay: '1.5s' }}></div>
            <div className="h-2 bg-pink-300 rounded animate-expand" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;