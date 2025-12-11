'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Navigation,
  MapPin,
  Phone,
  Clock,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function NavigatePage() {
  const router = useRouter();
  const params = useParams();
  const { parkingSlots } = useApp();
  const [slot, setSlot] = useState(parkingSlots.find(s => s.id === params.id));
  const [eta, setEta] = useState(8);

  useEffect(() => {
    if (!slot) {
      const foundSlot = parkingSlots.find(s => s.id === params.id);
      if (foundSlot) {
        setSlot(foundSlot);
      } else {
        router.push('/driver/home');
      }
    }
  }, [slot, params.id, parkingSlots, router]);

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!slot) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Map Area */}
      <div className="flex-1 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <MapPin className="w-32 h-32 text-blue-600 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full animate-ping" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-4">
              {slot.distanceFromUser} miles away
            </p>
            <p className="text-gray-600 mt-1">ETA: {eta} minutes</p>
          </div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex gap-3">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white shadow-lg"
            onClick={() => router.back()}
          >
            <Navigation className="w-5 h-5" />
          </Button>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Traffic Status</p>
                <p className="text-sm font-semibold text-gray-900">Light Traffic</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Instructions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl">
          <div className="p-6">
            {/* Direction Instruction */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">In {eta} minutes</p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  Continue on Market Street
                </p>
                <p className="text-sm text-gray-600">
                  Then turn right onto Mission Street
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {slot.distanceFromUser} mi
                </p>
              </div>
            </div>

            {/* Destination Info */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {slot.location.landmark || 'Destination'}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {slot.location.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {slot.availableSpots} spots available
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-50 text-green-700 border-green-300"
                      >
                        Reserved
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Updates */}
            <Card className="border-blue-200 bg-blue-50 mb-4">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">
                      Live Availability Update
                    </p>
                    <p className="text-blue-800">
                      Your spot is still available. {slot.predictedAvailability.probability}% confidence for next {slot.predictedAvailability.timeWindow}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  // Open in Google Maps
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${slot.location.lat},${slot.location.lng}`, '_blank');
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Maps
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
            </div>

            {/* Warning for high traffic */}
            {eta > 15 && (
              <Card className="border-yellow-200 bg-yellow-50 mt-4">
                <CardContent className="p-3">
                  <div className="flex gap-2 items-start">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-900">
                      Heavy traffic detected. Consider alternative routes to reach on time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Arrival Actions */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 text-center mb-3">
                Once you arrive
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/driver/bookings')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  View QR Code
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    alert('Check-in successful! Parking timer started.');
                    router.push('/driver/bookings');
                  }}
                >
                  Check In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
