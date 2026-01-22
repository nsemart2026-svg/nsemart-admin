'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreVertical, PlusCircle } from 'lucide-react';

export type PaymentMethodCardProps = {
  cardBrand?: string;
  cardNumber?: string;
  holderName?: string;
  expiry?: string;
  status?: 'Active' | 'Inactive';
  transactions?: number;
  revenue?: number;
  onDeactivate?: () => void;
};

export function PaymentMethodCard({
  cardBrand,
  cardNumber,
  holderName,
  expiry,
  status,
  transactions,
  revenue,
  onDeactivate,
}: PaymentMethodCardProps) {
  return (
    <Card className="w-full max-w-full md:h-[330px] rounded-lg shadow-md border">
      <CardHeader className="flex items-start justify-between pb-2">
        <CardTitle className="text-base">Payment Method</CardTitle>
        <MoreVertical className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Top section: Card + Details side by side on md+, stacked on sm */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Card visual */}
            <div className="w-full md:w-[260px] bg-gradient-to-tr from-emerald-700 to-green-500 text-white rounded-xl p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold">{cardBrand || 'Finaci'}</div>
                <div className="rounded-full bg-white/20 p-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-lg font-semibold tracking-widest">
                {cardNumber || '**** **** **** 2345'}
              </div>
              <div className="flex justify-between text-[11px] mt-4">
                <div>
                  <div className="opacity-70">Card Holder name</div>
                  <div className="font-medium">{holderName || 'Noman Manzoor'}</div>
                </div>
                <div>
                  <div className="opacity-70">Expiry Date</div>
                  <div className="font-medium">{expiry || '02/30'}</div>
                </div>
              </div>
            </div>

            {/* Card details */}
            <div className="flex flex-col justify-between flex-1">
              <div className="text-sm space-y-1">
                <div>
                  <span className="text-muted-foreground">Status:</span>{' '}
                  <span
                    className={
                      (status || 'Inactive') === 'Active'
                        ? 'text-green-600 font-medium'
                        : 'text-red-600 font-medium'
                    }
                  >
                    {status || 'Active'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Transactions:</span>{' '}
                  <span className="font-semibold">
                    {transactions?.toLocaleString() || '1,250'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Revenue:</span>{' '}
                  <span className="font-semibold">
                    {revenue?.toLocaleString() || '50,000'}
                  </span>
                </div>
                <div>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    View Transactions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section: Action buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
            <Button
              variant="outline"
              className="gap-1 text-sm px-4 py-2 border rounded-md w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Add Card
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDeactivate}
              className="text-red-600 border border-red-500 hover:bg-red-50 w-full sm:w-auto"
            >
              Deactivate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
