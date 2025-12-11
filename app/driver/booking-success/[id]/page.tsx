'use client';

import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  MapPin,
  Clock,
  Car,
  QrCode,
  Share2,
  Download,
  Navigation
} from 'lucide-react';

export default function BookingSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const { bookings } = useApp();
  
  const booking = bookings.find(b => b.id === params.id);

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your parking spot has been reserved
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gray-100 rounded-lg mb-3">
                <QrCode className="w-32 h-32 text-gray-900" />
              </div>
              <p className="text-sm text-gray-600">
                Show this QR code at entry
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {booking.qrCode}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Location */}
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">
                  {booking.slot.location.landmark || 'Parking Location'}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.slot.location.address}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="font-medium text-gray-900">
                  {booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {booking.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.startTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Vehicle */}
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Spot Details</p>
                <p className="font-medium text-gray-900">
                  {booking.slot.type.toUpperCase()} Parking
                </p>
                <div className="flex gap-2 mt-1">
                  {booking.slot.amenities.slice(0, 3).map(amenity => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Payment Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Amount Paid</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${booking.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono text-xs">{booking.id}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <Button
          className="w-full h-12"
          size="lg"
          onClick={() => router.push(`/driver/navigate/${booking.slotId}`)}
        >
          <Navigation className="w-5 h-5 mr-2" />
          Navigate to Parking
        </Button>

        {/* View Bookings */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push('/driver/bookings')}
        >
          View All Bookings
        </Button>

        {/* Back to Home */}
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push('/driver/home')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
