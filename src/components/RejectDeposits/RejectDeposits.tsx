"use client"

import { useState } from "react"
import { Search, Calendar, X } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

const depositsData = [
    {
        id: "TXN-2024-105",
        account: "Primary Business Account",
        amount: "$3,500 USD",
        date: "2024-06-12",
        status: "Rejected",
        description: "Insufficient funds"
    },
    {
        id: "TXN-2024-106",
        account: "PayPal Business",
        amount: "$2,200.75 USD",
        date: "2024-06-12",
        status: "Rejected",
        description: "Account verification required"
    },
    {
        id: "TXN-2024-107",
        account: "Stripe Account",
        amount: "$1,850.24 USD",
        date: "2024-06-12",
        status: "Rejected",
        description: "Suspected fraud"
    },
    {
        id: "TXN-2024-108",
        account: "Savings Account",
        amount: "$10,000 USD",
        date: "2024-06-12",
        status: "Rejected",
        description: "Transaction limit exceeded"
    }
]

function RejectedDeposits() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2024, 5, 12), // June 12, 2024
        to: new Date(2024, 5, 12)
    })

    const filteredDeposits = depositsData.filter(deposit =>
        deposit.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Rejected Deposits</h1>
                <p className="text-sm text-gray-600 mt-1">View all rejected deposit attempts</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search transaction id..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-auto">
                            <Calendar className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                                        {format(dateRange.to, "dd/MM/yyyy")}
                                    </>
                                ) : (
                                    format(dateRange.from, "dd/MM/yyyy")
                                )
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="font-medium text-gray-900">
                        Rejected Deposits <span className="text-sm font-normal text-gray-500">4</span>
                    </h2>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium text-gray-700">Transaction ID</TableHead>
                            <TableHead className="font-medium text-gray-700">Account</TableHead>
                            <TableHead className="font-medium text-gray-700">Amount</TableHead>
                            <TableHead className="font-medium text-gray-700">Date</TableHead>
                            <TableHead className="font-medium text-gray-700">Status</TableHead>
                            <TableHead className="font-medium text-gray-700">Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDeposits.map((deposit, index) => (
                            <TableRow key={deposit.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <TableCell className="font-medium text-gray-900">{deposit.id}</TableCell>
                                <TableCell className="text-gray-700">{deposit.account}</TableCell>
                                <TableCell className="font-medium text-red-600">{deposit.amount}</TableCell>
                                <TableCell className="text-gray-700">{deposit.date}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-red-500 text-white text-red-800 hover:bg-red-500">
                                        <X className="text-white" /><span className="text-white">Rejected</span>
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600">{deposit.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default RejectedDeposits