import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CampusAIService, AIResponse } from '@/services/campusAIService';
import { Bot, Send, User, HelpCircle, MapPin, Phone, Building } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'info' | 'routing' | 'faq' | 'facility';
  suggestedActions?: string[];
  timestamp: Date;
}

export default function CampusAIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Campus AI Assistant. I can help you with:\n• Department locations and contacts\n• Campus facility information\n• Procedure guidance\n• Emergency contacts\n\nHow can I assist you today?",
      type: 'info',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "Where is the library?",
    "How do I submit a complaint?",
    "Computer Science department contact",
    "Emergency contacts",
    "Hostel information",
    "Transport schedules"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Process with Campus AI Service
    setTimeout(() => {
      const response: AIResponse = CampusAIService.processQuery(input);
      
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.message,
        type: response.type,
        suggestedActions: response.suggestedActions,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleSuggestedAction = (action: string) => {
    // Handle suggested actions
    console.log('Suggested action:', action);
  };

  return (
    <DashboardLayout
      title="Campus AI Assistant"
      subtitle="Get instant help with campus information and procedures"
    >
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat Section */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>Campus AI Assistant</CardTitle>
                <CardDescription>Rule-based campus information system</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.suggestedActions && message.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestedActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestedAction(action)}
                            className="text-xs"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about campus facilities, departments, or procedures..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => handleQuickQuestion(question)}
                >
                  <span className="line-clamp-2">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { label: 'Security', number: '100' },
                  { label: 'Medical', number: '102' },
                  { label: 'Admin Office', number: '0422-123456' },
                  { label: 'Hostel Warden', number: '0422-123457' }
                ].map((contact) => (
                  <div key={contact.label} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm font-medium">{contact.label}</span>
                    <Badge variant="outline">{contact.number}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campus Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Campus Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Library Hours:</strong> 8 AM - 8 PM</p>
                <p><strong>Cafeteria:</strong> 7 AM - 9 PM</p>
                <p><strong>Admin Office:</strong> 9 AM - 5 PM</p>
                <p><strong>Transport:</strong> 6 AM - 10 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}