'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Car,
  Users,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OperatorDashboardPage() {
  const router = useRouter();
  const { user, operatorDashboard } = useApp();

  useEffect(() => {
    if (!user || user.role !== 'operator') {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) return null;

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-300 bg-red-50 text-red-900';
      case 'warning':
        return 'border-yellow-300 bg-yellow-50 text-yellow-900';
      case 'info':
        return 'border-blue-300 bg-blue-50 text-blue-900';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ParkSpace Operator</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.push('/operator/notifications')}>
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  {operatorDashboard.alerts.filter(a => !a.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {operatorDashboard.alerts.filter(a => !a.read).length}
                    </span>
                  )}
                </div>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Parking Slots</p>
              <p className="text-3xl font-bold text-gray-900">{operatorDashboard.totalSlots}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900">{operatorDashboard.occupancyRate}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Live
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{operatorDashboard.activeBookings}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">Today's Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{operatorDashboard.todayRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <Button variant="outline" size="sm" onClick={() => router.push('/operator/analytics')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{operatorDashboard.todayRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{operatorDashboard.weekRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{operatorDashboard.monthRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
              {/* Simple revenue chart representation */}
              <div className="h-48 flex items-end gap-2">
                {[65, 59, 80, 81, 56, 72, 90].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="bg-linear-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {operatorDashboard.alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className={cn('p-3 rounded-lg border text-sm', getAlertSeverityColor(alert.severity))}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-2">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">
                          {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/operator/notifications')}
                >
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demand Heatmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Predicted Demand Heatmap (Next 24 Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 overflow-x-auto pb-2">
              {operatorDashboard.predictedDemand.map((hour) => (
                <div key={hour.hour} className="flex flex-col items-center min-w-[60px]">
                  <div
                    className={cn(
                      'w-full h-32 rounded-lg flex flex-col items-center justify-center text-white transition-all hover:scale-105',
                      getDemandColor(hour.demand)
                    )}
                  >
                    <p className="text-2xl font-bold">{hour.predictedBookings}</p>
                    <p className="text-xs opacity-90">bookings</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {hour.hour.toString().padStart(2, '0')}:00
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-sm text-gray-600">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" />
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded" />
                <span className="text-sm text-gray-600">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-sm text-gray-600">Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button variant="outline" size="sm" onClick={() => router.push('/operator/manage-slots')}>
                Manage Slots
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-mono">{booking.id}</td>
                      <td className="py-3 px-4 text-sm">
                        {booking.slot.location.landmark || booking.slot.location.address.split(',')[0]}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-right">
                        {booking.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

