"use client";

export default function VendorCard() {
  const vendorCount = 387;

  return (
    <div className="bg-[#C9C9C926] text-card-foreground rounded-xl p-4 md:p-6 shadow-sm w-full max-w-full h-[200px] aspect-[358/199] flex flex-col justify-between">
      {/* Title */}
      <div>
        <h3 className="text-xl   font-semibold">Total Vendor</h3>
        <p className="text-sm font-semibold text-muted-foreground">Last 7 days</p>
      </div>

      {/* Value */}
      <div className="text-3xl md:text-4xl font-bold">
        {vendorCount}
      </div>
    </div>
  );
}
