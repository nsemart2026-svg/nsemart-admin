/* eslint-disable @typescript-eslint/no-explicit-any */

export type TCommission = {
  regularType: "percentage" | "fixed";
  regularValue: number; // e.g., 5% or 50 taka
  retailType: "percentage" | "fixed";
  retailValue: number; // e.g., 7% or 100 taka
  allowManualOverride?: boolean;
};
export interface Product {
  message(message: any): unknown;
  _id: string;
  shopId: string;
  featuredImg: string;
  gallery: string[];
  video?: string;
  brandAndCategories: {
    brand: {
      _id: string;
      name: string;
      icon: { name: string; url: string };
      images: { layout: string; image: string }[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    categories: {
      _id: string;
      name: string;
      slug: string;
      details: string;
      icon: { name: string; url: string };
      image: string;
      bannerImg: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }[];
    tags: {
      _id: string;
      name: string;
      slug: string;
      details: string;
      icon: { name: string; url: string };
      image: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }[];
  };
  description: {
    name: string;
    slug: string;
    unit: string;
    description: string;
    status: string;
  };
  productType: string;
  productInfo: {
    price: number;
    name?: string;
    salePrice?: number;
    wholeSalePrice?: number;
    quantity: number;
    sku: string;
    width?: string;
    height?: string;
    length?: string;
    isExternal: boolean;
    external?: {
      productUrl: string;
      buttonLabel: string;
    };
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  specifications?: any;
  // Commission Type Declaration
  commission: TCommission;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
}
