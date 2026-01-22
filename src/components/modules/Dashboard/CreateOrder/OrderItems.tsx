/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";
import toast from "react-hot-toast";

interface OrderItemsProps {
  products: (Product & {
    quantity: number;
    price: number;
    priceType: string;
  })[];
  selectedProducts: any[];
  setSelectedProducts: any;
}

const OrderItems = ({
  products,
  selectedProducts,
  setSelectedProducts,
}: OrderItemsProps) => {
  const handleRemoveAll = (id: string) => {
    setSelectedProducts((prev: any) =>
      prev.filter((p: any) => p.productId !== id)
    );
  };

  const handleAddProduct = (product: any) => {
    setSelectedProducts((prev: any) => {
      const exists = prev.find((p: any) => p.productId === product._id);
      const stock = product.productInfo.quantity; // ✅ stock from productInfo

      if (exists) {
        if (exists.quantity + 1 > stock) {
          toast.error(`Stock limit exceeded! Available: ${stock}`);
          return prev; // stock exceed হলে quantity বাড়বে না
        }
        return prev.map((p: any) =>
          p.productId === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        if (stock < 1) {
          toast.error("Out of stock!");
          return prev;
        }
        toast.success(`${product.description.name} added`);
        return [
          ...prev,
          {
            productId: product._id,
            quantity: 1,
            price: product.price,
            priceType: product.priceType,
          },
        ];
      }
    });
  };
  const handleRemoveProduct = (product: any) => {
    setSelectedProducts((prev: any) => {
      const existing = prev.find((p: any) => p.productId === product._id);

      if (existing) {
        if (existing.quantity > 1) {
          return prev.map((p: any) =>
            p.productId === product._id ? { ...p, quantity: p.quantity - 1 } : p
          );
        } else {
          toast.dismiss();
          toast.success(`${product.description.name} removed completely`);
          return prev.filter((p: any) => p.productId !== product._id);
        }
      }

      return prev;
    });
  };

  return (
    <Card className="w-full">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-8">Order Items</h2>

        {/* 🖥️ Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">SKU</th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => {
                  const selected = selectedProducts.find(
                    (p: any) => p.productId === product._id
                  );
                  const quantity = selected?.quantity || 0;
                  const price = selected?.price || product.productInfo.price;
                  return (
                    <tr key={product._id} className="border-t border-gray-200">
                      <td className="px-4 py-2">{product.description.name}</td>
                      <td className="px-4 py-2">{product.productInfo.sku}</td>
                      <td className="px-4 py-2">
                        {price} <span className="text-xl">৳</span>
                      </td>
                      <td className="px-4 py-2">
                        {price * quantity} <span className="text-xl">৳</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleRemoveProduct(product)}
                            variant="outline"
                            size="sm"
                            className="bg-rose-600 text-white hover:bg-rose-500"
                          >
                            -
                          </Button>
                          <span>{quantity}</span>
                          <Button
                            onClick={() => handleAddProduct(product)}
                            variant="outline"
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-500"
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleRemoveAll(product._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No Order Items added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📱 Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {products.length > 0 ? (
            products.map((product) => {
              const selected = selectedProducts.find(
                (p: any) => p.productId === product._id
              );
              const quantity = selected?.quantity || 0;
              const price = selected?.price || product.productInfo.price;

              return (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">
                      {product.description.name}
                    </h3>
                    <button
                      onClick={() => handleRemoveAll(product._id)}
                      className="text-red-500 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="text-xs opacity-60 mb-1">
                    SKU: {product.productInfo.sku}
                  </p>

                  <div className="flex justify-between text-sm mb-1">
                    <span>Price:</span>
                    <span>
                      {price} <span className="text-xl ml-1">৳</span>
                    </span>
                  </div>

                  <div className="flex justify-between text-sm mb-1">
                    <span>Total:</span>
                    <span>
                      {price * quantity} <span className="text-xl ml-1">৳</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleRemoveProduct(product)}
                        variant="outline"
                        size="sm"
                        className="bg-rose-600 text-white hover:bg-rose-500"
                      >
                        -
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        onClick={() => handleAddProduct(product)}
                        variant="outline"
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-500"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm opacity-60">
              No Order Items added
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
