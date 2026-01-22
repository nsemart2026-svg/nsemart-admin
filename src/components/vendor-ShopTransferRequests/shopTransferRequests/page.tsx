"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transferRequests = [
  {
    id: "TR-7891",
    shopName: "Tech Gadgets Store",
    fromVendor: "John Doe",
    toVendor: "Sarah Johnson",
    date: "Jun 12, 2023",
    status: "pending",
  },
  {
    id: "TR-7890",
    shopName: "Fashion Outlet",
    fromVendor: "Michael Brown",
    toVendor: "Emily Davis",
    date: "Jun 10, 2023",
    status: "approved",
  },
  {
    id: "TR-7889",
    shopName: "Home Decor",
    fromVendor: "Robert Wilson",
    toVendor: "Jennifer Smith",
    date: "Jun 08, 2023",
    status: "rejected",
  },
  {
    id: "TR-7888",
    shopName: "Sports Equipment",
    fromVendor: "David Thompson",
    toVendor: "Lisa Anderson",
    date: "Jun 05, 2023",
    status: "pending",
  },
  {
    id: "TR-7887",
    shopName: "Organic Foods",
    fromVendor: "James Harris",
    toVendor: "Patricia Martinez",
    date: "Jun 03, 2023",
    status: "approved",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  return (
    <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function ShopTransferRequests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Requests")
  const [sortBy, setSortBy] = useState("Newest")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredRequests = transferRequests
    .filter((request) => {
      const matchesSearch =
        request.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === "All Requests" || request.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "Shop Name") return a.shopName.localeCompare(b.shopName)
      return 0
    })

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Shop Transfer Requests</h1>
        <p className="text-sm text-gray-500">Manage all shop ownership transfer requests.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by shop name or ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              {statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("All Requests")}>All Requests</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Approved")}>Approved</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              Sort by: {sortBy}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("Newest")}>Newest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Oldest")}>Oldest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("Shop Name")}>Shop Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-700">REQUEST ID</TableHead>
              <TableHead className="font-medium text-gray-700">SHOP NAME</TableHead>
              <TableHead className="font-medium text-gray-700">FROM VENDOR</TableHead>
              <TableHead className="font-medium text-gray-700">TO VENDOR</TableHead>
              <TableHead className="font-medium text-gray-700">DATE</TableHead>
              <TableHead className="font-medium text-gray-700">STATUS</TableHead>
              <TableHead className="font-medium text-gray-700">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.shopName}</TableCell>
                <TableCell className="text-gray-600">{request.fromVendor}</TableCell>
                <TableCell className="text-gray-600">{request.toVendor}</TableCell>
                <TableCell className="text-gray-600">{request.date}</TableCell>
                <TableCell>
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                      View
                    </Button>
                    {request.status === "pending" && (
                      <>
                        <Button variant="link" size="sm" className="text-green-600 p-0 h-auto">
                          Approve
                        </Button>
                        <Button variant="link" size="sm" className="text-red-600 p-0 h-auto">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{" "}
          {filteredRequests.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">About Shop Transfers</h3>
            <p className="text-sm text-blue-800">
              Shop transfers allow vendors to transfer ownership of their shops to other vendors. All transfer requests
              require admin approval before they are processed. Once approved, all shop data, products, and orders will
              be transferred to the new owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
