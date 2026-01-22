import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Globe, Mail, Phone, Calendar } from "lucide-react";

export default function ShopOwnerProfile() {
  return (
    <>
      {/* First Card - Store Profile */}
      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-6 text-center">
          {/* Store Image */}
          <div className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-lg">
            <Image
              src="https://i.ibb.co.com/35kqBtnB/Background.png"
              alt="Jack Doe"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Store Name */}
          <h2 className="text-xl font-semibold mb-2">Tech Gadgets Store</h2>

          {/* Badges */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge className="bg-green-100 text-green-700 border-none text-xs px-2 py-0.5">
              ✓ Verified
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-none text-xs px-2 py-0.5">
              Premium
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1 text-sm font-medium">4.9</span>
            <span className="text-gray-500 text-xs">(256 reviews)</span>
          </div>

          {/* Established */}
          <div className="flex items-center justify-center gap-1 mb-4">
            <Badge className="bg-blue-50 text-blue-600 border-none text-xs px-2 py-2 flex items-center">
              <Calendar size={14} className="mr-1" />
              Established: January 15, 2020
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-500" />
              <span>123 Market St, San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-gray-500" />
              <span>www.techgadgetsstore.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" />
              <span>contact@techgadgetsstore.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Card - Shop Owner */}
      <Card className="border rounded-lg mt-4 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Shop Owner</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Owner Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://i.ibb.co.com/gMHBP7Pt/images.jpg" alt="Jack Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium text-sm">Jack Doe</p>
              <p className="text-gray-500 text-xs">Premium Vendor</p>
            </div>
          </div>

          {/* Contact Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full text-sm bg-gray-50 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <Mail size={16} className="text-gray-600" />
            Contact Owner
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
