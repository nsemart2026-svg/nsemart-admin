import { z } from "zod";

// brandAndCategories validation
const brandAndCategoryZodSchema = z.object({
  brand: z.string().optional(),
  categories: z
    .array(z.string({ error: () => "Category ID must be a string!" }))
    .min(1, { message: "At least one category is required!" }),
  subcategory: z.string().optional(),
  tags: z
    .array(z.string({ error: () => "Tag ID must be a string!" }))
    .min(1, { message: "At least one tag is required!" }),
});

// description validation
const descriptionZodSchema = z.object({
  name: z.string({
    error: () => "Name is required!",
  }),
  slug: z.string().optional(),
  unit: z.string({
    error: () => "Unit is required!",
  }),
  description: z.string({
    error: () => "A small description is required!",
  }),
  status: z.enum(["publish", "draft"], { message: "Custom error message" }),
});

// external product validation
const externalZodSchema = z.object({
  productUrl: z.string().optional(),
  buttonLabel: z.string().optional(),
});

// productInfo validation
const productInfoZodSchema = z.object({
  price: z.number({
    error: () => "Price is required!",
  }),
  salePrice: z.number({
    error: () => "Sale price is required!",
  }),
  wholeSalePrice: z.number({
    error: () => "Sale price is required!",
  }),
  quantity: z.number({
    error: () => "Quantity is required!",
  }),
  sku: z.string({
    error: () => "SKU is required!",
  }),
  width: z.string({
    error: () => "Width is required!",
  }),
  height: z.string({
    error: () => "Height is required!",
  }),
  length: z.string({
    error: () => "Length is required!",
  }),
  isDigital: z.boolean().optional(),
  digital: z.string().optional(),
  isExternal: z.boolean().optional(),
  external: externalZodSchema,
  status: z
    .enum(["draft", "publish", "low-quantity"], {
      message: "Status must be 'draft', 'publish', or 'low-quantity'",
    })
    .optional(),
});
// commission validation
// Main Product Validation
export const createProductZodSchema = z.object({
  shopId: z.string().optional(),
  video: z.string().optional(),
  brandAndCategories: brandAndCategoryZodSchema,
  description: descriptionZodSchema,
  productType: z.enum(["simple", "variable"], {
    message: "Product type must be 'simple' or 'variable'",
  }),
  productInfo: productInfoZodSchema,
  specifications: z.any(),
  commission: z.object({
    regularType: z.enum(["percentage", "fixed"]),
    regularValue: z.number(),
    retailType: z.enum(["percentage", "fixed"]),
    retailValue: z.number(),
  }),
});

export const updateProductZodSchema = z.object({
  shopId: z.string().optional(),
  // featuredImg: z.string().url('Invalid feature image URL!').optional(),
  // gallery: z
  //   .array(z.string().url('Invalid gallery image URL!'))
  //   .min(1, { message: 'At least one gallery image is required!' })
  //   .optional(),
  video: z.string().optional(),
  brandAndCategories: brandAndCategoryZodSchema,
  description: descriptionZodSchema,
  productType: z.enum(["simple", "variable"], {
    message: "Product type must be 'simple' or 'variable'",
  }),
  productInfo: productInfoZodSchema,
  specifications: z.any(),
  commission: z.object({
    regularType: z.enum(["percentage", "fixed"]),
    regularValue: z.number(),
    retailType: z.enum(["percentage", "fixed"]),
    retailValue: z.number(),
  }),
});

export const createCategoryZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  details: z.string().optional(),
  icon: z
    .object({
      name: z.string().optional(),
      url: z.string().url().optional(),
    })
    .optional(),
  subCategories: z
    .array(
      z.string({ error: () => ({ message: "Category ID must be a string!" }) })
    )
    .min(1, { message: "At least one category is required!" }),
});
