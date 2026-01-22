
// 🔹 Withdrawal Type
export interface IWithdrawal {
  _id?: string; // optional because MongoDB ID might not exist before creation
  shopId?: string; // optional, if associated with a shop
  user?: {
    _id: string;
    name: string;
    email: string;
    role?: string;
    commissionBalance?: number;
  }| string  // supports either populated user object or userId string
  amount: number; // required
  paymentMethod: "cash-on"; // currently only cash-on
  status?: "pending" | "approved" | "on-hold" | "processing" | "rejected" | string; // optional, defaults to pending
  description: string; // short description (like Withdraw)
  note: string; // admin or user note
  createdAt?: string;
  updatedAt?: string;
}

// 🔹 Common API Response Type
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
