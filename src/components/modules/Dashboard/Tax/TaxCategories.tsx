import React from "react";
type TaxCategoryItem = {
  label: string;
  rate: string;
  productCount: number;
  color: string;
};

type TaxCategoriesProps = {
  items: TaxCategoryItem[];
};

const TaxCategories = ({ items }: TaxCategoriesProps) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-md">
      <h3 className="text-2xl font-semibold mb-2">Tax Categories</h3>
      <p className="text-sm opacity-60 mb-8">
        Overview of different tax rate categories
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4">
        {items.map((cat, idx) => (
          <div key={idx} className=" text-center">
            <h4 className={`py-2 ${cat.color}`}>{cat.rate}</h4>
            <p className="text-sm mt-2">{cat.label}</p>
            <p className="text-xs text-muted-foreground">
              {cat.productCount} products
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxCategories;
