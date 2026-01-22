export interface ICategory {
  subCategories: string[]; // Array of ObjectIds
  _id: string;
  name: string;
  slug: string;
  details: string;
  icon: {
    name: string;
    url: string;
  };
  image: File;
  bannerImg: File;
  parentCategory?: string; // ObjectId of parent category
  createdAt: string;
  updatedAt: string; 
  __v: number;
}
