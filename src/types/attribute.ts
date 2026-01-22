export interface IAttributeValue {
  value: string;
  meta: string;
}

export interface IAttribute {
  _id: string;
  name: string;
  slug?: string;
  attributes: IAttributeValue[];
  type?: 'dropdown' | 'color' | 'text' | 'number';
  category?: { name: string };
  required?: boolean;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
