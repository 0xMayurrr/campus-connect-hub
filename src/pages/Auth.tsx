import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Loader2, Sun, Moon, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roles: { value: UserRole; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'teaching_staff', label: 'Teaching Staff' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'department_staff', label: 'Department Staff' },
  { value: 'hod', label: 'Head of Department' },
  { value: 'admin', label: 'Administrator' },
  { value: 'hostel_warden', label: 'Hostel Warden' },
  { value: 'security_staff', label: 'Security Staff' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'transport_officer', label: 'Transport Officer' },
  { value: 'lab_assistant', label: 'Lab Assistant' },
  { value: 'supporting_staff', label: 'Supporting Staff' },
];

const departments = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics & Communication',
  'Information Technology',
  'Business Administration',
];

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup, isLoading } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('student');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('student');
  const [signupDepartment, setSignupDepartment] = useState('');
  const [signupRollNumber, setSignupRollNumber] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      await login(loginEmail, loginPassword, loginRole);
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    try {
      await signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        department: signupDepartment,
        rollNumber: signupRollNumber,
      });
      toast({
        title: 'Account created!',
        description: 'Welcome to Campus Aid Buddy.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-secondary">
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-primary/30 rounded-full"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-primary/40 rounded-full"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-primary/20 rounded-full"></div>
          <div className="absolute top-60 left-40 w-1 h-1 bg-primary/50 rounded-full"></div>
          
          {/* Main illustration container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Replace night scene with the provided image */}
              <div className="w-80 h-60 rounded-3xl overflow-hidden">
                <img 
                  src="/11111.png" 
                  alt="Campus Aid Buddy Illustration" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Bottom text */}
              <div className="mt-8 text-center">
                <p className="text-secondary-foreground font-medium">
                  Let's get started with Campus Aid Buddy
                </p>
                <p className="text-secondary-foreground/70 text-sm mt-2">
                  Your complete campus support platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hello!</h1>
            <p className="text-2xl font-semibold text-foreground">Good Morning</p>
            <p className="text-muted-foreground mt-4">Login your account</p>
          </div>

          {/* Login Form */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-muted-foreground">Username</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-muted-foreground">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-role" className="text-muted-foreground">Role</Label>
                      <Select value={loginRole} onValueChange={(v) => setLoginRole(v as UserRole)}>
                        <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-right">
                      <button type="button" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>

                    <div className="text-center">
                      <button 
                        type="button" 
                        onClick={() => setTab('signup')}
                        className="text-sm text-primary hover:underline"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-muted-foreground">Full Name *</Label>
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-muted-foreground">Email *</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@campus.edu"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-muted-foreground">Password *</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="h-12 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-role" className="text-muted-foreground">Role *</Label>
                      <Select value={signupRole} onValueChange={(v) => setSignupRole(v as UserRole)}>
                        <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-department" className="text-muted-foreground">Department</Label>
                      <Select value={signupDepartment} onValueChange={setSignupDepartment}>
                        <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {signupRole === 'student' && (
                      <div className="space-y-2">
                        <Label htmlFor="signup-roll" className="text-muted-foreground">Roll Number</Label>
                        <Input
                          id="signup-roll"
                          placeholder="e.g., CS2024001"
                          value={signupRollNumber}
                          onChange={(e) => setSignupRollNumber(e.target.value)}
                          className="h-12 border-border/50 focus:border-primary"
                        />
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}