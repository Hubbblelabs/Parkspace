// Core Types for Predictive Parking Marketplace

export type UserRole = 'user' | 'operator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  trustScore?: number;
  createdAt: Date;
}

export interface AppUser extends User {
  role: 'user';
  vehicles: Vehicle[];
  paymentMethods: PaymentMethod[];
  notificationPreferences: NotificationPreferences;
}

export interface Vehicle {
  id: string;
  type: 'car' | 'bike' | 'suv' | 'truck';
  licensePlate: string;
  model: string;
  color?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'wallet';
  label: string;
  details: string;
  isDefault: boolean;
}

export interface NotificationPreferences {
  bookingConfirmation: boolean;
  slotReminder: boolean;
  paymentAlerts: boolean;
  promotions: boolean;
}

export type ParkingStatus = 'available' | 'reserved' | 'occupied';
export type PredictionConfidence = 'high' | 'medium' | 'low';

export interface ParkingSlot {
  id: string;
  operatorId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    landmark?: string;
  };
  status: ParkingStatus;
  type: 'standard' | 'premium' | 'ev' | 'disabled';
  basePrice: number;
  dynamicPrice: number;
  distanceFromUser?: number;
  predictedAvailability: {
    available: boolean;
    confidence: PredictionConfidence;
    timeWindow: string;
    probability: number;
  };
  amenities: string[];
  rating: number;
  totalSpots: number;
  availableSpots: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'no-show';

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  slot: ParkingSlot;
  status: BookingStatus;
  startTime: Date;
  endTime: Date;
  actualEndTime?: Date;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod: string;
  qrCode?: string;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperatorDashboard {
  totalSlots: number;
  occupancyRate: number;
  activeBookings: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  predictedDemand: DemandHeatmap[];
  recentBookings: Booking[];
  alerts: Alert[];
}

export interface DemandHeatmap {
  hour: number;
  demand: 'low' | 'medium' | 'high' | 'critical';
  predictedBookings: number;
  confidence: number;
}

export interface Alert {
  id: string;
  type: 'reservation' | 'cancellation' | 'no-show' | 'maintenance' | 'high-demand';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  slotId?: string;
  bookingId?: string;
  timestamp: Date;
  read: boolean;
}

export interface Analytics {
  period: 'day' | 'week' | 'month' | 'year';
  revenue: RevenueData[];
  occupancy: OccupancyData[];
  peakHours: PeakHourData[];
  customerSatisfaction: number;
  averageBookingDuration: number;
  noShowRate: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  bookings: number;
}

export interface OccupancyData {
  date: string;
  rate: number;
  totalSlots: number;
  occupiedSlots: number;
}

export interface PeakHourData {
  hour: number;
  bookings: number;
  revenue: number;
}

export interface DynamicPricingRule {
  id: string;
  slotId: string;
  condition: 'demand' | 'time' | 'occupancy' | 'event';
  threshold: number;
  multiplier: number;
  active: boolean;
}
