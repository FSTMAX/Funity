import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Handshake, Zap } from 'lucide-react';

const contactTypes = [
  {
    icon: Handshake,
    title: 'Partnership Opportunities',
    description: 'Collaborate with us on exciting gaming projects and cross-promotions.',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'Business Inquiries',
    description: 'Discuss licensing, publishing, or custom game development services.',
    color: 'text-secondary'
  },
  {
    icon: MessageSquare,
    title: 'General Questions',
    description: 'Get in touch for any other questions or feedback about our games.',
    color: 'text-accent'
  }
];

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient" id="contact">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to partner with us or have questions about our games? 
            We're always excited to hear from fellow creators and gaming enthusiasts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Types */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              How We Can Help
            </h3>
            
            {contactTypes.map((type, index) => (
              <Card 
                key={type.title}
                className="bg-gradient-card border-border/50 transition-gaming hover:scale-105 hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <type.icon className={`w-6 h-6 ${type.color}`} />
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {type.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}

            {/* Direct Contact */}
            <div className="mt-8 p-6 bg-card rounded-lg border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-semibold">Direct Contact</span>
              </div>
              <p className="text-muted-foreground mb-2">
                For urgent matters or direct communication:
              </p>
              <a 
                href="mailto:funity.contact@gmail.com" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                funity.contact@gmail.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50">
            <form
              action="https://formspree.io/f/xblkvpdy"
              method="POST"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Tell us about your project or inquiry and we'll get back to you soon.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Name
                    </label>
                    <Input 
                      name="name"
                      placeholder="John Doe"
                      required // <-- must be filled
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      required // <-- must be filled
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    required // <-- must select an option
                    className="w-full p-3 bg-background/50 border border-border/50 rounded-md focus:border-primary transition-colors text-foreground"
                  >
                    <option value="">Select an option</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="business">Business Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
                    required
                    minLength={20}
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:scale-105 group-hover:glow-primary transition-gaming glow-primary text-lg py-3"
                >
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24-48 hours during business days.
                </p>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}