import { IInventoryStats } from '@/app/(dashboard)/(dashboardLayout)/admin/inventory-management/page';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}

const stats: StatItem[] = [
  {
    title: 'Total Products',
    value: '1,234',
    subtitle: '+12% from last month',
    icon: '💎',
    color: 'text-purple-600',
  },
  {
    title: 'Low Stock Items',
    value: '24',
    subtitle: 'Needs restocking',
    icon: '⚠️',
    color: 'text-yellow-600',
  },
  {
    title: 'Out of Stock',
    value: '8',
    subtitle: '-3 from yesterday',
    icon: '🚨',
    color: 'text-red-600',
  },
  {
    title: 'Total Value',
    value: '$2.4M',
    subtitle: '+6% from last month',
    icon: '📈',
    color: 'text-green-600',
  },
];

const InventoryStatsCard = ({
  inventoryStats,
  isLoading,
}: {
  inventoryStats: any;
  isLoading: any;
}) => {
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Products</p>
                  <p className="text-2xl font-bold">
                    {inventoryStats?.totalProducts || 0}
                  </p>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </div>
                <div className={`text-2xl text-purple-600`}>💎</div>
              </div>
            </CardContent>
          </Card>{' '}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low Stock Items</p>
                  <p className="text-2xl font-bold">
                    {inventoryStats?.lowStockItems || 0}
                  </p>
                  <p className="text-xs text-gray-500">Needs restocking</p>
                </div>
                <div className={`text-2xl text-yellow-600`}>⚠️</div>
              </div>
            </CardContent>
          </Card>{' '}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold">
                    {inventoryStats?.outOfStock || 0}
                  </p>
                  <p className="text-xs text-gray-500">-3 from yesterday</p>
                </div>
                <div className={`text-2xl text-red-600`}>🚨</div>
              </div>
            </CardContent>
          </Card>{' '}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-2xl font-bold">
                    {inventoryStats?.totalValue|| 0}
                  </p>
                  <p className="text-xs text-gray-500">+6% from last month</p>
                </div>
                <div className={`text-2xl text-green-600`}>📈</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InventoryStatsCard;
