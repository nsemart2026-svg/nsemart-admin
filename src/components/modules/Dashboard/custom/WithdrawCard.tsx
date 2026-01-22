"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useGetMyWithdrawalsQuery } from "@/redux/featured/withdrawals/withdrawalsApi";
import { useMemo } from "react";
import { IWithdrawal } from "@/types/withdrawals";

const fmt = (n: number, c: string = "৳") =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n) + " " + c;

export default function WithdrawCard() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?._id;

  const { data, isLoading } = useGetMyWithdrawalsQuery(userId!, { skip: !userId });

  const { totalWithdrawn, pendingWithdraw, lastWithdrawAt } = useMemo(() => {
    const withdrawals: IWithdrawal[] = data?.data || [];
    let total = 0;
    let pending = 0;
    let lastDate: string | undefined = undefined;

    if (withdrawals.length > 0) {
      withdrawals.forEach((w: IWithdrawal) => {
        const amount = w.amount ?? 0;
        if (w.status === "approved" || w.status === "paid") total += amount;
        if (w.status === "pending") pending += amount;
      });

      // latest withdrawal
      const last = withdrawals.reduce((prev, curr) =>
        new Date(prev.createdAt as string).getTime() > new Date(curr.createdAt as string).getTime()
          ? prev
          : curr
      );

      lastDate = new Date(last.createdAt as string).toLocaleDateString();
    }

    return {
      totalWithdrawn: { amount: total, currency: "৳" },
      pendingWithdraw: pending > 0 ? { amount: pending, currency: "৳" } : null,
      lastWithdrawAt: lastDate,
    };
  }, [data]); // ✅ use 'data' here instead of undefined 'withdrawals'

  if (isLoading) return <div>লোড হচ্ছে...</div>;

  return (
    <Card className="h-full bg-gradient-to-br from-amber-50 to-white border-amber-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base md:text-lg">Withdraw</CardTitle>
        <Wallet className="size-5 md:size-6 text-amber-600" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground">Total Withdrawn</div>
          <div className="text-xl md:text-2xl font-semibold">
            {fmt(totalWithdrawn.amount, totalWithdrawn.currency)}
          </div>
        </div>

        {pendingWithdraw && (
          <div>
            <div className="text-xs text-muted-foreground">Pending</div>
            <div className="text-lg">
              {fmt(pendingWithdraw.amount, pendingWithdraw.currency)}
            </div>
          </div>
        )}

        {lastWithdrawAt && (
          <div className="text-xs text-muted-foreground">Last: {lastWithdrawAt}</div>
        )}
      </CardContent>
    </Card>
  );
}

