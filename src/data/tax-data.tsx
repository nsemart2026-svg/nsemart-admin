import { StatCardItem } from "@/components/shared/StatsCards";
import { TaxRateItem } from "@/components/tables/TaxManagementTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Percent, Calculator, MapPin } from "lucide-react";
export const statsData: StatCardItem[] = [
  {
    title: "Tax Rates",
    value: "18",
    description: "Active tax configurations",
    icon: <Calculator />,
    iconColor: "#0F60FF",
  },
  {
    title: "Regions",
    value: "12",
    description: "Countries/states covered",
    icon: <MapPin />,
    iconColor: "#1EB564",
  },
  {
    title: "Avg Tax Rate",
    value: "12.5%",
    description: "Across all regions",
    icon: <Percent />,
    iconColor: "#EF4343",
  },
  {
    title: "Monthly Tax",
    value: "$45,230",
    description: "Collected this month",
    icon: <Calculator />,
    iconColor: "#22C55E",
  },
];
export const categoryData = [
  {
    label: "Standard",
    rate: "20%",
    productCount: 1234,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Reduced",
    rate: "5%",
    productCount: 89,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Zero",
    rate: "0%",
    productCount: 23,
    color: "bg-gray-100 text-gray-700",
  },
  {
    label: "Exempt",
    rate: "N/A",
    productCount: 45,
    color: "bg-purple-100 text-purple-700",
  },
];

export const taxData: TaxRateItem[] = [
  {
    name: "Standard VAT",
    rate: "20%",
    type: "VAT",
    region: "UK",
    products: 1234,
    status: "Active",
  },
  {
    name: "Reduced VAT",
    rate: "5%",
    type: "VAT",
    region: "UK",
    products: 89,
    status: "Active",
  },
  {
    name: "US Sales Tax",
    rate: "8.5%",
    type: "Sales Tax",
    region: "California",
    products: 567,
    status: "Active",
  },
  {
    name: "EU Standard",
    rate: "19%",
    type: "VAT",
    region: "Germany",
    products: 345,
    status: "Active",
  },
  {
    name: "Zero Rate",
    rate: "0%",
    type: "Exempt",
    region: "Global",
    products: 23,
    status: "Active",
  },
  {
    name: "Luxury Tax",
    rate: "25%",
    type: "Luxury",
    region: "UK",
    products: 12,
    status: "Inactive",
  },
];
export const taxColumns = [
  { header: "Tax Name", accessor: "name" },
  { header: "Rate", accessor: "rate" },
  {
    header: "Type",
    accessor: "type",
    render: (value: string) => <Badge variant="outline">{value}</Badge>,
  },
  { header: "Region", accessor: "region" },
  { header: "Products", accessor: "products" },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <Badge
        variant="outline"
        className={
          value === "Active"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }
      >
        {value}
      </Badge>
    ),
  },
  {
    header: "Actions",
    accessor: "actions",
    render: () => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Products
        </Button>
      </div>
    ),
  },
];
