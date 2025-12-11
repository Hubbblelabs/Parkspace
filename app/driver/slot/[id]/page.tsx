'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Navigation,
  Star,
  Zap,
  Clock,
  DollarSign,
  Shield,
  Camera,
  Car,
  ChevronLeft,
  Phone,
  Info,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SlotDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { parkingSlots, selectedSlot, setSelectedSlot } = useApp();
  const [slot, setSlot] = useState(selectedSlot);

  useEffect(() => {
    if (!slot) {
      const foundSlot = parkingSlots.find(s => s.id === params.id);
      if (foundSlot) {
        setSlot(foundSlot);
        setSelectedSlot(foundSlot);
      } else {
        router.push('/driver/home');
      }
    }
  }, [slot, params.id, parkingSlots, router, setSelectedSlot]);

  if (!slot) return null;

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleBookNow = () => {
    router.push(`/driver/payment/${slot.id}`);
  };

  const handleNavigate = () => {
    router.push(`/driver/navigate/${slot.id}`);
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
            <h1 className="font-semibold text-lg">Parking Details</h1>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-20 h-20 text-blue-600" />
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-gray-900 border shadow-lg">
            <Navigation className="w-3 h-3 mr-1" />
            {slot.distanceFromUser} Km away
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            className="w-full shadow-lg"
            onClick={handleNavigate}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Navigate to Parking
          </Button>
        </div>
      </div>

      {/* Slot Information */}
      <div className="p-4 space-y-4">
        {/* Location Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {slot.location.landmark || 'Parking Location'}
                </h2>
                <p className="text-sm text-gray-600">
                  {slot.location.address}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ${slot.dynamicPrice}
                </div>
                <div className="text-xs text-gray-500">per hour</div>
                {slot.dynamicPrice > slot.basePrice && (
                  <Badge variant="destructive" className="mt-1 text-xs">
                    Dynamic Pricing
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{slot.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4 text-gray-600" />
                <span>{slot.availableSpots} of {slot.totalSpots} available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prediction Card */}
        <Card className={cn("border-2", getConfidenceColor(slot.predictedAvailability.confidence))}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg", getConfidenceColor(slot.predictedAvailability.confidence))}>
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Predictive Availability</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {slot.predictedAvailability.available 
                    ? `High chance of availability for ${slot.predictedAvailability.timeWindow}`
                    : slot.predictedAvailability.timeWindow
                  }
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all", 
                        slot.predictedAvailability.confidence === 'high' ? 'bg-green-500' :
                        slot.predictedAvailability.confidence === 'medium' ? 'bg-yellow-500' :
                        'bg-red-500'
                      )}
                      style={{ width: `${slot.predictedAvailability.probability}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {slot.predictedAvailability.probability}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {slot.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Pricing Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate</span>
                <span className="font-medium">${slot.basePrice}/hour</span>
              </div>
              {slot.dynamicPrice > slot.basePrice && (
                <>
                  <div className="flex justify-between text-red-600">
                    <span>Peak Hour Surcharge</span>
                    <span className="font-medium">+${(slot.dynamicPrice - slot.basePrice).toFixed(2)}/hour</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Current Rate</span>
                    <span>${slot.dynamicPrice}/hour</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Important Information</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• QR code check-in required</li>
                  <li>• Grace period: 15 minutes</li>
                  <li>• Cancellation: Free up to 30 min before</li>
                  <li>• No-show penalty: $5</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600">Contact parking operator</p>
              </div>
              <Button variant="outline" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reserve Button */}
        <div className="pb-6">
          <Button
            className="w-full h-12 text-lg"
            size="lg"
            onClick={handleBookNow}
            disabled={slot.status === 'occupied'}
          >
            {slot.status === 'occupied' ? 'Currently Unavailable' : 'Reserve Parking Spot'}
          </Button>
          {slot.status === 'reserved' && (
            <p className="text-center text-sm text-yellow-600 mt-2">
              Reserved by another user - may become available soon
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
