import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useTickets } from '@/contexts/TicketContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';
import { TicketCategory } from '@/types';
import { departments, ticketCategories } from '@/data/campusLocations';
import { MapPin, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubmitRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createTicket, isLoading } = useTickets();
  const { location, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    rollNumber: user?.rollNumber || '',
    department: user?.department || '',
    email: user?.email || '',
    category: '' as TicketCategory | '',
    description: '',
  });

  // Auto-capture location on mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.category || !formData.description || !formData.department) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const ticket = await createTicket({
        title: `${ticketCategories.find(c => c.id === formData.category)?.label} - ${formData.department}`,
        description: formData.description,
        category: formData.category as TicketCategory,
        department: formData.department,
        location: location || undefined,
      });

      toast({
        title: 'Request submitted!',
        description: `Your ticket #${ticket.ticketNumber} has been created.`,
      });

      navigate('/tickets');
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout
      title="Submit Help Request"
      subtitle="Submit a new campus support request and receive instant automated response"
    >
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Help Request Form</CardTitle>
          <CardDescription>
            Submit your campus issue and get instant response
          </CardDescription>
          
          {/* Location Status */}
          <div className="mt-4">
            {locationLoading ? (
              <div className="flex items-center gap-2 text-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Capturing location...</span>
              </div>
            ) : location ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Location captured successfully</span>
              </div>
            ) : locationError ? (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{locationError}</span>
                <Button variant="link" size="sm" onClick={getLocation}>
                  Retry
                </Button>
              </div>
            ) : null}
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Roll Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  placeholder="e.g., 987654321"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                />
              </div>
            </div>

            {/* Department & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(v) => setFormData({ ...formData, department: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="e.g., Computer Science" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@campus.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Request Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(v) => setFormData({ ...formData, category: v as TicketCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select request category" />
                </SelectTrigger>
                <SelectContent>
                  {ticketCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your issue in detail..."
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload Image (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center gap-4">
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <span className="text-sm text-muted">No file chosen</span>
              </div>
            </div>

            {/* Location Info */}
            {location && (
              <div className="bg-accent/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Location Attached</p>
                    <p className="text-sm text-muted">
                      {location.address || `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
                    </p>
                    {location.campusZone && (
                      <p className="text-sm text-primary">{location.campusZone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
