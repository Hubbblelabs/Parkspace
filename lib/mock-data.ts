
import { 
  ParkingSlot, 
  Booking, 
  AppUser, 
  OperatorDashboard,
  Alert,
  Analytics,
  DemandHeatmap,
  RevenueData,
  OccupancyData,
  PeakHourData
} from './types';

export const mockAppUser: AppUser = {
  id: 'user-1',
  email: 'rajesh.kumar@gmail.com',
  name: 'Rajesh Kumar',
  role: 'user',
  phone: '+91 98765 43210',
  trustScore: 4.7,
  createdAt: new Date('2024-01-15'),
  vehicles: [
    {
      id: 'v1',
      type: 'car',
      licensePlate: 'MH 02 AB 1234',
      model: 'Maruti Swift',
      color: 'White'
    }
  ],
  paymentMethods: [
    {
      id: 'pm1',
      type: 'upi',
      label: 'PhonePe',
      details: '9876543210@ybl',
      isDefault: true
    },
    {
      id: 'pm2',
      type: 'card',
      label: 'HDFC Debit Card',
      details: '**** **** **** 5678',
      isDefault: false
    }
  ],
  notificationPreferences: {
    bookingConfirmation: true,
    slotReminder: true,
    paymentAlerts: true,
    promotions: false
  }
};

export const mockParkingSlots: ParkingSlot[] = [
  {
    id: 'slot-1',
    operatorId: 'op-1',
    location: {
      lat: 11.0168,
      lng: 76.9558,
      address: 'RS Puram, Coimbatore, Tamil Nadu 641002',
      landmark: 'Near Brookefields Mall'
    },
    status: 'available',
    type: 'premium',
    basePrice: 80,
    dynamicPrice: 40,
    distanceFromUser: 0.3,
    predictedAvailability: {
      available: true,
      confidence: 'high',
      timeWindow: 'Next 2 hours',
      probability: 92
    },
    amenities: ['Covered', 'EV Charging', 'Security', 'CCTV'],
    rating: 4.8,
    totalSpots: 50,
    availableSpots: 12
  },
  {
    id: 'slot-2',
    operatorId: 'op-1',
    location: {
      lat: 11.0510,
      lng: 76.9636,
      address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012',
      landmark: 'Near City Bus Stand'
    },
    status: 'available',
    type: 'standard',
    basePrice: 10,
    dynamicPrice: 10,
    distanceFromUser: 1.2,
    predictedAvailability: {
      available: true,
      confidence: 'medium',
      timeWindow: 'Next 1 hour',
      probability: 67
    },
    amenities: ['Covered', 'Security'],
    rating: 4.5,
    totalSpots: 30,
    availableSpots: 8
  },
  {
    id: 'slot-3',
    operatorId: 'op-1',
    location: {
      lat: 11.0079,
      lng: 76.9662,
      address: 'Saibaba Colony, Coimbatore, Tamil Nadu 641011',
      landmark: 'Near Race Course'
    },
    status: 'reserved',
    type: 'ev',
    basePrice: 120,
    dynamicPrice: 150,
    distanceFromUser: 0.5,
    predictedAvailability: {
      available: false,
      confidence: 'high',
      timeWindow: 'Available in 45 min',
      probability: 88
    },
    amenities: ['Covered', 'EV Charging', 'Security', 'CCTV', 'Valet'],
    rating: 4.9,
    totalSpots: 20,
    availableSpots: 0
  },
  {
    id: 'slot-4',
    operatorId: 'op-1',
    location: {
      lat: 11.0272,
      lng: 77.0228,
      address: 'Peelamedu, Coimbatore, Tamil Nadu 641004',
      landmark: 'Near Airport'
    },
    status: 'occupied',
    type: 'standard',
    basePrice: 12,
    dynamicPrice: 15,
    distanceFromUser: 2.1,
    predictedAvailability: {
      available: false,
      confidence: 'low',
      timeWindow: 'High demand area',
      probability: 34
    },
    amenities: ['Open Air', 'Security'],
    rating: 4.2,
    totalSpots: 40,
    availableSpots: 2
  },
  {
    id: 'slot-5',
    operatorId: 'op-1',
    location: {
      lat: 11.0414,
      lng: 76.9832,
      address: 'Singanallur, Coimbatore, Tamil Nadu 641005',
      landmark: 'Near Railway Junction'
    },
    status: 'available',
    type: 'premium',
    basePrice: 100,
    dynamicPrice: 120,
    distanceFromUser: 1.5,
    predictedAvailability: {
      available: true,
      confidence: 'high',
      timeWindow: 'Next 3 hours',
      probability: 95
    },
    amenities: ['Covered', 'EV Charging', 'Security', 'CCTV', 'Valet', 'Car Wash'],
    rating: 5.0,
    totalSpots: 100,
    availableSpots: 25
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'book-1',
    userId: 'user-1',
    slotId: 'slot-1',
    slot: mockParkingSlots[0],
    status: 'active',
    startTime: new Date(),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    totalPrice: 180,
    paymentStatus: 'paid',
    paymentMethod: 'PhonePe',
    qrCode: 'QR123456',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'book-2',
    userId: 'user-1',
    slotId: 'slot-2',
    slot: mockParkingSlots[1],
    status: 'completed',
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
    actualEndTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
    totalPrice: 100,
    paymentStatus: 'paid',
    paymentMethod: 'HDFC Debit Card',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000)
  },
  {
    id: 'book-3',
    userId: 'user-1',
    slotId: 'slot-3',
    slot: mockParkingSlots[2],
    status: 'cancelled',
    startTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 46 * 60 * 60 * 1000),
    totalPrice: 250,
    paymentStatus: 'refunded',
    paymentMethod: 'PhonePe',
    refundAmount: 25,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 47 * 60 * 60 * 1000)
  }
];

const generateDemandHeatmap = (): DemandHeatmap[] => {
  return Array.from({ length: 24 }, (_, hour) => {
    let demand: 'low' | 'medium' | 'high' | 'critical';
    let predictedBookings: number;
    
    if (hour >= 7 && hour <= 9) {
      demand = 'critical';
      predictedBookings = 80 + Math.floor(Math.random() * 20);
    } else if (hour >= 17 && hour <= 19) {
      demand = 'high';
      predictedBookings = 60 + Math.floor(Math.random() * 20);
    } else if (hour >= 10 && hour <= 16) {
      demand = 'medium';
      predictedBookings = 30 + Math.floor(Math.random() * 20);
    } else {
      demand = 'low';
      predictedBookings = 5 + Math.floor(Math.random() * 15);
    }
    
    return {
      hour,
      demand,
      predictedBookings,
      confidence: 0.75 + Math.random() * 0.2
    };
  });
};

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'reservation',
    severity: 'info',
    message: 'New reservation for Premium Slot #A-12',
    slotId: 'slot-1',
    bookingId: 'book-1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: 'alert-2',
    type: 'high-demand',
    severity: 'warning',
    message: 'High demand predicted for next 2 hours - consider dynamic pricing',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false
  },
  {
    id: 'alert-3',
    type: 'no-show',
    severity: 'critical',
    message: 'Customer no-show detected at Slot #B-05',
    slotId: 'slot-4',
    bookingId: 'book-4',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true
  },
  {
    id: 'alert-4',
    type: 'cancellation',
    severity: 'info',
    message: 'Booking cancelled for Slot #C-08 - refund processed',
    slotId: 'slot-3',
    bookingId: 'book-3',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true
  }
];

export const mockOperatorDashboard: OperatorDashboard = {
  totalSlots: 240,
  occupancyRate: 68,
  activeBookings: 163,
  todayRevenue: 2847,
  weekRevenue: 18234,
  monthRevenue: 76891,
  predictedDemand: generateDemandHeatmap(),
  recentBookings: mockBookings,
  alerts: mockAlerts
};

const generateRevenueData = (): RevenueData[] => {
  const data: RevenueData[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      amount: 2000 + Math.floor(Math.random() * 1500),
      bookings: 100 + Math.floor(Math.random() * 80)
    });
  }
  return data;
};

const generateOccupancyData = (): OccupancyData[] => {
  const data: OccupancyData[] = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const occupiedSlots = 150 + Math.floor(Math.random() * 60);
    data.push({
      date: date.toISOString().split('T')[0],
      rate: (occupiedSlots / 240) * 100,
      totalSlots: 240,
      occupiedSlots
    });
  }
  return data;
};

const generatePeakHourData = (): PeakHourData[] => {
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    bookings: hour >= 7 && hour <= 9 || hour >= 17 && hour <= 19 
      ? 60 + Math.floor(Math.random() * 40)
      : 20 + Math.floor(Math.random() * 30),
    revenue: hour >= 7 && hour <= 9 || hour >= 17 && hour <= 19
      ? 900 + Math.floor(Math.random() * 600)
      : 300 + Math.floor(Math.random() * 400)
  }));
};

export const mockAnalytics: Analytics = {
  period: 'month',
  revenue: generateRevenueData(),
  occupancy: generateOccupancyData(),
  peakHours: generatePeakHourData(),
  customerSatisfaction: 4.6,
  averageBookingDuration: 2.3,
  noShowRate: 3.2
};
