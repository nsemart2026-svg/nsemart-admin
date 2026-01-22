import ListedProducts from "@/components/modules/Dashboard/shop-profile/ListedProducts";
import ShippingReturns from "@/components/modules/Dashboard/shop-profile/ShippingReturns";
import ShopDescription from "@/components/modules/Dashboard/shop-profile/ShopDescription";
import ShopDetails from "@/components/modules/Dashboard/shop-profile/ShopDetails";
import ShopOwnerProfile from "@/components/modules/Dashboard/shop-profile/ShopOwnerProfile";
import ShopPerformance from "@/components/modules/Dashboard/shop-profile/ShopPerformance";

export default function ShopProfile() {
  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Owner profile always takes first column */}
        <div className="col-span-1">
          <ShopOwnerProfile />
        </div>

        {/* Right side content — spans multiple columns depending on screen */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-4">
          
          <ShopPerformance />
          <ListedProducts />

          {/* Shop details + Shipping in row for large screens, stacked for small */}
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <ShopDetails  />
            <ShippingReturns />
          </div>

          <ShopDescription />
        </div>

      </div>
    </div>
  );
}
