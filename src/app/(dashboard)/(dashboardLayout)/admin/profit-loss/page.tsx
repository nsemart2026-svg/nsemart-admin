"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { HiArrowTrendingUp } from 'react-icons/hi2';
import SelectPeriod from '@/components/shared/SelectPeriod';
import Link from 'next/link';
type BreakdownData = Record<string, { value: number; change: number }>;
const ProfitLossDashboard: React.FC = () => {
    const [selectedRange, setSelectedRange] = React.useState<{ start: string, end: string } | null>(null);
 
    const periods = [
        { title: 'This Month', revenue: 45680, expenses: 32450, netProfit: 13230, margin: '29%' },
        { title: 'Last Month', revenue: 38920, expenses: 28350, netProfit: 10570, margin: '27%' },
        { title: 'Quarter', revenue: 142500, expenses: 98750, netProfit: 43750, margin: '31%' },
        { title: 'Year', revenue: 485600, expenses: 342800, netProfit: 142800, margin: '29%' },
    ];

    const detailedBreakdown: BreakdownData = {
        totalRevenue: { value: 45680, change: +17.4 },
        costOfGoods: { value: 22340, change: -14.8 },
        operatingExpenses: { value: 10110, change: -13.7 },
        netProfit: { value: 13230, change: 25.2 },
    };

    const lastMonthBreakdown: BreakdownData = {
        totalRevenue: { value: 38920, change: +17.4 },
        costOfGoods: { value: 19460, change: -14.8 },
        operatingExpenses: { value: 18890, change: -13.7 },
        netProfit: { value: 10570, change: +25.2 },
    };

    const comparedBreakdown: BreakdownData = {
        totalRevenue: { value: 84600, change: +17.4 },
        costOfGoods: { value: 41800, change: -14.8 },
        operatingExpenses: { value: 29000, change: -13.7 },
        netProfit: { value: 570, change: +25.2 },
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-50">
            <main className="flex-1 p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div className='flex flex-col'>
                        <h1 className="text-2xl font-bold">Profit & Loss</h1>
                        <p>Track your business profitability</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="secondary" className='border'>Select Period</Button>
                        <Button variant="secondary" className='border'><Download />Export Report</Button>
                    </div>
                </header>

                {/* Period cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {periods.map((p, idx) => (
                       <Link key={idx} href={'/this-month'}>
                          <Card >
                            <CardContent>
                                <h2 className="text-md mb-2">{p.title}</h2>
                                <div className='w-full flex justify-between'>
                                    <p className='text-gray-400 '>Revenue:</p>
                                    <p className="text-green-600 font-bold">${p.revenue.toLocaleString()}</p>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <p className='text-gray-400 '>Expenses:</p>
                                    <p className="text-red-500 font-bold">${p.expenses.toLocaleString()}</p>
                                </div>
                                <hr className='my-2' />
                                <div className='w-full flex justify-between'>
                                    <p className="text-black font-semibold">Net Profit:</p>
                                    <p className='flex gap-1 items-center'>${p.netProfit.toLocaleString()}<HiArrowTrendingUp /></p>
                                </div>
                                <p className="text-gray-500 text-sm font-semibold mt-2">{p.margin} Margin</p>
                            </CardContent>
                        </Card>
                       </Link>
                    ))}
                </div>

                {/* Detailed Breakdown */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className='flex flex-col'>
                                <h2 className="text-lg font-semibold">$ Detailed Breakdown</h2>
                                <p className='text-sm text-gray-400'>
                                    {selectedRange
                                        ? `${selectedRange.start} - ${selectedRange.end}`
                                        : 'Comprehensive view of your financial performance'}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <SelectPeriod onChange={(range) => setSelectedRange(range)} />
                                <Button variant="secondary">Export Report</Button>
                            </div>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left w-1/3">Category</th>
                                    <th className="p-2 text-right w-1/6">
                                        {selectedRange ? 'This Month' : 'This Month'}
                                    </th>
                                    <th className="p-2 text-right w-1/6">
                                        {selectedRange ? 'Last Month' : ''}
                                    </th>
                                    <th className="p-2 text-right w-1/6">
                                        {selectedRange ? 'Compare' : ''}
                                    </th>
                                    <th className="p-2 text-right w-1/6">
                                        {selectedRange ? 'Change' : 'Change'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(detailedBreakdown).map((key) => (
                                    <tr key={key} className="border-b">
                                        <td className="p-2 text-left capitalize">{key.replace(/([A-Z])/g, ' $1')}</td>
                                        <td className="p-2 text-right">${detailedBreakdown[key].value.toLocaleString()}</td>
                                        <td className="p-2 text-right">
                                            {selectedRange ? `$${lastMonthBreakdown[key].value.toLocaleString()}` : ''}
                                        </td>
                                        <td className="p-2 text-right">
                                            {selectedRange ? `$${comparedBreakdown[key].value.toLocaleString()}` : ''}
                                        </td>
                                        <td className={`p-2 text-right ${detailedBreakdown[key].change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {selectedRange ? `${comparedBreakdown[key].change}%` : `${detailedBreakdown[key].change}%`}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default ProfitLossDashboard;