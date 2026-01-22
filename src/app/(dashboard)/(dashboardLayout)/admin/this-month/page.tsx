"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Data types
type StatCardData = {
    title: string;
    value: number;
    change: number;
    changeText: string;
    color: string;
};

type WeeklyData = {
    name: string;
    Revenue: number;
    Expenses: number;
    NetProfit: number;
    TopMarginProducts: number;
    LowMarginProducts: number;
};

type ProductData = {
    product: string;
    category: string;
    qty: number;
    unitPrice: number;
    totalAmount: number;
    profit: number;
    margin: number;
};

const statCardsData: StatCardData[] = [
    {
        title: 'Total Revenue',
        value: 45680,
        change: 17.4,
        changeText: 'from last month',
        color: 'text-green-500'
    },
    {
        title: 'Total Expenses',
        value: 32450,
        change: -14.8,
        changeText: 'from last month',
        color: 'text-red-500'
    },
    {
        title: 'Net Profit',
        value: 13230,
        change: 25.2,
        changeText: 'from last month',
        color: 'text-green-500'
    },
    {
        title: 'Profit Margin',
        value: 29,
        change: 1.5,
        changeText: 'from last month',
        color: 'text-green-500'
    }
];

const weeklyData: WeeklyData[] = [
    { name: 'Week 1', Revenue: 8000, Expenses: 4000, NetProfit: 4000, TopMarginProducts: 5000, LowMarginProducts: 2000 },
    { name: 'Week 2', Revenue: 11000, Expenses: 5000, NetProfit: 6000, TopMarginProducts: 7500, LowMarginProducts: 2500 },
    { name: 'Week 3', Revenue: 13000, Expenses: 6500, NetProfit: 6500, TopMarginProducts: 8500, LowMarginProducts: 3000 },
    { name: 'Week 4', Revenue: 13680, Expenses: 6950, NetProfit: 6730, TopMarginProducts: 9000, LowMarginProducts: 3500 },
];

const topProductsData: ProductData[] = [
    { product: 'Wireless Headphones', category: 'Electronics', qty: 245, unitPrice: 89, totalAmount: 21805, profit: 8722, margin: 40 },
    { product: 'Smart Watch', category: 'Electronics', qty: 89, unitPrice: 299, totalAmount: 26611, profit: 7983, margin: 30 },
    { product: 'Coffee Maker', category: 'Appliances', qty: 156, unitPrice: 129, totalAmount: 20124, profit: 6037, margin: 30 },
    { product: 'Bluetooth Speaker', category: 'Electronics', qty: 203, unitPrice: 59, totalAmount: 11977, profit: 3593, margin: 30 },
    { product: 'Fitness Tracker', category: 'Health', qty: 134, unitPrice: 79, totalAmount: 10586, profit: 3176, margin: 30 },
];

const lowMarginProductsData: ProductData[] = [
    { product: 'Basic Case', category: 'Accessories', qty: 456, unitPrice: 12, totalAmount: 5472, profit: 274, margin: 5 },
    { product: 'USB Cable', category: 'Electronics', qty: 234, unitPrice: 8, totalAmount: 1872, profit: 187, margin: 10 },
    { product: 'Screen Protector', category: 'Accessories', qty: 189, unitPrice: 15, totalAmount: 2835, profit: 283, margin: 10 },
    { product: 'Basic Charger', category: 'Electronics', qty: 167, unitPrice: 18, totalAmount: 3006, profit: 301, margin: 10 },
    { product: 'Phone Stand', category: 'Accessories', qty: 145, unitPrice: 22, totalAmount: 3190, profit: 319, margin: 10 },
];

const PerformanceDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState('This Week');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const views = ['This Week','Daily Profit & Loss', 'Loss Analysis', 'Product Analysis', 'Brand Analysis'];

    const renderViewContent = () => {
        switch (activeView) {
            case 'This Week':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Performing Products Table */}
                        <Card className="rounded-xl shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">Top Performing Products-This month</h2>
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        High Performance
                                    </span>
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left table-auto">
                                        <thead>
                                            <tr className="border-b text-sm font-semibold text-gray-600">
                                                <th className="p-2">Product</th>
                                                <th className="p-2">Category</th>
                                                <th className="p-2 text-right">Sales</th>
                                                <th className="p-2 text-right">Revenue</th>
                                                <th className="p-2 text-right">Margin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topProductsData.map((product, index) => (
                                                <tr key={index} className="border-b text-sm">
                                                    <td className="p-2 font-medium">{product.product}</td>
                                                    <td className="p-2 text-gray-500">{product.category}</td>
                                                    <td className="p-2 text-right text-gray-500">{product.qty}</td>
                                                    <td className="p-2 text-right text-green-500 font-semibold">${product.totalAmount.toLocaleString()}</td>
                                                    <td className="p-2 text-right">
                                                        <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            {product.margin}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Low Margin Products Table */}
                        <Card className="rounded-xl shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">Low Margin Products</h2>
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        Need Attention
                                    </span>
                                </div>
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left table-auto">
                                        <thead>
                                            <tr className="border-b text-sm font-semibold text-gray-600">
                                                <th className="p-2">Product</th>
                                                <th className="p-2">Category</th>
                                                <th className="p-2 text-right">Sales</th>
                                                <th className="p-2 text-right">Revenue</th>
                                                <th className="p-2 text-right">Margin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lowMarginProductsData.map((product, index) => (
                                                <tr key={index} className="border-b text-sm">
                                                    <td className="p-2 font-medium">{product.product}</td>
                                                    <td className="p-2 text-gray-500">{product.category}</td>
                                                    <td className="p-2 text-right text-gray-500">{product.qty}</td>
                                                    <td className="p-2 text-right text-red-500 font-semibold">${product.totalAmount.toLocaleString()}</td>
                                                    <td className="p-2 text-right">
                                                        <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            {product.margin}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            case 'Daily Profit & Loss':
                return (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm h-[400px]">
                        <h2 className="text-2xl font-bold text-gray-800">Daily Profit & Loss</h2>
                        <p className="text-gray-500 mt-2">Content for Daily Profit & Loss will be displayed here.</p>
                    </div>
                );
            case 'Loss Analysis':
                return (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm h-[400px]">
                        <h2 className="text-2xl font-bold text-gray-800">Loss Analysis</h2>
                        <p className="text-gray-500 mt-2">Content for Loss Analysis will be displayed here.</p>
                    </div>
                );
            case 'Brand Analysis':
                return (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm h-[400px]">
                        <h2 className="text-2xl font-bold text-gray-800">Brand Analysis</h2>
                        <p className="text-gray-500 mt-2">Content for Brand Analysis will be displayed here.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-100 p-6 font-sans">
            <main className="flex-1 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className='flex items-center space-x-4'>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-bold">This Month Performance</h1>
                            <p className="text-sm text-gray-500">Detailed breakdown for current month</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button  className="border rounded px-4 text-sm font-semibold">12/06/2024</Button>
                        <Button variant="secondary" className="border rounded px-4 text-sm font-semibold">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                        </Button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCardsData.map((stat, index) => (
                        <Card key={index} className="rounded-xl shadow-sm">
                            <CardContent className="p-4 flex flex-col items-start">
                                <h2 className="text-sm font-medium text-gray-500">{stat.title}</h2>
                                <h3 className="text-2xl font-bold mt-1">
                                    {stat.title === 'Profit Margin' ? `${stat.value}%` : `$${stat.value.toLocaleString()}`}
                                </h3>
                                <p className={`flex items-center text-xs font-semibold mt-1`}>
                                    {stat.change > 0 ? (
                                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.color}`} />
                                    ) : (
                                        <TrendingDown className={`w-4 h-4 mr-1 ${stat.color}`} />
                                    )}
                                    <span className={`${stat.color}`}>{Math.abs(stat.change)}%</span>
                                    <span className="text-gray-400 ml-1">{stat.changeText}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Weekly Performance Chart */}
                <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-bold">Weekly Performance - This Month</h2>
                        <p className="text-sm text-gray-500 mb-4">Detailed breakdown for current month</p>
                        <div className="w-full h-80">
                            <ResponsiveContainer>
                                <LineChart
                                    data={weeklyData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Revenue" stroke="#059669" dot={{ stroke: '#059669', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="Expenses" stroke="#ef4444" dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="NetProfit" stroke="#3b82f6" dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="TopMarginProducts" stroke="#22c55e" strokeDasharray="5 5" dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="LowMarginProducts" stroke="#f97316" strokeDasharray="5 5" dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Dropdown menu for views */}
                <div className="relative">
                    <Button
                        variant="secondary"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between font-semibold border"
                    >
                        {activeView}
                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    {isDropdownOpen && (
                        <Card className="absolute top-full left-0 mt-2 rounded-xl shadow-lg z-10">
                            <CardContent className="p-0">
                                {views.map((view, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setActiveView(view);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="p-3 hover:bg-black hover:text-white cursor-pointer text-sm font-medium"
                                    >
                                        {view}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
                {renderViewContent()}
            </main>
        </div>
    );
};

export default PerformanceDashboard;
