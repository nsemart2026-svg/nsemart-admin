/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "../ui/button";
import { ImageUploader } from "../shared/ImageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import MultipleSelector from "../ui/multiselect";

import { useGetAllCategoriesQuery } from "@/redux/featured/categories/categoryApi";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectTags, setTags } from "@/redux/featured/tags/tagsSlice";
import {
  selectCategories,
  setCategories,
} from "@/redux/featured/categories/categorySlice";
import { updateProductZodSchema } from "./formSchema"; // Assuming this path is correct
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/featured/products/productsApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";
import { selectBrands, setBrands } from "@/redux/featured/brands/brandsSlice";
import { selectShops, setShops } from "@/redux/featured/shop/shopSlice";
import { useGetAllTagsQuery } from "@/redux/featured/tags/tagsApi";
import RichTextEditor from "../editor/RichTextEditor";
import { setProducts } from "@/redux/featured/products/productSlice";
import { Product } from "@/types/Product";
import { useGetAllBrandsQuery } from "@/redux/featured/brands/brandsApi";

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
};

const FormSkeleton = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-lg font-semibold">Loading Form...</div>
  </div>
);

type ProductFormValues = z.infer<typeof updateProductZodSchema>;

export default function EditProductForm({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // const { data: editableProduct, isLoading: isProductLoading } =
  //   useGetSingleProductQuery(id);
  const { data: editableProduct, isLoading: isProductLoading } =
    useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { data: categoriesDatau, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  const { data: tagsDatau, isLoading: isTagsLoading } =
    useGetAllTagsQuery(undefined);
  const { data: brandsu, isLoading: isBrandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: shopDatau, isLoading: isShopDataLoading } =
    useGetAllShopsQuery();

  useEffect(() => {
    if (tagsDatau) {
      dispatch(setTags(tagsDatau));
    }
    if (categoriesDatau) {
      dispatch(setCategories(categoriesDatau));
    }
    if (brandsu) {
      dispatch(setBrands(brandsu));
    }
    if (shopDatau) {
      dispatch(setShops(shopDatau));
    }
  }, [dispatch, tagsDatau, categoriesDatau, brandsu, shopDatau]);

  const categoriesData = useAppSelector(selectCategories);
  const tagsData = useAppSelector(selectTags);
  const brands = useAppSelector(selectBrands);
  const shopData = useAppSelector(selectShops);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [galleryImage, setGalleryImage] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(updateProductZodSchema),
    mode: "onChange",
  });

  const isReady = editableProduct && brands && shopData;

  useEffect(() => {
    if (isReady) {
      const product = editableProduct;

      const defaultValues = {
        shopId: product.shopId,
        featuredImg: product.featuredImg,
        gallery: product.gallery,
        video: product.video || "",
        brandAndCategories: {
          // brand: product.brandAndCategories.brand?._id || "",
          categories: product.brandAndCategories.categories.map(
            (cat: any) => cat._id
          ),
          subcategory: (product.brandAndCategories as any).subcategory || "",
          tags: product.brandAndCategories.tags.map((tag: any) => tag._id),
        },
        description: {
          name: product.description.name,
          slug: product.description.slug,
          unit: product.description.unit,
          description: product.description.description,
          status: product.description.status,
        },
        productType: product.productType,
        productInfo: {
          price: product.productInfo.price,
          salePrice: product.productInfo.salePrice || 0,
          wholeSalePrice: product.productInfo.wholeSalePrice || 0,
          quantity: product.productInfo.quantity,
          sku: product.productInfo.sku,
          width: product.productInfo.width || "",
          height: product.productInfo.height || "",
          length: product.productInfo.length || "",
          isExternal: product.productInfo.isExternal || false,
          external: {
            productUrl: product.productInfo.external?.productUrl || "",
            buttonLabel: product.productInfo.external?.buttonLabel || "Buy now",
          },
          status: product.description.status,
        },
        commission: {
          regularType: product.commission?.regularType || "percentage",
          regularValue: product.commission?.regularValue ?? 0,
          retailType: product.commission?.retailType || "percentage",
          retailValue: product.commission?.retailValue ?? 0,
        },
        specifications:
          product?.specifications && product?.specifications.length > 0
            ? product?.specifications
            : [{ key: "", value: "" }],
      };
      setDescription(product.description.description);
      form.reset(defaultValues as any);
    }
  }, [editableProduct, form, isReady]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const isExternalProduct = form.watch("productInfo.isExternal");

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const submitToast = toast.loading("Submiting Product...");
    try {
      const formData = new FormData();

      if (featuredImage) {
        formData.append("featuredImgFile", featuredImage);
      }

      if (galleryImage && galleryImage.length > 0) {
        galleryImage.forEach((file) => {
          formData.append("galleryImagesFiles", file);
        });
      }

      const newFormData = {
        ...data,
        deletedImages: deletedImages,
        description: {
          ...data.description,
          description: description,
          status: data.productInfo.status,
        },
      };

      if (newFormData) {
        formData.append("data", JSON.stringify(newFormData));
      }

      const res = await updateProduct({ id, formData }).unwrap();
      toast.success("Product Updated successfully!", { id: submitToast });

      form.reset();
      router.push("/admin/all-product");
      setFeaturedImage(null);
      setGalleryImage([]);
    } catch (error: any) {
      const errorMessage =
        error?.data?.errorSources?.[0]?.message ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(errorMessage, { id: submitToast });
    }
  };

  const onErrors = (errors: any) => {};

  const simplifiedCategories: Option[] =
    categoriesData?.map((cat: any) => ({
      value: cat._id,
      label: cat.name,
    })) ?? [];

  // Watch selected categories to get subcategories
  const selectedCategories = form.watch("brandAndCategories.categories");
  const firstSelectedCategory = selectedCategories?.[0];
  
  // Get subcategories from the selected main category
  const selectedMainCategory = categoriesData?.find(cat => cat._id === firstSelectedCategory);
  const simplifiedSubCategories: Option[] =
    selectedMainCategory?.subCategories?.map((subCat: string) => ({
      value: subCat,
      label: subCat,
    })) ?? [];

  const simplifiedTags: Option[] =
    tagsData?.data?.map((tag: any) => ({
      value: tag._id,
      label: tag.name,
    })) ?? [];

  if (!isReady) return <FormSkeleton />;
  if (isLoading) return <FormSkeleton />;

  return (
    <Form {...form}>
      <form
        id="addProductForm"
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 2xl:gap-16"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
          {/* Basic Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Details</h2>
            <FormField
              control={form.control}
              name="description.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const newSlug = slugify(e.target.value, {
                          lower: true,
                          strict: true,
                        });
                        form.setValue("description.slug", newSlug, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description.slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Auto-generated slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <RichTextEditor
                    value={description}
                    onChange={(content: any) => setDescription(content)}
                    placeholder="Write your product description here..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <FormField
            control={form.control}
            name="shopId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Shop</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={
                    shopData?.find((s: any) => s._id === field.value)?._id ?? ""
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Shop" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isShopDataLoading ? (
                      <SelectItem disabled value="loading">
                        <span className="animate-pulse text-gray-400">
                          Loading Shops...
                        </span>
                      </SelectItem>
                    ) : shopData && shopData.length > 0 ? (
                      shopData.map((shop: any) => (
                        <SelectItem key={shop._id} value={shop._id}>
                          {shop.basicInfo.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-shops">
                        <span className="text-sm text-gray-500">
                          No shops available
                        </span>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Product Info & Pricing */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Product Info & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productInfo.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productInfo.salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retailer Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter sale price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productInfo.wholeSalePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wholesale Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter wholesale price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productInfo.quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productInfo.sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <section className="space-y-4 border p-5 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
              Commission Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Retail Commission */}
              <FormField
                control={form.control}
                name="commission.regularType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retail Commission</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commission.regularValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retail Commission Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Wholesale Commission */}
              <FormField
                control={form.control}
                name="commission.retailType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wholesale Commission</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commission.retailValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wholesale Commission Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Unit</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pcs">pcs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="box">box</SelectItem>
                      <SelectItem value="set">set</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description.status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="publish">Publish</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="variable">Variable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="productInfo.width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 120cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productInfo.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 75cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productInfo.length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 60cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* External Product Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">External Product</h2>
            <FormField
              control={form.control}
              name="productInfo.isExternal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Is this an external product?</FormLabel>
                  </div>
                  <FormControl>
                    <span>
                      {" "}
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className=""
                      />
                    </span>
                  </FormControl>
                </FormItem>
              )}
            />

            {isExternalProduct && (
              <div className="space-y-4 border p-4 rounded-md">
                <FormField
                  control={form.control}
                  name="productInfo.external.productUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Product URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productInfo.external.buttonLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Button Label</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Buy on Amazon" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold">Product Specifications</h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-4 border p-3 rounded-lg"
              >
                <FormField
                  control={form.control}
                  name={`specifications.${index}.key`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`specifications.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Red" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ key: "", value: "" })}
            >
              + Add Specification
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Product Media</h2>
            <ImageUploader
              EditableProcut={editableProduct}
              setGalleryImage={setGalleryImage}
              setFeaturedImage={setFeaturedImage}
              setDeletedImages={setDeletedImages}
              deletedImages={deletedImages}
            />
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Organization */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Organization</h2>
            {/* <FormField
              control={form.control}
              name="brandAndCategories.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={
                      brands?.find((b) => b._id === field.value)?._id ?? ""
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isBrandsLoading ? (
                        <SelectItem disabled value="loading">
                          <span className="animate-pulse text-gray-400">
                            Loading Brands...
                          </span>
                        </SelectItem>
                      ) : (brands ?? []).length > 0 ? (
                        (brands ?? []).map((brand) => (
                          <SelectItem key={brand._id} value={brand._id}>
                            {brand.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="no-brands">
                          No brands available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="brandAndCategories.categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    {isCategoriesLoading ? (
                      <Input
                        className="animate-pulse"
                        placeholder="Loading Categories..."
                      />
                    ) : (
                      <MultipleSelector
                        value={
                          (field.value || [])
                            .map((val) =>
                              simplifiedCategories.find(
                                (opt) => opt.value === val
                              )
                            )
                            .filter(Boolean) as Option[]
                        }
                        onChange={(options) => {
                          field.onChange(options.map((opt) => opt.value));
                          // Clear subcategory when main categories change
                          form.setValue("brandAndCategories.subcategory", "");
                        }}
                        defaultOptions={simplifiedCategories}
                        maxSelected={1}
                        placeholder="Select categories..."
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No categories found.
                          </p>
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* SubCategory */}
            {firstSelectedCategory && (
              <FormField
                control={form.control}
                name="brandAndCategories.subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SubCategory</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {simplifiedSubCategories.map((subCat) => (
                          <SelectItem key={subCat.value} value={subCat.value}>
                            {subCat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="brandAndCategories.tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    {isTagsLoading ? (
                      <Input
                        className="animate-pulse"
                        placeholder="Loading Tags...."
                      />
                    ) : (
                      <MultipleSelector
                        value={
                          (field.value || [])
                            .map((val) =>
                              simplifiedTags.find((opt) => opt.value === val)
                            )
                            .filter(Boolean) as Option[]
                        }
                        onChange={(options) =>
                          field.onChange(options.map((opt) => opt.value))
                        }
                        defaultOptions={simplifiedTags}
                        placeholder="Select tags..."
                        emptyIndicator={
                          <p className="text-center text-sm">No tags found.</p>
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="md:flex gap-4 pt-4 justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={() => {
                form.setValue("description.status", "draft");
                form.setValue("productInfo.status", "draft");
                form.handleSubmit(onSubmit, onErrors)();
              }}
            >
              <Save className="mr-2 h-4 w-4 hidden md:flex" /> Save as Draft
            </Button>
            <Button type="submit" className="mt-2 md:mt-0">
              {form.formState.isSubmitting
                ? "Publishing..."
                : "Publish Product"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
