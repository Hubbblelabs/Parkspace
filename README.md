# ParkSpace - Predictive Parking Space Marketplace

A production-grade, full-stack parking marketplace application built with Next.js 15, TypeScript, and shadcn/ui. Features AI-powered predictive parking availability, dynamic pricing, and separate interfaces for drivers and parking operators.

## 🚀 Features

### Driver Mobile App
- **🔐 Authentication** - Minimal login/signup with role selection
- **🗺️ Home/Map View** - Interactive map showing nearby parking slots with color-coded predictions
- **🎯 Slot Details** - Comprehensive parking spot information with amenities and pricing
- **💳 Payment Integration** - UPI, Card, and Wallet payment options with QR check-in
- **🧭 Turn-by-Turn Navigation** - Real-time guidance to reserved parking spot
- **📜 Booking History** - View past bookings, active reservations, and refund status
- **👤 Profile Management** - Vehicle info, payment methods, notification preferences, trust score

### Operator Web Dashboard
- **📊 Dashboard Home** - Overview of occupancy, active bookings, revenue metrics
- **🎛️ Manage Slots** - Update availability, pricing, and dynamic pricing rules
- **📈 Analytics & Reports** - Historical trends, revenue graphs, peak hours analysis
- **🔔 Notifications & Alerts** - Real-time alerts for reservations, cancellations, no-shows
- **🔥 Demand Heatmap** - 24-hour predictive demand visualization

### Core Capabilities
- **🤖 AI Predictions** - Color-coded probability indicators (high/medium/low confidence)
- **💰 Dynamic Pricing** - Automatic price adjustments based on demand and occupancy
- **⚡ Real-time Updates** - Live availability status and instant booking confirmation
- **📱 Mobile-First Design** - Responsive layouts optimized for all screen sizes
- **🎨 Modern UI/UX** - Clean, intuitive interface built with shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎯 Using the Application

### As a Driver:
1. Visit the homepage and click "Get Started"
2. Select "I'm a Driver" or use the Driver tab
3. Sign up/Login (demo mode - use any credentials)
4. Browse available parking spots on the map
5. View predictive availability and dynamic pricing
6. Reserve a spot and complete payment
7. Navigate to your parking location
8. Check in with QR code

### As an Operator:
1. Visit the homepage and click "Get Started"
2. Select "I'm an Operator" or use the Operator tab
3. Sign up/Login (demo mode - use any credentials)
4. View dashboard with occupancy and revenue metrics
5. Manage parking slots and pricing
6. View analytics and demand forecasts
7. Monitor notifications and alerts

## 📁 Project Structure

```
app/
├── auth/                    # Authentication pages
├── driver/                  # Driver mobile app pages
│   ├── home/               # Main parking search
│   ├── slot/[id]/          # Slot details
│   ├── payment/[id]/       # Payment processing
│   ├── navigate/[id]/      # Navigation
│   ├── booking-success/    # Confirmation
│   ├── bookings/           # Booking history
│   └── profile/            # User profile
├── operator/               # Operator dashboard pages
│   ├── dashboard/          # Main dashboard
│   ├── manage-slots/       # Slot management
│   ├── analytics/          # Reports & analytics
│   └── notifications/      # Alerts & notifications
├── layout.tsx              # Root layout with providers
└── page.tsx                # Landing page

lib/
├── types.ts                # TypeScript type definitions
├── mock-data.ts            # Demo data
├── utils.ts                # Utility functions
└── context/
    └── app-context.tsx     # Global state management

components/
└── ui/                     # shadcn/ui components
```

## 🎨 Key Design Patterns

### Predictive Availability Display
- **High Confidence (90%+)**: Green badge with high probability percentage
- **Medium Confidence (60-89%)**: Yellow badge with medium probability
- **Low Confidence (<60%)**: Red badge with low probability

### Dynamic Pricing Indicators
- Base price shown with strikethrough when surge pricing active
- Percentage increase displayed in red
- Real-time updates based on demand

### Status Color Coding
- **Available**: Green indicators
- **Reserved**: Yellow indicators
- **Occupied**: Red indicators

## 🔄 State Management

The application uses React Context API for global state management with mock data for demonstration purposes.

## 🔐 Demo Mode

The application runs in demo mode with:
- No backend API required
- Mock data for realistic testing
- Auto-login for quick access
- Simulated payment processing
- Realistic booking flow

## 📱 Responsive Design

- **Mobile-First**: Optimized for iOS and Android devices
- **Tablet Support**: Adaptive layouts for medium screens
- **Desktop Dashboard**: Full-width operator interface
- **Touch-Optimized**: Large buttons and swipe gestures

## 🚧 Future Enhancements

- Real backend API integration
- Actual map integration (Google Maps, Mapbox)
- Push notifications
- Real-time WebSocket updates
- Multi-language support
- Dark mode theme
- Unit and integration tests

## Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with ❤️ using Next.js and shadcn/ui**
