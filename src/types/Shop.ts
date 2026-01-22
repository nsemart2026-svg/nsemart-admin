export interface Shop {
  _id: string;
  vendorId: string;
  staffs: string[];
  logo: string;
  coverImage: string;
  basicInfo: {
    name: string;
    slug: string;
    description: string;
  };
  paymentInfo: {
    accountHolderName: string;
    accountHolderEmail: string;
    bankName: string;
    accountNumber: string;
  };
  shopAddress: {
    country: string;
    city: string;
    state: string;
    zip: string;
    streetAddress: string;
  };
  notificationEmail: {
    notificationEmail: string;
    isEnabled: boolean;
  };
  shopSetting: {
    contactNo: string;
    websiteUrl: string;
  };
  shopMaintenanceSetting: {
    image: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  };
  products: string;
  orders: string;
  commissionRate: number;
  currentBalance: number;
  transactions: string;
  withdrawals: string;
  attributes: string;
  status: string;
  isApproved: boolean;
  coupons: string;
  createdAt: string;
  updatedAt: string;
}
