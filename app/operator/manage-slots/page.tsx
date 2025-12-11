'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  ChevronLeft,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Car,
  Zap
} from 'lucide-react';

export default function ManageSlotsPage() {
  const router = useRouter();
  const { parkingSlots } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

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
                <h1 className="text-xl font-bold text-gray-900">Manage Parking Slots</h1>
                <p className="text-xs text-gray-500">{parkingSlots.length} total slots</p>
              </div>
            </div>
            <Button onClick={() => alert('Add new parking slot')}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Slot
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slots List */}
          <div className="lg:col-span-2 space-y-4">
            {parkingSlots.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all {
                  selectedSlot === slot.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {slot.location.landmark || 'Parking Location'}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {slot.location.address}
                          </p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(slot.status)}>
                          {slot.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="text-sm font-medium text-gray-900 uppercase">
                            {slot.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Capacity</p>
                          <p className="text-sm font-medium text-gray-900">
                            {slot.availableSpots}/{slot.totalSpots}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Price</p>
                          <p className="text-sm font-medium text-gray-900">
                            {slot.dynamicPrice}/hr
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={(e) => {
                          e.stopPropagation();
                          alert('Edit slot');
                        }}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => {
                          e.stopPropagation();
                          alert('View analytics for this slot');
                        }}>
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Slot Details / Dynamic Pricing */}
          <div className="space-y-4">
            {selectedSlot ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dynamic Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Base Price (?/hour)</Label>
                      <Input
                        type="number"
                        placeholder="15.00"
                        className="mt-1"
                        defaultValue={parkingSlots.find(s => s.id === selectedSlot)?.basePrice}
                      />
                    </div>
                    
                    <div>
                      <Label>Current Dynamic Price</Label>
                      <div className="mt-1 p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {parkingSlots.find(s => s.id === selectedSlot)?.dynamicPrice}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {parkingSlots.find(s => s.id === selectedSlot)?.dynamicPrice! > 
                           parkingSlots.find(s => s.id === selectedSlot)?.basePrice! 
                            ? `+{((parkingSlots.find(s => s.id === selectedSlot)?.dynamicPrice! - 
                                  parkingSlots.find(s => s.id === selectedSlot)?.basePrice!) / 
                                  parkingSlots.find(s => s.id === selectedSlot)?.basePrice! * 100).toFixed(0)}% from base`
                            : 'Base price active'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Dynamic Pricing</Label>
                        <p className="text-xs text-gray-500">
                          Adjust prices based on demand
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Button className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Update Pricing
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Slot Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Total Parking Spots</Label>
                      <Input
                        type="number"
                        className="mt-1"
                        defaultValue={parkingSlots.find(s => s.id === selectedSlot)?.totalSpots}
                      />
                    </div>

                    <div>
                      <Label>Available Spots</Label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <span className="text-sm text-gray-600">Currently Available</span>
                        <span className="text-xl font-bold">
                          {parkingSlots.find(s => s.id === selectedSlot)?.availableSpots}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>EV Charging Available</Label>
                        <p className="text-xs text-gray-500">Enable for electric vehicles</p>
                      </div>
                      <Switch defaultChecked={parkingSlots.find(s => s.id === selectedSlot)?.type === 'ev'} />
                    </div>

                    <Button variant="outline" className="w-full">
                      <Car className="w-4 h-4 mr-2" />
                      Update Configuration
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Slot
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Select a slot to manage</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Click on any slot to view details and update settings
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

