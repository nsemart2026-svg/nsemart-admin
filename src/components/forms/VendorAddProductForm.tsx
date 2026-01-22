/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { setTags } from "@/redux/featured/tags/tagsSlice";
import { setCategories } from "@/redux/featured/categories/categorySlice";
import { createProductZodSchema } from "./formSchema"; // Assuming this path is correct
import { useCreateProductMutation } from "@/redux/featured/products/productsApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";
import { useGetAllTagsQuery } from "@/redux/featured/tags/tagsApi";
import RichTextEditor from "../editor/RichTextEditor";
import { useGetAllBrandsQuery } from "@/redux/featured/brands/brandsApi";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";

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

export default function VendorAddProductForm() {
    const currentUser: any = useAppSelector(selectCurrentUser);
    const [description, setDescription] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [createProduct] = useCreateProductMutation();
    const { data: categoriesData, isLoading: isCategoriesLoading } =
        useGetAllCategoriesQuery(undefined);
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
            shopId: "",
            video: "",
            // vendorId: currentUser?._id || "",
            brandAndCategories: {
                brand: "",
                categories: [],
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
                price: undefined,
                salePrice: undefined,
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
        },
    });

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

            const payload = {
                ...data,
                description: {
                    ...data.description,
                    description: description,
                    status: data.productInfo.status
                },
            };

            if (payload) {
                formData.append("data", JSON.stringify(payload));
            }

            await createProduct(formData).unwrap();
            toast.success("Product Created successfully!", { id: submitToast });

            form.reset();
            setFeaturedImage(null);
            setGalleryImage([]);
            router.push("/vendor/all-product");
        } catch (error: any) {
            const errorMessage =
                error?.data?.errorSources?.[0]?.message ||
                error?.data?.message ||
                error?.message ||
                "Something went wrong!";
            toast.error(errorMessage, { id: submitToast });
        }
    };

    const onErrors = (errors: any) => {
        console.warn("📝 Form Validation Errors:", errors);
    };

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

    const simplifiedTags: Option[] =
        tagsData?.data?.map((tag: any) => ({
            value: tag._id,
            label: tag.name,
        })) ?? [];

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

                    <FormField
                        control={form.control}
                        name="shopId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Shop</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                                            shopData
                                                .filter((shop: any) => shop.vendorId?._id === currentUser?._id)
                                                .map((shop: any) => (
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
                    />

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
                                        <FormLabel>Sale Price</FormLabel>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <FormField
                        control={form.control}
                        name="productType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
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
                    </div>

                    {/* Organization */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Organization</h2>
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
                                                (brands ?? []).map((brand: any) => (
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
                                                            simplifiedCategories.find(
                                                                (opt) => opt.value === val
                                                            )
                                                        )
                                                        .filter(Boolean) as Option[]
                                                }
                                                onChange={(options) =>
                                                    field.onChange(options.map((opt) => opt.value))
                                                }
                                                defaultOptions={simplifiedCategories}
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
                        <Button
                            type="submit"
                            className="mt-2 md:mt-0"
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
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
