"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import clsx from "clsx";

type VendorStatus = "Active" | "Pending" | "Inactive";

type VendorCardProps = {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  status: VendorStatus;
  rating: number;
  products: number;
};

export default function VendorCard({
  name,
  contactName,
  email,
  phone,
  location,
  status,
  rating,
  products,
}: VendorCardProps) {
  return (
    <Card className="w-full rounded-xl border p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div >
          <h2 className="font-bold text-base">{name}</h2>
          
        </div>
        
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              status === "Active" && "bg-green-100 text-green-700",
              status === "Pending" && "bg-gray-100 text-gray-600",
              status === "Inactive" && "bg-red-100 text-red-700"
            )}
          >
            {status}
          </span>
          <div className="flex items-center text-sm text-yellow-600 font-medium">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 stroke-yellow-400" />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p className="text-sm mb-2 text-muted-foreground">
            Contact: {contactName}
          </p>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t mt-2">
        <div className="text-sm">
          Products <br />
          <span className="font-bold text-lg">{products}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"  size="sm">
            View Products
          </Button>
          <Button variant="ghost" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </Card>
  );
}
