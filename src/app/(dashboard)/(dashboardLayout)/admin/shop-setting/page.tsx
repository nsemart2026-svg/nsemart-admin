"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ShopInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
}

interface ShopAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface DayHours {
  enabled: boolean;
  from: string;
  to: string;
}

interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface ShopPolicies {
  guestCheckout: boolean;
  accountVerification: boolean;
  enableReviews: boolean;
  autoApproveReviews: boolean;
  minOrderAmount: number;
  freeShippingThreshold: number;
}

interface InventorySettings {
  trackInventory: boolean;
  allowBackorders: boolean;
  lowStockThreshold: number;
  outOfStockBehavior: string;
}

interface CustomerSettings {
  registration: boolean;
  wishlist: boolean;
  orderHistory: boolean;
  passwordRequirements: string;
}

export default function ShopSettingsPage() {
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    name: "Your Store Name",
    tagline: "Your store's tagline",
    description: "",
    email: "contact@yourstore.com",
    phone: "+1 (555) 123-4567",
  });

  const [shopAddress, setShopAddress] = useState<ShopAddress>({
    address1: "123 Main Street",
    address2: "",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  });
  const [operatingHours, setOperatingHours] = useState<OperatingHours>({
    monday: { enabled: true, from: "09:00", to: "17:00" },
    tuesday: { enabled: true, from: "09:00", to: "17:00" },
    wednesday: { enabled: true, from: "09:00", to: "17:00" },
    thursday: { enabled: true, from: "09:00", to: "17:00" },
    friday: { enabled: true, from: "09:00", to: "17:00" },
    saturday: { enabled: false, from: "09:00", to: "17:00" },
    sunday: { enabled: false, from: "09:00", to: "17:00" },
  });
  const [shopPolicies, setShopPolicies] = useState<ShopPolicies>({
    guestCheckout: true,
    accountVerification: true,
    enableReviews: true,
    autoApproveReviews: false,
    minOrderAmount: 25.00,
    freeShippingThreshold: 75.00,
  });

  const [inventorySettings, setInventorySettings] = useState<InventorySettings>({
    trackInventory: true,
    allowBackorders: false,
    lowStockThreshold: 10,
    outOfStockBehavior: "hide",
  });

  const [customerSettings, setCustomerSettings] = useState<CustomerSettings>({
    registration: true,
    wishlist: true,
    orderHistory: true,
    passwordRequirements: "strong",
  });
  const handleSave = (): void => {
    console.log("Saving shop settings...", {
      shopInfo,
      shopAddress,
      operatingHours,
      shopPolicies,
      inventorySettings,
      customerSettings,
    });
  };
  
  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, '0');
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  const renderOperatingHours = () => {
    const days: Array<keyof OperatingHours> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    return days.map((day) => (
      <div key={day} className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Switch
            checked={operatingHours[day].enabled}
            onCheckedChange={(checked) =>
              setOperatingHours(prev => ({
                ...prev,
                [day]: { ...prev[day], enabled: checked }
              }))
            }
          />
          <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
        </div>
        <div className="flex space-x-2">
          <Select
            value={operatingHours[day].from}
            onValueChange={(value) =>
              setOperatingHours(prev => ({
                ...prev,
                [day]: { ...prev[day], from: value }
              }))
            }
          >
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="self-center">to</span>
          <Select
            value={operatingHours[day].to}
            onValueChange={(value) =>
              setOperatingHours(prev => ({
                ...prev,
                [day]: { ...prev[day], to: value }
              }))
            }
          >
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="flex-1 p-6 lg:p-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shop Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure store information and policies</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
              <p className="text-sm text-gray-500">Basic store details and contact information</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" value={shopInfo.name} onChange={(e) => setShopInfo({...shopInfo, name: e.target.value})} placeholder="Your Store Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-tagline">Store Tagline</Label>
                <Input id="store-tagline" value={shopInfo.tagline} onChange={(e) => setShopInfo({...shopInfo, tagline: e.target.value})} placeholder="Your store&apos;s tagline" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <textarea id="store-description" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" value={shopInfo.description} onChange={(e) => setShopInfo({...shopInfo, description: e.target.value})} placeholder="Store description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" type="email" value={shopInfo.email} onChange={(e) => setShopInfo({...shopInfo, email: e.target.value})} placeholder="contact@yourstore.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Store Phone</Label>
                <Input id="store-phone" value={shopInfo.phone} onChange={(e) => setShopInfo({...shopInfo, phone: e.target.value})} placeholder="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>

          {/* Shop Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shop Address</CardTitle>
              <p className="text-sm text-gray-500">Physical store location and shipping address</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address-1">Address Line 1</Label>
                <Input id="address-1" value={shopAddress.address1} onChange={(e) => setShopAddress({...shopAddress, address1: e.target.value})} placeholder="123 Main Street" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-2">Address Line 2</Label>
                <Input id="address-2" value={shopAddress.address2} onChange={(e) => setShopAddress({...shopAddress, address2: e.target.value})} placeholder="Suite 100 (optional)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={shopAddress.city} onChange={(e) => setShopAddress({...shopAddress, city: e.target.value})} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" value={shopAddress.state} onChange={(e) => setShopAddress({...shopAddress, state: e.target.value})} placeholder="State" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" value={shopAddress.postalCode} onChange={(e) => setShopAddress({...shopAddress, postalCode: e.target.value})} placeholder="10001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select  value={shopAddress.country} onValueChange={(value) => setShopAddress({...shopAddress, country: value})}>
                    <SelectValue placeholder="Select country" />
                    <SelectContent>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <p className="text-sm text-gray-500">Set your store&apos;s business hours</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderOperatingHours()}
            </CardContent>
          </Card>
          
          {/* Shop Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Shop Policies</CardTitle>
              <p className="text-sm text-gray-500">Configure store policies and settings</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="guest-checkout-switch">Allow Guest Checkout</Label>
                  <p className="text-sm text-gray-400">Allow purchases without account</p>
                </div>
                <Switch checked={shopPolicies.guestCheckout} onCheckedChange={(checked) => setShopPolicies({...shopPolicies, guestCheckout: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="account-verification-switch">Require Account Verification</Label>
                  <p className="text-sm text-gray-400">Email verification for new accounts</p>
                </div>
                <Switch checked={shopPolicies.accountVerification} onCheckedChange={(checked) => setShopPolicies({...shopPolicies, accountVerification: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-reviews-switch">Enable Reviews</Label>
                  <p className="text-sm text-gray-400">Allow product reviews</p>
                </div>
                <Switch checked={shopPolicies.enableReviews} onCheckedChange={(checked) => setShopPolicies({...shopPolicies, enableReviews: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve-reviews-switch">Auto-approve Reviews</Label>
                  <p className="text-sm text-gray-400">Automatically publish reviews</p>
                </div>
                <Switch checked={shopPolicies.autoApproveReviews} onCheckedChange={(checked) => setShopPolicies({...shopPolicies, autoApproveReviews: checked})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-order-amount">Minimum Order Amount</Label>
                <Input id="min-order-amount" type="number" value={shopPolicies.minOrderAmount} onChange={(e) => setShopPolicies({...shopPolicies, minOrderAmount: parseFloat(e.target.value) || 0})} placeholder="Minimum order amount" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold</Label>
                <Input id="free-shipping-threshold" type="number" value={shopPolicies.freeShippingThreshold} onChange={(e) => setShopPolicies({...shopPolicies, freeShippingThreshold: parseFloat(e.target.value) || 0})} placeholder="Free shipping threshold" />
              </div>
            </CardContent>
          </Card>
          
          {/* Inventory Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure inventory tracking and alerts</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="track-inventory-switch">Track Inventory</Label>
                  <p className="text-sm text-gray-400">Monitor stock levels</p>
                </div>
                <Switch checked={inventorySettings.trackInventory} onCheckedChange={(checked) => setInventorySettings({...inventorySettings, trackInventory: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-backorders-switch">Allow Backorders</Label>
                  <p className="text-sm text-gray-400">Sell out-of-stock items</p>
                </div>
                <Switch checked={inventorySettings.allowBackorders} onCheckedChange={(checked) => setInventorySettings({...inventorySettings, allowBackorders: checked})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                <Input id="low-stock-threshold" type="number" value={inventorySettings.lowStockThreshold} onChange={(e) => setInventorySettings({...inventorySettings, lowStockThreshold: parseInt(e.target.value) || 0})} placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="out-of-stock-behavior">Out of Stock Behavior</Label>
                <Select value={inventorySettings.outOfStockBehavior} onValueChange={(value) => setInventorySettings({...inventorySettings, outOfStockBehavior: value})}>
                  <SelectValue placeholder="Select behavior" />
                  <SelectContent>
                    <SelectItem value="hide">Hide Product</SelectItem>
                    <SelectItem value="show-unavailable">Show as Unavailable</SelectItem>
                    <SelectItem value="allow-backorder">Allow Backorder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Customer Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Settings</CardTitle>
              <p className="text-sm text-gray-500">Configure customer account and interaction settings</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customer-registration-switch">Customer Registration</Label>
                  <p className="text-sm text-gray-400">Allow new customer registration</p>
                </div>
                <Switch checked={customerSettings.registration} onCheckedChange={(checked) => setCustomerSettings({...customerSettings, registration: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customer-wishlist-switch">Customer Wishlist</Label>
                  <p className="text-sm text-gray-400">Enable wishlist feature</p>
                </div>
                <Switch checked={customerSettings.wishlist} onCheckedChange={(checked) => setCustomerSettings({...customerSettings, wishlist: checked})} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-history-switch">Order History</Label>
                  <p className="text-sm text-gray-400">Show customer order history</p>
                </div>
                <Switch checked={customerSettings.orderHistory} onCheckedChange={(checked) => setCustomerSettings({...customerSettings, orderHistory: checked})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-requirements">Password Requirements</Label>
                <Select value={customerSettings.passwordRequirements} onValueChange={(value) => setCustomerSettings({...customerSettings, passwordRequirements: value})}>
                  <SelectValue placeholder="Select strength" />
                  <SelectContent>
                    <SelectItem value="weak">Weak</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="strong">Strong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <Button onClick={handleSave}>Save Shop Settings</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
