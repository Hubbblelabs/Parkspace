'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  User,
  Car,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Star,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { appUser, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  if (!appUser) {
    return null;
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setUser(null);
      localStorage.removeItem('userRole');
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-600 text-white">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Profile</h1>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
              {appUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{appUser.name}</h2>
              <p className="text-blue-100 text-sm mb-2">{appUser.email}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  {appUser.trustScore} Trust Score
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-600">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">₹4,860</p>
              <p className="text-xs text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">2.1h</p>
              <p className="text-xs text-gray-600">Avg Duration</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="w-5 h-5" />
                My Vehicles
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {appUser.vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicle.model}</p>
                    <p className="text-sm text-gray-600">{vehicle.licensePlate}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </CardTitle>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {appUser.paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-600">{method.details}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <Badge variant="secondary" className="text-xs">Default</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Booking Confirmations</p>
                <p className="text-sm text-gray-600">Get notified when booking is confirmed</p>
              </div>
              <Switch checked={appUser.notificationPreferences.bookingConfirmation} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Slot Reminders</p>
                <p className="text-sm text-gray-600">Reminders before parking time</p>
              </div>
              <Switch checked={appUser.notificationPreferences.slotReminder} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Payment Alerts</p>
                <p className="text-sm text-gray-600">Transaction and refund notifications</p>
              </div>
              <Switch checked={appUser.notificationPreferences.paymentAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Promotions</p>
                <p className="text-sm text-gray-600">Special offers and discounts</p>
              </div>
              <Switch checked={appUser.notificationPreferences.promotions} />
            </div>
          </CardContent>
        </Card>

        {/* Other Options */}
        <Card>
          <CardContent className="p-0">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Privacy & Security</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
            <Separator />
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Help & Support</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
            <Separator />
            <button
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </div>
              <ChevronLeft className="w-5 h-5 text-red-400 rotate-180" />
            </button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 py-4">
          ParkSpace v1.0.0
        </div>
      </div>
    </div>
  );
}

