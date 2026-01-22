export interface IBrand {
  _id: string;
  name: string;
  icon: {
    name: string;
    url: string;
  };
  images: {
    layout: string;
    image: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
