'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export function TransactionTable() {
  const transactions = [
    {
      id: '#5088',
      customer: 'Joseph Wheeler',
      date: '27 July 2025',
      time: '12:35',
      method: 'CC',
      status: 'Pending',
    },
    {
      id: '#5089',
      customer: 'Joseph Wheeler',
      date: '27 July 2025',
      time: '12:37',
      method: 'CC',
      status: 'Completed',
    },
    {
      id: '#5090',
      customer: 'Joseph Wheeler',
      date: '28 July 2025',
      time: '09:45',
      method: 'PayPal',
      status: 'Failed',
    },
    {
      id: '#5090',
      customer: 'Joseph Wheeler',
      date: '28 July 2025',
      time: '09:45',
      method: 'PayPal',
      status: 'Failed',
    },
    {
      id: '#5090',
      customer: 'Joseph Wheeler',
      date: '28 July 2025',
      time: '09:45',
      method: 'PayPal',
      status: 'Failed',
    },
    {
      id: '#5090',
      customer: 'Joseph Wheeler',
      date: '28 July 2025',
      time: '09:45',
      method: 'PayPal',
      status: 'Failed',
    },
    {
      id: '#5090',
      customer: 'Joseph Wheeler',
      date: '28 July 2025',
      time: '09:45',
      method: 'PayPal',
      status: 'Failed',
    },
    {
      id: '', // Example with missing data
      customer: '',
      date: '',
      time: '',
      method: '',
      status: '',
    },
  ];

  const statusColor = {
    Pending: 'text-yellow-500',
    Completed: 'text-green-600',
    Failed: 'text-red-500',
  };

  return (
    <div className="mt-8 overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>{tx.id || 'N/A'}</TableCell>
              <TableCell>{tx.customer || 'Unknown'}</TableCell>
              <TableCell>{tx.date || '—'}</TableCell>
              <TableCell>{tx.time || '—'}</TableCell>
              <TableCell>{tx.method || '—'}</TableCell>
              <TableCell>
                <span className={`font-medium ${statusColor[tx.status as keyof typeof statusColor] || 'text-gray-500'}`}>
                  {tx.status || 'Unknown'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="link" className="text-blue-600 text-sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
