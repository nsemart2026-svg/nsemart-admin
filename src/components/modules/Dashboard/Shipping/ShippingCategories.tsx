import React from "react";
type ShippingCategoryItem = {
  label: string;
  rate: string;
  productCount: string;
  color: string;
};

type ShippingCategoriesProps = {
  items: ShippingCategoryItem[];
};

const ShippingCategories = ({ items }: ShippingCategoriesProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-md">
      <h3 className="text-2xl font-semibold mb-2">Shipping Carriers</h3>
      <p className="text-sm opacity-60 mb-8">
        Overview of integrated shipping partners
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 xl:gap-4">
        {items.map((cat, idx) => (
          <div key={idx} className=" text-center">
            <h4 className={`py-2 ${cat.color}`}>{cat.rate}</h4>
            <p className="text-sm mt-2">{cat.label}</p>
            <p className="text-xs text-muted-foreground">{cat.productCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingCategories;
