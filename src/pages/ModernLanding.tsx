import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, Users, Bot, MapPin, Video, Shield, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Support',
      description: 'Smart campus assistant and syllabus-aware AI teacher for instant help'
    },
    {
      icon: MapPin,
      title: 'QR Navigation',
      description: 'Scan QR codes for instant campus navigation and location-based services'
    },
    {
      icon: Video,
      title: 'Digital Learning',
      description: 'Access lecture videos and digital resources anytime, anywhere'
    },
    {
      icon: Shield,
      title: 'Secure & Role-Based',
      description: 'Multi-role dashboards with secure, department-level access control'
    },
    {
      icon: Zap,
      title: 'Smart Routing',
      description: 'Automatic ticket routing and escalation based on issue type and priority'
    },
    {
      icon: Users,
      title: 'Complete Workflow',
      description: 'End-to-end campus operations from request to resolution'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background" style={{ minHeight: '638px' }}>
        {/* Background Decorative Element */}
        <div 
          className="absolute w-36 h-36 rounded-full bg-primary" 
          style={{ 
            left: '438px',
            top: '-98px'
          }}
        />

        {/* Navbar */}
        <nav className="flex justify-between items-center px-32 py-6 relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" alt="Campus Aid Buddy" className="w-16 h-16" />
            <span className="text-2xl font-semibold text-foreground font-sans">
              Campus Aid Buddy
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="#features" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#about" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#support" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              Support
            </a>
            <a href="#contact" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => navigate('/auth')}
            className="px-6 py-3 font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            Get Started
          </Button>
        </nav>

        {/* Hero Content */}
        <div className="flex justify-center items-end px-32 pb-0" style={{ minHeight: '518px' }}>
          {/* Left Content */}
          <div className="flex flex-col justify-center py-16 pr-12" style={{ width: '457px' }}>
            {/* Section Heading */}
            <div className="flex flex-col gap-4 mb-12">
              <h2 className="text-xl font-normal text-secondary">
                Smart Campus Support Platform
              </h2>
              <h1 className="text-5xl font-bold leading-tight text-foreground">
                Transform Your Campus Operations
              </h1>
              <p className="text-base font-normal leading-relaxed text-muted-foreground">
                Streamline student services, academic support, and campus workflows with AI-powered assistance, QR navigation, and role-based dashboards.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-5">
              <Button 
                onClick={() => navigate('/auth')}
                className="px-14 py-3 font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/auth')}
                className="px-9 py-3 font-bold border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative" style={{ width: '687px', height: '487px' }}>
            <img 
              src="/new image .jpeg" 
              alt="Campus Aid Buddy Platform" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-32 bg-card">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for modern campus management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="p-8 rounded-2xl bg-muted hover:bg-accent transition-colors">
                <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-secondary">
                  <IconComponent className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-32 bg-primary">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground">
            Join thousands of students and staff already using Campus Aid Buddy
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="px-12 py-4 text-lg font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-32 bg-card border-t border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" alt="Campus Aid Buddy" className="w-12 h-12" />
            <span className="text-xl font-semibold text-foreground">
              Campus Aid Buddy
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Campus Aid Buddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}