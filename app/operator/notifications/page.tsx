'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  TrendingUp,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const router = useRouter();
  const { operatorDashboard } = useApp();
  const [alerts, setAlerts] = useState(operatorDashboard.alerts);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'reservation':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'cancellation':
        return <XCircle className="w-5 h-5" />;
      case 'no-show':
        return <AlertCircle className="w-5 h-5" />;
      case 'high-demand':
        return <TrendingUp className="w-5 h-5" />;
      case 'maintenance':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-300 bg-red-50';
      case 'warning':
        return 'border-yellow-300 bg-yellow-50';
      case 'info':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getAlertTextColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-900';
      case 'warning':
        return 'text-yellow-900';
      case 'info':
        return 'text-blue-900';
      default:
        return 'text-gray-900';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, read: true } : a));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const unreadAlerts = alerts.filter(a => !a.read);
  const readAlerts = alerts.filter(a => a.read);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
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
                <h1 className="text-xl font-bold text-gray-900">Notifications & Alerts</h1>
                <p className="text-xs text-gray-500">
                  {unreadAlerts.length} unread notification{unreadAlerts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {unreadAlerts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
              >
                Mark All as Read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadAlerts.length})</TabsTrigger>
            <TabsTrigger value="read">Read ({readAlerts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={cn(
                    'transition-all hover:shadow-md',
                    getAlertColor(alert.severity),
                    alert.read && 'opacity-60'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                          alert.severity === 'critical' && 'bg-red-200 text-red-700',
                          alert.severity === 'warning' && 'bg-yellow-200 text-yellow-700',
                          alert.severity === 'info' && 'bg-blue-200 text-blue-700'
                        )}
                      >
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className={cn('font-semibold mb-1', getAlertTextColor(alert.severity))}>
                              {alert.message}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {alert.timestamp.toLocaleString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Badge variant="outline" className="text-xs capitalize">
                              {alert.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-xs',
                                alert.severity === 'critical' && 'border-red-400 text-red-700',
                                alert.severity === 'warning' && 'border-yellow-400 text-yellow-700',
                                alert.severity === 'info' && 'border-blue-400 text-blue-700'
                              )}
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                        </div>
                        {(alert.slotId || alert.bookingId) && (
                          <div className="flex gap-3 text-xs text-gray-600 mb-3">
                            {alert.slotId && <span>Slot: {alert.slotId}</span>}
                            {alert.bookingId && <span>Booking: {alert.bookingId}</span>}
                          </div>
                        )}
                        <div className="flex gap-2">
                          {!alert.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(alert.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          {alert.slotId && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => router.push('/operator/manage-slots')}
                            >
                              View Slot
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteAlert(alert.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No notifications</p>
                <p className="text-gray-400 text-sm mt-1">All caught up!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {unreadAlerts.length > 0 ? (
              unreadAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={cn('transition-all hover:shadow-md', getAlertColor(alert.severity))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                          alert.severity === 'critical' && 'bg-red-200 text-red-700',
                          alert.severity === 'warning' && 'bg-yellow-200 text-yellow-700',
                          alert.severity === 'info' && 'bg-blue-200 text-blue-700'
                        )}
                      >
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn('font-semibold mb-1', getAlertTextColor(alert.severity))}>
                          {alert.message}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {alert.timestamp.toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(alert.id)}
                        >
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No unread notifications</p>
                <p className="text-gray-400 text-sm mt-1">All caught up!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-3">
            {readAlerts.length > 0 ? (
              readAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={cn(
                    'transition-all hover:shadow-md opacity-60',
                    getAlertColor(alert.severity)
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                          alert.severity === 'critical' && 'bg-red-200 text-red-700',
                          alert.severity === 'warning' && 'bg-yellow-200 text-yellow-700',
                          alert.severity === 'info' && 'bg-blue-200 text-blue-700'
                        )}
                      >
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={cn('font-semibold mb-1', getAlertTextColor(alert.severity))}>
                          {alert.message}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {alert.timestamp.toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No read notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

