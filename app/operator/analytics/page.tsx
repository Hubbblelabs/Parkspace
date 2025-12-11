'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  BarChart3,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { analytics } = useApp();
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-xs text-gray-500">Performance insights and metrics</p>
              </div>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Period Selector */}
        <div className="mb-8">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
            <TabsList>
              <TabsTrigger value="day">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.revenue.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Avg Occupancy</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(analytics.occupancy.reduce((sum, o) => sum + o.rate, 0) / analytics.occupancy.length).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+8.2% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.averageBookingDuration.toFixed(1)}h
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Per booking average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">No-Show Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analytics.noShowRate.toFixed(1)}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Below industry avg (5%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end gap-1">
              {analytics.revenue.slice(-30).map((day, i) => {
                const maxRevenue = Math.max(...analytics.revenue.map(r => r.amount));
                const height = (day.amount / maxRevenue) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div className="relative">
                      <div
                        className="bg-linear-to-t from-blue-600 to-blue-600 rounded-t transition-all hover:opacity-80"
                        style={{ height: `{height * 3}px` }}
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {day.amount}
                          <div className="text-gray-400">{day.bookings} bookings</div>
                        </div>
                      </div>
                    </div>
                    {i % 3 === 0 && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {new Date(day.date).getDate()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Occupancy and Peak Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-1">
                {analytics.occupancy.slice(-14).map((day, i) => {
                  const height = day.rate;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                      <div className="relative">
                        <div
                          className="bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                          style={{ height: `{height * 2.5}px` }}
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                            {day.rate.toFixed(1)}%
                            <div className="text-gray-400">{day.occupiedSlots}/{day.totalSlots}</div>
                          </div>
                        </div>
                      </div>
                      {i % 2 === 0 && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          {new Date(day.date).getDate()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peak Hours Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.peakHours
                  .sort((a, b) => b.bookings - a.bookings)
                  .slice(0, 8)
                  .map((hour) => (
                    <div key={hour.hour} className="flex items-center gap-3">
                      <div className="w-16 text-sm font-medium text-gray-700">
                        {hour.hour.toString().padStart(2, '0')}:00
                      </div>
                      <div className="flex-1">
                        <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-blue-500 to-blue-500 flex items-center px-3 text-white text-sm font-medium"
                            style={{
                              width: `{(hour.bookings / Math.max(...analytics.peakHours.map(h => h.bookings))) * 100}%`
                            }}
                          >
                            {hour.bookings} bookings
                          </div>
                        </div>
                      </div>
                      <div className="w-20 text-right text-sm font-semibold text-gray-900">
                        {hour.revenue}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {analytics.customerSatisfaction.toFixed(1)}
                  </div>
                  <div className="text-gray-600">out of 5.0</div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-12">{rating} stars</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: `{rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : 2}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '8%' : '2%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Key Insights</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>92% customers would recommend our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Prediction accuracy rated 4.8/5</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Average response time: 2 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">!</span>
                    <span>3% increase in customer support tickets</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

