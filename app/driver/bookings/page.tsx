'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingStatus } from '@/lib/types';
import {
  ChevronLeft,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  QrCode,
  Navigation as NavigationIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookingsPage() {
  const router = useRouter();
  const { bookings, cancelBooking } = useApp();
  const [selectedTab, setSelectedTab] = useState<'active' | 'past'>('active');

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
      case 'active':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'no-show':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'no-show':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const activeBookings = bookings.filter(b => 
    b.status === 'confirmed' || b.status === 'active' || b.status === 'pending'
  );
  
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled' || b.status === 'no-show'
  );

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking? You will receive a full refund.')) {
      cancelBooking(bookingId);
    }
  };

  const BookingCard = ({ booking }: { booking: typeof bookings[0] }) => {
    const isActive = booking.status === 'confirmed' || booking.status === 'active';
    const isPast = booking.status === 'completed' || booking.status === 'cancelled';

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs font-medium border", getStatusColor(booking.status))}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(booking.status)}
                    {booking.status.toUpperCase()}
                  </span>
                </Badge>
                {booking.paymentStatus === 'refunded' && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                    Refunded {booking.refundAmount}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {booking.slot.location.landmark || 'Parking Location'}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-1">
                {booking.slot.location.address}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">
                {booking.totalPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {booking.paymentStatus}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking.startTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {isActive && (
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => router.push(`/driver/navigate/{booking.slotId}`)}
              >
                <NavigationIcon className="w-4 h-4 mr-1" />
                Navigate
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/driver/booking-success/{booking.id}`)}
              >
                <QrCode className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCancelBooking(booking.id)}
              >
                Cancel
              </Button>
            </div>
          )}

          {isPast && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/driver/slot/{booking.slotId}`)}
              >
                Book Again
              </Button>
              <Button
                size="sm"
                variant="outline"
              >
                Receipt
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">My Bookings</h1>
            <p className="text-xs text-gray-500">
              {activeBookings.length} active • {pastBookings.length} past
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'active' | 'past')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">
              Active ({activeBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {activeBookings.length > 0 ? (
              activeBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No active bookings</p>
                <p className="text-gray-400 text-sm mt-1">
                  Start by finding a parking spot
                </p>
                <Button
                  className="mt-4"
                  onClick={() => router.push('/driver/home')}
                >
                  Find Parking
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-3">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No past bookings</p>
                <p className="text-gray-400 text-sm mt-1">
                  Your booking history will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

