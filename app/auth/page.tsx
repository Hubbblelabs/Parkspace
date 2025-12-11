'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/lib/context/app-context';
import { mockAppUser } from '@/lib/mock-data';
import { MapPin, Car } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'operator'>('user');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (activeTab === 'user') {
      setUser(mockAppUser);
      localStorage.setItem('userRole', 'user');
      router.push('/driver/home');
    } else {
      setUser({
        id: 'op-1',
        email: 'operator@parkspace.com',
        name: 'Parking Operator',
        role: 'operator',
        createdAt: new Date()
      });
      localStorage.setItem('userRole', 'operator');
      router.push('/operator/dashboard');
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (activeTab === 'user') {
      setUser(mockAppUser);
      localStorage.setItem('userRole', 'user');
      router.push('/driver/home');
    } else {
      setUser({
        id: 'op-1',
        email: 'operator@parkspace.com',
        name: 'Parking Operator',
        role: 'operator',
        createdAt: new Date()
      });
      localStorage.setItem('userRole', 'operator');
      router.push('/operator/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ParkSpace </h1>
          <p className="text-gray-600">Smart Parking Solutions</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={activeTab === 'user' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveTab('user')}
          >
            <Car className="w-4 h-4 mr-2" />
            User
          </Button>
          <Button
            variant={activeTab === 'operator' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setActiveTab('operator')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Operator
          </Button>
        </div>

        {/* Auth Tabs */}
        <Card>
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Sign in to your {activeTab} account
                  </CardDescription>
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={activeTab === 'user' ? 'your.email@example.com' : 'operator@parkspace.in'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Link href="#" className="text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Create a new {activeTab} account
                  </CardDescription>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={activeTab === 'user' ? 'your.email@example.com' : 'operator@parkspace.in'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Demo Mode:</strong> Use any credentials to explore the app
          </p>
        </div>
      </div>
    </div>
  );
}
