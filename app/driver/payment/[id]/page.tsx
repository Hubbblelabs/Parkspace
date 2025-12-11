'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/lib/types';
import {
  ChevronLeft,
  CreditCard,
  Wallet,
  Smartphone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const { parkingSlots, appUser, addBooking } = useApp();
  const [slot, setSlot] = useState(parkingSlots.find(s => s.id === params.id));
  const [duration, setDuration] = useState(2);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!slot) {
      router.push('/driver/home');
    }
    if (!appUser) {
      router.push('/auth');
    }
  }, [slot, appUser, router]);

  if (!slot || !appUser) return null;

  const calculateTotal = () => {
    return (slot.dynamicPrice * duration).toFixed(2);
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      userId: appUser.id,
      slotId: slot.id,
      slot: slot,
      status: 'confirmed',
      startTime: new Date(),
      endTime: new Date(Date.now() + duration * 60 * 60 * 1000),
      totalPrice: parseFloat(calculateTotal()),
      paymentStatus: 'paid',
      paymentMethod: selectedPayment === 'upi' ? 'Google Pay' : selectedPayment === 'card' ? 'Visa ending in 4242' : 'Wallet',
      qrCode: `QR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addBooking(newBooking);
    setIsProcessing(false);
    setShowSuccess(true);

    setTimeout(() => {
      router.push(`/driver/booking-success/${newBooking.id}`);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Redirecting to booking details...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="font-semibold text-lg">Payment</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-32">
        {/* Parking Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {slot.location.landmark || 'Parking Location'}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {slot.location.address}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {slot.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {slot.availableSpots} spots available
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration Selection */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-base font-semibold mb-3 block">Parking Duration</Label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 6, 8, 12, 24].map((hours) => (
                <Button
                  key={hours}
                  variant={duration === hours ? 'default' : 'outline'}
                  className="h-auto py-3 flex flex-col"
                  onClick={() => setDuration(hours)}
                >
                  <span className="text-lg font-bold">{hours}</span>
                  <span className="text-xs">hour{hours > 1 ? 's' : ''}</span>
                </Button>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Parking until {new Date(Date.now() + duration * 60 * 60 * 1000).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <div className="space-y-3">
                {/* UPI */}
                <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                     onClick={() => setSelectedPayment('upi')}>
                  <RadioGroupItem value="upi" id="upi" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="upi" className="font-medium cursor-pointer">UPI Payment</Label>
                      <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  </div>
                </div>

                {/* Card */}
                <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                     onClick={() => setSelectedPayment('card')}>
                  <RadioGroupItem value="card" id="card" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-medium cursor-pointer">Credit/Debit Card</Label>
                      <p className="text-xs text-gray-500">Visa ending in 4242</p>
                    </div>
                  </div>
                </div>

                {/* Wallet */}
                <div className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                     onClick={() => setSelectedPayment('wallet')}>
                  <RadioGroupItem value="wallet" id="wallet" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="wallet" className="font-medium cursor-pointer">Wallet</Label>
                      <p className="text-xs text-gray-500">Balance: $156.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-base font-semibold mb-3 block">Price Breakdown</Label>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate</span>
                <span>${slot.basePrice}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span>{duration} hour{duration > 1 ? 's' : ''}</span>
              </div>
              {slot.dynamicPrice > slot.basePrice && (
                <div className="flex justify-between text-red-600">
                  <span>Peak Hour Surcharge</span>
                  <span>+${((slot.dynamicPrice - slot.basePrice) * duration).toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total Amount</span>
                <span className="text-xl text-blue-600">${calculateTotal()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="font-medium mb-1">Cancellation Policy</p>
                <p className="text-yellow-800">
                  Free cancellation up to 30 minutes before start time. 
                  No-show will incur a $5 penalty.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom - Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total</span>
          <span className="text-2xl font-bold text-gray-900">₹{calculateTotal()}</span>
        </div>
        <Button
          className="w-full h-12 text-lg"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Processing Payment...
            </>
          ) : (
            `Pay Now & Reserve`
          )}
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
