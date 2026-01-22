export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  gender?: string;
  contactNo?: string;
  bio?: string;
  status?: string;      
  orders?: number;      
  walletPoint?: number; 
  createdAt?: string;
  updatedAt?: string;
  commissionBalance?:number
}