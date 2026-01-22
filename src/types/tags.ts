/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITag {
  _id: string;
  name: string;
  type: string;
  slug: string;
  details: string;
  icon: {
    name: string;
    url: string;
  };
  image?: string;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}


export interface ITagQueryParams {
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
  fields?: string;
  [key: string]: any;
}