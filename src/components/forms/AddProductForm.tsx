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

import { useGetAllCategoriesQuery, useGetMainCategoriesQuery, useGetSubCategoriesQuery } from "@/redux/featured/categories/categoryApi";

import { useAppDispatch } from "@/redux/hooks";
import { setTags } from "@/redux/featured/tags/tagsSlice";
import { setCategories } from "@/redux/featured/categories/categorySlice";

import { useCreateProductMutation } from "@/redux/featured/products/productsApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";
import { useGetAllTagsQuery } from "@/redux/featured/tags/tagsApi";
import RichTextEditor from "../editor/RichTextEditor";
import { createProductZodSchema } from "./formSchema";
import { useGetAllBrandsQuery } from "@/redux/featured/brands/brandsApi";

export type Option = {
  value: string;
  label: string;
  disable?: boolean;
};

export type Specification = {
  key: string;
  value: string;
};

type ProductFormValues = z.infer<typeof createProductZodSchema>;

export default function AddProductForm() {
  const [description, setDescription] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createProduct] = useCreateProductMutation();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(undefined);
  // const { data: mainCategoriesData, isLoading: isMainCategoriesLoading } =
  //   useGetMainCategoriesQuery(undefined);
  const { data: tagsData, isLoading: isTagsLoading } =
    useGetAllTagsQuery(undefined);
  const { data: brands, isLoading: isBrandsLoading } =
    useGetAllBrandsQuery(undefined);
  const { data: shopData, isLoading: isShopDataLoading } =
    useGetAllShopsQuery();

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [galleryImage, setGalleryImage] = useState<File[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(createProductZodSchema),
    mode: "onChange",
    defaultValues: {
      video: "",
      brandAndCategories: {
        categories: [],
        subcategory: "",
        tags: [],
      },
      description: {
        name: "",
        slug: "",
        unit: "",
        description: "",
        status: "publish",
      },
      productType: "simple",
      productInfo: {
        price: 0,
        salePrice: 0,
        wholeSalePrice: 0,
        quantity: 10,
        sku: "",
        width: "",
        height: "",
        length: "",
        isExternal: false,
        external: {
          productUrl: "",
          buttonLabel: "Buy now",
        },
        status: "publish",
      },
      specifications: [{ key: "", value: "" }],
      // Added commission object to match schema
      commission: {
        regularType: "percentage",
        regularValue: 0,
        retailType: "percentage",
        retailValue: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const isExternalProduct = form.watch("productInfo.isExternal");

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    // Hard validation
    const hasError = validatePrices(data.productInfo);
    if (hasError) {
      toast.error("Fix the pricing errors before publishing!", { icon: "❌" });
      return; // Stop submission completely
    }

    const submitToast = toast.loading("Submitting Product...");
    try {
      const formData = new FormData();

      if (featuredImage) formData.append("featuredImgFile", featuredImage);
      if (galleryImage.length)
        galleryImage.forEach((file) =>
          formData.append("galleryImagesFiles", file)
        );

      const cleanDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
      const payload = {
        ...data,
        description: {
          ...data.description,
          description: cleanDescription,
          status: data.productInfo.status,
        },
      };

      formData.append("data", JSON.stringify(payload));

      await createProduct(formData).unwrap();
      toast.success("Product Created successfully!", { id: submitToast });

      form.reset();
      setFeaturedImage(null);
      setGalleryImage([]);
      router.push("/admin/all-product");
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

  useEffect(() => {
    if (tagsData) {
      dispatch(setTags(tagsData));
    }
    if (categoriesData) {
      dispatch(setCategories(categoriesData));
    }
  }, [dispatch, tagsData, categoriesData]);

  const simplifiedCategories: Option[] =
    categoriesData?.map((cat: any) => ({
      value: cat._id,
      label: cat.name,
    })) ?? [];

  const simplifiedMainCategories: Option[] =
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
  const validatePrices = (
    override: Partial<ProductFormValues["productInfo"]> = {}
  ) => {
    const values = form.getValues();
    const productInfo = values.productInfo || {};

    const price = parseFloat(
      (override.price ?? productInfo.price ?? 0).toString()
    );
    const salePriceRaw = override.salePrice ?? productInfo.salePrice;
    const salePrice = salePriceRaw ? parseFloat(salePriceRaw.toString()) : null;

    const wholeSalePriceRaw =
      override.wholeSalePrice ?? productInfo.wholeSalePrice;
    const wholeSalePrice = wholeSalePriceRaw
      ? parseFloat(wholeSalePriceRaw.toString())
      : null;

    form.clearErrors(["productInfo.salePrice", "productInfo.wholeSalePrice"]);

    // Sale price < price (only if salePrice exists)
    if (salePrice !== null && salePrice >= price) {
      form.setError("productInfo.salePrice", {
        type: "manual",
        message: "Sale price must be less than Price!",
      });
      toast.error("Sale price must be less than Price!", { icon: "🚫" });
      return true;
    }

    // Wholesale price < salePrice or price
    if (wholeSalePrice !== null) {
      const maxCompare = salePrice !== null ? salePrice : price;
      if (wholeSalePrice >= maxCompare) {
        form.setError("productInfo.wholeSalePrice", {
          type: "manual",
          message: "Wholesale price must be less than Retail Sale or Price!",
        });
        toast.error("Wholesale price must be less than Retail Sale or Price!", {
          icon: "⚠️",
        });
        return true;
      }
    }

    return false; // no error, product can be added
  };

  return (
    <Form {...form}>
      <form
        id="addProductForm"
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 2xl:gap-16"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
          {/* Basic Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Basic Details
            </h2>
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
          </section>
          {/* Product Info & Pricing */}
          {/* Product Info & Pricing */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Product Info & Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Base Price */}
              <FormField
                control={form.control}
                name="productInfo.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter base price"
                        min="0"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          validatePrices({ price: value });
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 animate-shake" />
                  </FormItem>
                )}
              />

              {/* Retail Sale Price */}
              <FormField
                control={form.control}
                name="productInfo.salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retail Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter retail sale price"
                        min="0"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          validatePrices({ salePrice: value });
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 animate-shake" />
                  </FormItem>
                )}
              />

              {/* Wholesale Price */}
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
                        min="0"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          field.onChange(value);
                          validatePrices({ wholeSalePrice: value });
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 animate-shake" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Commission Settings */}
          <section className="space-y-4 border p-5 rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
              Commission Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Retail Comission */}
              <FormField
                control={form.control}
                name="commission.regularType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retail Comission</FormLabel>
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
                    <FormLabel>Retail Comission Value</FormLabel>
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
                    <FormLabel>Wholesale Comission</FormLabel>
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
                    <FormLabel>Wholesale Comission Value</FormLabel>
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

          {/* Quantity & SKU */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </section>

          {/* Unit & Status */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="description.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          </section>

          {/* Dimensions */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </section>

          {/* External Product */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              External Product
            </h2>
            <FormField
              control={form.control}
              name="productInfo.isExternal"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel>Is this an external product?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isExternalProduct && (
              <div className="space-y-4 border p-4 rounded-md bg-gray-50">
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
          </section>

          {/* Specifications */}
          <section>
            <h2 className="text-lg font-semibold border-b pb-2">
              Product Specifications
            </h2>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50"
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
              className="mt-2"
            >
              + Add Specification
            </Button>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
          {/* Media */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Product Media
            </h2>
            <ImageUploader
              setGalleryImage={setGalleryImage}
              setFeaturedImage={setFeaturedImage}
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
          </section>

          {/* Organization */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Organization
            </h2>
            {/* Brand */}
            <FormField
              control={form.control}
              name="brandAndCategories.brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
            />

            {/* Categories */}
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
                          field.value
                            .map((val) =>
                              simplifiedMainCategories.find(
                                (opt) => opt.value === val
                              )
                            )
                            .filter(Boolean) as Option[]
                        }
                        onChange={(options) => {
                          const values = options.map((opt) => opt.value);
                          field.onChange(values);
                          // Clear subcategory when main categories change
                          form.setValue("brandAndCategories.subcategory", "");
                        }}
                        defaultOptions={simplifiedMainCategories}
                        options={simplifiedMainCategories}
                        creatable={false}
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

            {/* Tags */}
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
                        placeholder="Loading Tags..."
                      />
                    ) : (
                      <MultipleSelector
                        value={
                          field.value
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
          </section>

          {/* Action Buttons */}
          <section className="flex flex-col md:flex-row justify-end gap-4 pt-4">
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
              <Save className="mr-2 h-4 w-4 hidden md:inline" /> Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Publishing..."
                : "Publish Product"}
            </Button>
          </section>
        </div>
      </form>
    </Form>
  );
}
