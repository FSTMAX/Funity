import { CCUCounter } from './CCUCounter';
import gamingBg from '@/assets/gaming-bg.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gamingBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Studio Title */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-gradient">Funity</span>
            <span className="text-foreground"> Studios</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Crafting immersive gaming experiences on Roblox. 
            Building worlds where millions of players connect, compete, and create memories.
          </p>
        </div>

        {/* CCU Counter */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CCUCounter />
        </div>

        {/* Call to Action */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg transition-gaming hover:scale-105 glow-primary"
            onClick={() => {
              const section = document.getElementById("games");
              section?.scrollIntoView({ behavior: "smooth" });
            }}>
              View Our Games
            </button>
            <button className="px-8 py-4 border border-accent text-accent rounded-lg font-semibold text-lg transition-gaming hover:bg-accent hover:text-accent-foreground hover:scale-105"
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}>
              Partner With Us
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </section>
  );
}