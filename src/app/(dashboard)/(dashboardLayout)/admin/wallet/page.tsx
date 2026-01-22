import WalletCard from "@/components/cards/WalletCard";
import SearchInput from "@/components/shared/SearchInput";
import StatsCards from "@/components/shared/StatsCards";
import { Button } from "@/components/ui/button";
import { statsData, walletsData } from "@/data/wallet-data";
import { FilterIcon, Plus } from "lucide-react";
import React from "react";

const Wallet = () => {
  return (
    <div className="py-6 p-2 sm:p-4">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8
      text-center md:text-start"
      >
        <span>
          <h2 className="text-2xl lg:text-3xl font-semibold opacity-90">
            Wallet Item List
          </h2>
          <p className="opacity-60 text-sm lg:text-base">
            Manage your financial accounts and wallets
          </p>
        </span>
        <span className="flex items-center flex-col lg:flex-row gap-2">
          <Button>
            <Plus /> Add New Wallet
          </Button>
        </span>
      </div>
      <StatsCards items={statsData} />
      {/* Wallet Accounts */}
      <div className="bg-white mt-8 rounded-[8px]">
        <div className="p-4">
          <h3 className="text-2xl font-semibold mb-2">Wallet Accounts</h3>
          <p className="text-sm opacity-60">
            Complete list of all your financial accounts and wallets
          </p>

          <div
            className="flex flex-col md:flex-row gap-3 items-start md:items-center
         mb-6 mt-1"
          >
            <SearchInput placeholder="Search wallets..." className="w-full" />
            <Button variant="outline" className="text-gray-500">
              <FilterIcon /> Filter
            </Button>
          </div>
        </div>
        {/* Wallet Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-1">
          {walletsData.map((wallet, i) => (
            <WalletCard key={i} {...wallet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
