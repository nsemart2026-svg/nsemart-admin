import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Image from "next/image";

export function VendorProfile() {
  const documents = [
    {
      name: "Business License",
      uploadDate: "Jul 15, 2022",
      status: "verified" as const,
    },
    {
      name: "Tax Certificate",
      uploadDate: "Jul 12, 2022",
      status: "verified" as const,
    },
    {
      name: "ID Verification",
      uploadDate: "Jan 20, 2022",
      status: "pending" as const,
    },
    {
      name: "Shop Certificate",
      uploadDate: "",
      status: "rejected" as const,
    },
  ];

  const getStatusBadge = (status: "verified" | "pending" | "rejected") => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: "verified" | "pending" | "rejected") => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Vendor Profile
        </h1>
        <p className="text-gray-600">
          View and manage your vendor profile information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Image
                  src="/avatar-1.png"
                  alt="John Doe"
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                  width={96}
                  height={96}
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                John Doe
              </h3>
              <p className="text-sm text-gray-600 mb-3">Premium Vendor</p>

              <div className="flex items-center justify-center gap-1 mb-6">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  Verified
                </span>
              </div>

              <Button className="w-full bg-gray-900 hover:bg-gray-800">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-medium text-gray-900">John Doe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="font-medium text-gray-900">
                      123 Market St, San Francisco, CA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      john.doe@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Company</p>
                    <p className="font-medium text-gray-900">
                      Tech Innovations LLC
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Joined</p>
                    <p className="font-medium text-gray-900">
                      January 15, 2022
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Vendor Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        {doc.uploadDate && (
                          <p className="text-sm text-gray-600">
                            Uploaded: {doc.uploadDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-dashed bg-transparent"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
