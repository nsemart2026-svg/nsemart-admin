"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetMainCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/redux/featured/categories/categoryApi";
import { ICategory } from "@/types/Category";
import Category from "./Category";

export default function CategoryHierarchy() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const { data: mainCategories, isLoading, refetch } = useGetMainCategoriesQuery(undefined);

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Category Hierarchy</CardTitle>
        <div className="flex gap-2">
          <Category refetch={refetch}>
            <Plus className="h-4 w-4 mr-2" />
            Add Main Category
          </Category>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mainCategories?.map((category) => (
            <CategoryNode
              key={category._id}
              category={category}
              isExpanded={expandedCategories.has(category._id)}
              onToggle={() => toggleExpanded(category._id)}
              refetch={refetch}
            />
          ))}
          {(!mainCategories || mainCategories.length === 0) && (
            <div className="text-center text-muted-foreground py-8">
              No categories found. Create your first category to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryNode({
  category,
  isExpanded,
  onToggle,
  refetch,
}: {
  category: ICategory;
  isExpanded: boolean;
  onToggle: () => void;
  refetch: any;
}) {
  const { data: subCategories } = useGetSubCategoriesQuery(category._id, {
    skip: !isExpanded,
  });

  const hasSubcategories = category.subCategories && category.subCategories.length > 0;

  return (
    <div className="border rounded-lg">
      <div className="flex items-center justify-between p-3 hover:bg-muted/50">
        <div className="flex items-center gap-2">
          {hasSubcategories && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
          {!hasSubcategories && <div className="w-6" />}
          
          <div className="flex items-center gap-3">
            {category.image && (
              <img
                src={category.image as any}
                alt={category.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.details}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {hasSubcategories ? `${category.subCategories.length} subcategories` : 'Main category'}
          </span>
          <Category type="edit" editCategory={category} refetch={refetch}>
            Edit
          </Category>
        </div>
      </div>

      {isExpanded && subCategories && (
        <div className="border-t bg-muted/20">
          <div className="pl-8 pr-3 py-2 space-y-2">
            {subCategories.map((subCategory) => (
              <div
                key={subCategory._id}
                className="flex items-center justify-between p-2 bg-background rounded border"
              >
                <div className="flex items-center gap-3">
                  {subCategory.image && (
                    <img
                      src={subCategory.image as any}
                      alt={subCategory.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-medium">{subCategory.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {subCategory.details}
                    </p>
                  </div>
                </div>
                <Category type="edit" editCategory={subCategory} refetch={refetch}>
                  Edit
                </Category>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}