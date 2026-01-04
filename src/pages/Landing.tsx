import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HelpCircle, 
  Bell, 
  MapPin, 
  Ticket, 
  ArrowRight,
  GraduationCap,
  Clock,
  Zap,
  CheckCircle,
} from 'lucide-react';

const quickActions = [
  { icon: HelpCircle, label: 'Submit Help Request', path: '/submit', description: 'Get assistance with any issue' },
  { icon: Bell, label: 'Campus Notices', path: '/notices', description: 'Stay updated with announcements' },
  { icon: MapPin, label: 'QR Navigation', path: '/navigate', description: 'Find your way around campus' },
  { icon: Ticket, label: 'Track Tickets', path: '/tickets', description: 'Monitor your request status' },
];

const features = [
  { icon: Clock, title: '24/7', subtitle: 'Available Support' },
  { icon: Zap, title: 'Instant', subtitle: 'Auto Responses' },
  { icon: CheckCircle, title: 'Real-time', subtitle: 'Status Updates' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img src="/Campus_Aid_Buddyy_Logo_with_Open_Hand_Icon-removebg-preview.png" alt="Campus Aid Buddy" className="w-10 h-10" />
            </div>
            <span className="font-bold text-xl text-foreground">Campus Aid Buddy</span>
          </div>
          <Link to="/auth">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-secondary border-b border-border pb-2 inline-block">
                Smart Campus Platform
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Campus support,{' '}
                <span className="text-primary">simplified</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Submit requests, track tickets, and navigate campus with our streamlined platform built for students and administrators.
              </p>
            </div>

            {/* Feature Stats */}
            <Card className="bg-accent border-2 border-foreground/5">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <p className="text-2xl lg:text-3xl font-bold text-foreground">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Link to="/auth">
              <Button variant="hero" size="xl" className="gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Quick Actions */}
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <Link key={index} to="/auth">
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-border hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent group-hover:bg-primary/10 transition-colors">
                        <action.icon className="w-6 h-6 text-accent-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything you need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete campus support ecosystem designed to make your academic life easier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground">Smart Ticketing</h3>
              <p className="text-muted-foreground">
                Submit complaints, requests, and issues with automatic routing to the right department.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground">AI Teacher</h3>
              <p className="text-muted-foreground">
                Get syllabus-aware answers to your academic questions from our intelligent assistant.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground">QR Navigation</h3>
              <p className="text-muted-foreground">
                Scan QR codes to navigate campus buildings and get directions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 Campus Aid Buddy. Built for better campus experiences.</p>
        </div>
      </footer>
    </div>
  );
}