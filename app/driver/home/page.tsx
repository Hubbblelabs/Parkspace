'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ParkingSlot } from '@/lib/types';
import { 
  MapPin, 
  Navigation, 
  Search, 
  SlidersHorizontal, 
  Clock,
  DollarSign,
  Star,
  Zap,
  Shield,
  Camera,
  Car,
  Menu,
  Bell,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DriverHomePage() {
  const router = useRouter();
  const { parkingSlots, setSelectedSlot, appUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'premium' | 'ev'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');

  useEffect(() => {
    if (!appUser) {
      router.push('/auth');
    }
  }, [appUser, router]);

  if (!appUser) return null;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'reserved':
        return 'bg-yellow-500';
      case 'occupied':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredSlots = parkingSlots
    .filter(slot => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'available') return slot.status === 'available';
      if (selectedFilter === 'premium') return slot.type === 'premium';
      if (selectedFilter === 'ev') return slot.type === 'ev';
      return true;
    })
    .filter(slot => {
      if (!searchQuery) return true;
      return slot.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
             slot.location.landmark?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return (a.distanceFromUser || 0) - (b.distanceFromUser || 0);
      if (sortBy === 'price') return a.dynamicPrice - b.dynamicPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleSlotClick = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    router.push(`/driver/slot/${slot.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => router.push('/driver/profile')}>
            <Menu className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => router.push('/driver/bookings')}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => router.push('/driver/profile')}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-1">Find Parking</h1>
          {/* <p className="text-blue-100 text-sm">Near San Francisco, CA</p> */}
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Live location or landmark nearby ..."
            className="pl-10 bg-white border-0 shadow-lg"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <Button
            size="sm"
            variant={selectedFilter === 'all' ? 'secondary' : 'ghost'}
            className={cn(selectedFilter === 'all' ? 'bg-white text-blue-600' : 'text-white border-white/30')}
            onClick={() => setSelectedFilter('all')}
          >
            All Spots
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === 'available' ? 'secondary' : 'ghost'}
            className={cn(selectedFilter === 'available' ? 'bg-white text-blue-600' : 'text-white border-white/30')}
            onClick={() => setSelectedFilter('available')}
          >
            Available
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === 'premium' ? 'secondary' : 'ghost'}
            className={cn(selectedFilter === 'premium' ? 'bg-white text-blue-600' : 'text-white border-white/30')}
            onClick={() => setSelectedFilter('premium')}
          >
            Premium
          </Button>
          <Button
            size="sm"
            variant={selectedFilter === 'ev' ? 'secondary' : 'ghost'}
            className={cn(selectedFilter === 'ev' ? 'bg-white text-blue-600' : 'text-white border-white/30')}
            onClick={() => setSelectedFilter('ev')}
          >
            EV Charging
          </Button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 font-medium">Sort by:</span>
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              variant={sortBy === 'distance' ? 'default' : 'outline'}
              onClick={() => setSortBy('distance')}
              className="text-xs"
            >
              Distance
            </Button>
            <Button
              size="sm"
              variant={sortBy === 'price' ? 'default' : 'outline'}
              onClick={() => setSortBy('price')}
              className="text-xs"
            >
              Price
            </Button>
            <Button
              size="sm"
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              onClick={() => setSortBy('rating')}
              className="text-xs"
            >
              Rating
            </Button>
          </div>
        </div>
      </div>

      {/* Parking Slots List */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredSlots.length} Parking Spot{filteredSlots.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {filteredSlots.map((slot) => (
          <Card
            key={slot.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200"
            onClick={() => handleSlotClick(slot)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Map Thumbnail */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                  <MapPin className="w-10 h-10 text-blue-600" />
                  <div className={cn("absolute top-2 right-2 w-3 h-3 rounded-full", getStatusColor(slot.status))} />
                </div>

                {/* Slot Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {slot.location.landmark || slot.location.address.split(',')[0]}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                        {slot.location.address}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{slot.dynamicPrice}
                      </div>
                      {slot.dynamicPrice > slot.basePrice && (
                        <div className="text-xs text-red-600 line-through">
                          ₹{slot.basePrice}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prediction Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={cn("text-xs font-medium border", getConfidenceColor(slot.predictedAvailability.confidence))}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {slot.predictedAvailability.probability}% {slot.predictedAvailability.timeWindow}
                    </Badge>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      <span>{slot.distanceFromUser} Km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{slot.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      <span>{slot.availableSpots}/{slot.totalSpots}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {slot.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs px-2 py-0">
                        {amenity}
                      </Badge>
                    ))}
                    {slot.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        +{slot.amenities.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredSlots.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No parking spots found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around p-3">
          <Button
            variant="ghost"
            className="flex-col h-auto py-2 text-blue-600"
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Find</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2"
            onClick={() => router.push('/driver/bookings')}
          >
            <Clock className="w-5 h-5 mb-1" />
            <span className="text-xs">Bookings</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2"
            onClick={() => router.push('/driver/profile')}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

