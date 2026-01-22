"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function EventsSettings() {
  // Event Tracking Toggles
  const [eventTracking, setEventTracking] = useState({
    userRegistration: true,
    productView: true,
    cartActions: true,
    purchases: true,
    searchEvents: true,
    errorEvents: false,
  });

  // Event Notifications Toggles
  const [eventNotifications, setEventNotifications] = useState({
    newOrder: true,
    lowStock: true,
    paymentFailures: true,
    userFeedback: false,
  });

  // Automated Events
  const [automatedEvents, setAutomatedEvents] = useState({
    welcomeEmail: true,
    abandonedCart: true,
    orderConfirmation: true,
    shippingUpdates: true,
  });

  const [abandonedCartDays, setAbandonedCartDays] = useState("2");

  // Webhook Configuration
  const [webhookUrl, setWebhookUrl] = useState("https://yourapp.com/webhook");
  const [welcomeEmail, setWelcomeEmail] = useState("Welcome to our store!");
  const [shippingUpdate, setShippingUpdate] = useState("Your order is on the way!");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [eventsToSend, setEventsToSend] = useState("");
  const [enableWebhooks, setEnableWebhooks] = useState(false);
  
  // Notification Email
  const [notificationEmail, setNotificationEmail] = useState("admin@example.com");

  return (
    <div className="p-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Event Tracking */}
      <Card>
        <CardHeader className="flex flex-col">
          <CardTitle>Event Tracking</CardTitle>
          <p className="text-gray-400">Configure which events to track and monitor</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Registration */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>User Registration</span>
              <Switch
                checked={eventTracking.userRegistration}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, userRegistration: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Tracks new user registrations
            </p>
          </div>

          {/* Product Views */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Product Views</span>
              <Switch
                checked={eventTracking.productView}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, productView: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Track product page visits
            </p>
          </div>

          {/* Cart Actions */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Cart Actions</span>
              <Switch
                checked={eventTracking.cartActions}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, cartActions: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Tracks add to cart,remove from cart
            </p>
          </div>

          {/* Purchases */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Purchase Events</span>
              <Switch
                checked={eventTracking.purchases}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, purchases: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Track completed purchases
            </p>
          </div>

          {/* Search Events */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Search Events</span>
              <Switch
                checked={eventTracking.searchEvents}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, searchEvents: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Tracks search queries
            </p>
          </div>

          {/* Error Events */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Error Events</span>
              <Switch
                checked={eventTracking.errorEvents}
                onCheckedChange={(checked) =>
                  setEventTracking((prev) => ({ ...prev, errorEvents: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Tracks application errors
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Event Notifications */}
      <Card>
        <CardHeader className="flex flex-col">
          <CardTitle>Event Notifications</CardTitle>
          <p className="text-gray-400">Configure notification triggers for events</p>
        </CardHeader>
        <CardContent className="space-y-4">         
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>New Order Alerts</span>
              <Switch
                checked={eventNotifications.newOrder}
                onCheckedChange={(checked) =>
                  setEventNotifications((prev) => ({ ...prev, newOrder: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Notify on new orders
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Low Stock Alerts</span>
              <Switch
                checked={eventNotifications.lowStock}
                onCheckedChange={(checked) =>
                  setEventNotifications((prev) => ({ ...prev, lowStock: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Notify when inventory is low
            </p>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>Payment Failures</span>
              <Switch
                checked={eventNotifications.paymentFailures}
                onCheckedChange={(checked) =>
                  setEventNotifications((prev) => ({ ...prev, paymentFailures: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Notify on failed payments
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span>User Feedback</span>
              <Switch
                checked={eventNotifications.userFeedback}
                onCheckedChange={(checked) =>
                  setEventNotifications((prev) => ({ ...prev, userFeedback: checked }))
                }
              />
            </div>
            <p className="text-sm text-gray-400">
              Notify on reviews and feedback
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-email">Notification Email</Label>
            <Input 
              id="notification-email"
              type="email" 
              className="my-1"
              placeholder="admin@example.com" 
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Automated Events */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Automated Events</CardTitle>
          <p className="text-sm text-gray-400">
            Configure automated event triggers and actions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Welcome Email */}
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <Label>Welcome Email</Label>
              <p className="text-sm text-gray-400">Send welcome email on registration</p>
            </div>
            <Switch 
              checked={automatedEvents.welcomeEmail} 
              onCheckedChange={(checked) => setAutomatedEvents((prev) => ({ ...prev, welcomeEmail: checked }))} 
            />
          </div>

          {/* Abandoned Cart Email */}
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <Label>Abandoned Cart Email</Label>
              <p className="text-sm text-gray-400">Email users with abandoned carts</p>
            </div>
            <Switch 
              checked={automatedEvents.abandonedCart} 
              onCheckedChange={(checked) => setAutomatedEvents((prev) => ({ ...prev, abandonedCart: checked }))} 
            />
          </div>

          {/* Abandoned Cart Delay */}
          <div className="space-y-2">
            <Label htmlFor="abandoned-cart-delay">Abandoned Cart Delay (days)</Label>
            <Input
              id="abandoned-cart-delay"
              type="number"
              value={abandonedCartDays}
              onChange={(e) => setAbandonedCartDays(e.target.value)}
            />
          </div>

          {/* Order Confirmation */}
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <Label>Order Confirmation</Label>
              <p className="text-sm text-gray-400">Send order confirmation emails</p>
            </div>
            <Switch 
              checked={automatedEvents.orderConfirmation} 
              onCheckedChange={(checked) => setAutomatedEvents((prev) => ({ ...prev, orderConfirmation: checked }))} 
            />
          </div>

          {/* Shipping Updates */}
          <div className="flex items-center justify-between space-y-2">
            <div className="space-y-2">
              <Label>Shipping Updates</Label>
              <p className="text-sm text-gray-400">Send shipping status updates</p>
            </div>
            <Switch 
              checked={automatedEvents.shippingUpdates} 
              onCheckedChange={(checked) => setAutomatedEvents((prev) => ({ ...prev, shippingUpdates: checked }))} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <p className="text-gray-400">Configure external webhook endpoints for events</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input 
              id="webhook-url"
              value={webhookUrl} 
              onChange={(e) => setWebhookUrl(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Webhook Secret</Label>
            <Input
              id="webhook-secret"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              placeholder="Enter webhook secret"
            />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="events-to-send">Events to Send</Label>
            <div className="w-full">
              <Select value={eventsToSend} onValueChange={setEventsToSend}>
              <SelectTrigger id="events-to-send">
                <SelectValue placeholder="Select events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="orders">Orders Only</SelectItem>
                <SelectItem value="products">Products Only</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2>Enable Webhooks</h2>
              <p className="text-gray-400">Send events to external endpoints</p>
            </div>
            <Switch checked={enableWebhooks} onCheckedChange={setEnableWebhooks} />
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <p className="text-gray-400">Customize email templates for automated events</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="w-full flex justify-between">
                <CardTitle>Welcome Email</CardTitle>
              <p className="text-green-600 p-1 text-sm rounded-full font-semibold bg-green-100">Active</p>
              </div>
              <p className="text-gray-400">Sent when a user registers.</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle>Subject Line</CardTitle>
              <Input 
              value={welcomeEmail} 
              onChange={(e) => setWelcomeEmail(e.target.value)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-full flex justify-between">
                <CardTitle>Abandoned Cart</CardTitle>
              <p className="text-green-600 p-1 text-sm rounded-full font-semibold bg-green-100">Active</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>Sent for abandoned carts.</p>
            </CardContent>
            <CardContent className="space-y-2">
             <CardTitle>Subject Line</CardTitle>
              <Input 
              value={welcomeEmail} 
              onChange={(e) => setWelcomeEmail(e.target.value)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader >
              <div className="w-full flex justify-between items-center">
                <CardTitle>Order Confirmation</CardTitle>
              <p className="text-green-600 p-1 text-sm rounded-full font-semibold bg-green-100">Active</p>
              </div>
            </CardHeader>
            <CardContent>
              <p>Sent after successful orders</p>
            </CardContent>
            <CardContent className="space-y-2">
              <CardTitle>Subject Line</CardTitle>
              <Input 
              value={welcomeEmail} 
              onChange={(e) => setWelcomeEmail(e.target.value)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader >
              <div className="flex w-full justify-between"><CardTitle>Shipping Update</CardTitle>
              <p className="text-red-600 bg-red-100 rounded-full p-1 text-sm font-semibold">Inactive</p>
              </div>
            </CardHeader>
            <CardContent >
              <p>Sent when order ships</p>
            </CardContent>
            <CardContent className="space-y-2">
              <CardTitle>Subject Line</CardTitle>
              <Input 
              value={shippingUpdate} 
              onChange={(e) => setShippingUpdate(e.target.value)} />
            </CardContent>
          </Card>
        </CardContent>
          <div className="mx-5">
             <h2 className="font-semibold">Sended Email</h2>
             <Input value={webhookUrl} onChange={e=>setWebhookSecret(e.target.value)}></Input>
          </div>
           <div className="mx-5">
             <h2 className="font-semibold">Sender Name</h2>
             <Input value={webhookUrl} onChange={e=>setWebhookSecret(e.target.value)}></Input>
          </div>
      </Card>
    </div>
  );
}