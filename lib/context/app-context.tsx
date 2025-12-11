'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AppUser, ParkingSlot, Booking, OperatorDashboard, Analytics } from '../types';
import { mockAppUser, mockParkingSlots, mockBookings, mockOperatorDashboard, mockAnalytics } from '../mock-data';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  appUser: AppUser | null;
  parkingSlots: ParkingSlot[];
  bookings: Booking[];
  operatorDashboard: OperatorDashboard;
  analytics: Analytics;
  selectedSlot: ParkingSlot | null;
  setSelectedSlot: (slot: ParkingSlot | null) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>(mockParkingSlots);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [operatorDashboard, setOperatorDashboard] = useState<OperatorDashboard>(mockOperatorDashboard);
  const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const loadUser = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Auto-login for demo (remove in production)
      const savedRole = localStorage.getItem('userRole') || 'user';
      if (savedRole === 'user') {
        setUser(mockAppUser);
        setAppUser(mockAppUser);
      } else {
        setUser({
          id: 'op-1',
          email: 'operator@parkspace.com',
          name: 'Parking Operator',
          role: 'operator',
          createdAt: new Date()
        });
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
    
    // Update slot status
    setParkingSlots(prev => prev.map(slot => 
      slot.id === booking.slotId 
        ? { ...slot, status: 'reserved' as const, availableSpots: slot.availableSpots - 1 }
        : slot
    ));
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates, updatedAt: new Date() } : booking
    ));
  };

  const cancelBooking = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      updateBooking(id, {
        status: 'cancelled',
        paymentStatus: 'refunded',
        refundAmount: booking.totalPrice
      });
      
      // Update slot status
      setParkingSlots(prev => prev.map(slot => 
        slot.id === booking.slotId 
          ? { ...slot, status: 'available' as const, availableSpots: slot.availableSpots + 1 }
          : slot
      ));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        appUser,
        parkingSlots,
        bookings,
        operatorDashboard,
        analytics,
        selectedSlot,
        setSelectedSlot,
        addBooking,
        updateBooking,
        cancelBooking,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
