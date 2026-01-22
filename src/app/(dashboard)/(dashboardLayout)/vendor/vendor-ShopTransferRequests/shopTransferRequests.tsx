"use client"

import { useState } from "react"
import { Search, Filter, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransferRequest {
    id: string
    shopName: string
    fromVendor: string
    toVendor: string
    date: string
    status: "pending" | "approved" | "rejected"
}

const mockData: TransferRequest[] = [
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
    {
        id: "TR-7886",
        shopName: "Book Haven",
        fromVendor: "Thomas White",
        toVendor: "Nancy Clark",
        date: "Jun 01, 2023",
        status: "pending",
    },
    {
        id: "TR-7885",
        shopName: "Pet Supplies",
        fromVendor: "Charles Lewis",
        toVendor: "Karen Walker",
        date: "May 28, 2023",
        status: "approved",
    },
    {
        id: "TR-7884",
        shopName: "Beauty Essentials",
        fromVendor: "Daniel Hall",
        toVendor: "Betty Young",
        date: "May 25, 2023",
        status: "rejected",
    },
    {
        id: "TR-7883",
        shopName: "Toy World",
        fromVendor: "Paul Allen",
        toVendor: "Dorothy King",
        date: "May 22, 2023",
        status: "pending",
    },
    {
        id: "TR-7882",
        shopName: "Gourmet Kitchen",
        fromVendor: "Mark Scott",
        toVendor: "Amanda Green",
        date: "May 20, 2023",
        status: "approved",
    },
]

export function ShopTransferRequests() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("newest")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filteredData = mockData
        .filter((item) => {
            const matchesSearch =
                item.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus =
                statusFilter === "all" || item.status === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            } else if (sortBy === "oldest") {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            } else if (sortBy === "name") {
                return a.shopName.localeCompare(b.shopName)
            }
            return 0
        })

    const totalItems = filteredData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                    </Badge>
                )
            case "approved":
                return (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Approved
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Rejected
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getActionButtons = (status: string) => {
        return (
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 h-auto"
                >
                    View
                </Button>
                {status === "pending" && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 px-2 py-1 h-auto"
                        >
                            Approve
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 h-auto"
                        >
                            Reject
                        </Button>
                    </>
                )}
                {status === "approved" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 px-2 py-1 h-auto"
                    >
                        View
                    </Button>
                )}
                {status === "rejected" && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 px-2 py-1 h-auto"
                    >
                        View
                    </Button>
                )}
            </div>
        )
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="w-full p-3">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Shop Transfer Requests</h1>
                <p className="text-gray-600">Manage all shop ownership transfer requests</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search by shop name or ID..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1) // Reset to first page when searching
                                }}
                                className="pl-10 border-gray-300"
                            />
                        </div>
                        <div className="flex gap-3 items-center">
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => {
                                    setStatusFilter(value)
                                    setCurrentPage(1) // Reset to first page when changing filter
                                }}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="All Requests" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Requests</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Sort by: Newest" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                    <SelectItem value="name">Name</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Request ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Shop Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    From Vendor
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    To Vendor
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{request.shopName}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{request.fromVendor}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{request.toVendor}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{request.date}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(request.status)}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">{getActionButtons(request.status)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">
                                        No transfer requests found matching your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                    </div>
                    <div className="flex gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                className={page === currentPage ? "bg-blue-600 hover:bg-blue-700" : ""}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-blue-900 mb-1">About Shop Transfers</h3>
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