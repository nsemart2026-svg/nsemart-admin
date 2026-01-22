import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
interface WalletCardProps {
  name: string;
  type: string;
  balance: string;
  lastTransaction: string;
  status: string;
  icon: ReactNode;
}
const WalletCard = ({
  name,
  type,
  balance,
  lastTransaction,
  status,
  icon,
}: WalletCardProps) => {
  const isActive = status === "Active";
  return (
    <Card className="p-4 rounded-[8px]">
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1">
              <span className="opacity-70">{icon}</span>
              <h3 className="font-medium text-lg">{name}</h3>
            </div>
            <p className="text-sm opacity-60">{type}</p>
          </div>
          <Badge
            variant={isActive ? "default" : "destructive"}
            className={isActive ? "bg-green-100 text-green-600" : ""}>
            {status}
          </Badge>
        </div>
        <div>
          <div className="bg-green-100 text-center rounded p-4">
            <p className="text-sm opacity-60">Current Balance</p>
            <h2 className="text-2xl font-semibold text-[#1EB564]">{balance}</h2>
            <p className="opacity-60 text-sm">USD</p>
          </div>
        </div>
        <div className="text-xs opacity-60 text-center">
          Last Transaction
          <p className="text-sm">{lastTransaction}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">View Details</Button>
          <Button>Manage</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
