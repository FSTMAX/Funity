import { Heart, Github, Twitter, Mail, Hammer } from 'lucide-react';
import { RobloxIcon } from "@/components/icons/RobloxIcon";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Studio Info */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Funity Studios
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Creating immersive gaming experiences that bring players together 
              from around the world. Building the future of social gaming on Roblox.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://x.com/FunityStudios"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.roblox.com/communities/383340867/Funity" 
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <RobloxIcon className="w-5 h-5" />
              </a>
              <a 
                href="mailto:funity.contact@gmail.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
           {/* <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#games" className="hover:text-primary transition-colors">
                  Our Games
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>*/}
          </div>

          {/* Newsletter */}
{/*          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Get notified about our latest game releases and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-background/50 border border-border/50 rounded-md focus:border-primary transition-colors text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
*/}        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © 2025 Funity Studios. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            {/*<span>Made with</span>*/}
            {/*<Heart className="w-4 h-4 text-red-500" />*/}
            <Hammer className="w-4 h-4" />
            <span>Made by</span>
            <a href="https://www.roblox.com/users/472381529/profile" target="_blank" className="hover:text-primary transition-colors">FSTMAX</a>
          </div>
        </div>
      </div>
    </footer>
  );
}