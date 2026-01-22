# Subcategory Implementation Guide

## Overview
The subcategory system has been implemented using a self-referencing category structure where categories can have parent-child relationships.

## Key Changes Made

### 1. Updated Category Interface
```typescript
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
```

### 2. New API Endpoints
- `GET /api/category/main-categories` - Get categories without parent (main categories)
- `GET /api/category/subcategories/:parentId` - Get subcategories of a specific parent

### 3. New Components
- `CategoryHierarchy.tsx` - Displays categories in a tree structure
- `SubCategory.tsx` - Form for creating subcategories

## Usage Examples

### Creating a Main Category
```javascript
POST /api/category/create-category
{
  "name": "Electronics",
  "details": "Electronic products and gadgets",
  // No parentCategory field = main category
}
```

### Creating a Subcategory
```javascript
POST /api/category/create-category
{
  "name": "Smartphones",
  "details": "Mobile phones and accessories",
  "parentCategory": "ELECTRONICS_CATEGORY_ID"
}
```

### Frontend Usage

#### Get Main Categories
```typescript
const { data: mainCategories } = useGetMainCategoriesQuery();
```

#### Get Subcategories
```typescript
const { data: subCategories } = useGetSubCategoriesQuery(parentCategoryId);
```

## Backend Implementation Required

You need to implement these endpoints in your backend:

### Main Categories Controller
```javascript
const getMainCategories = catchAsync(async (req, res) => {
  const result = await Category.find({ parentCategory: { $exists: false } });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Main categories retrieved successfully!",
    data: result,
  });
});
```

### Subcategories Controller
```javascript
const getSubCategories = catchAsync(async (req, res) => {
  const parentId = req.params.parentId;
  const result = await Category.find({ parentCategory: parentId });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Subcategories retrieved successfully!",
    data: result,
  });
});
```

### Routes
```javascript
router.get('/main-categories', getMainCategories);
router.get('/subcategories/:parentId', getSubCategories);
```

## Features Implemented

1. **Hierarchical Category Display** - Categories are shown in a tree structure
2. **Parent Category Selection** - When creating categories, you can select a parent
3. **Subcategory Management** - Dedicated component for creating subcategories
4. **Expandable Tree View** - Click to expand/collapse category branches
5. **Visual Hierarchy** - Clear visual distinction between main and subcategories

## Next Steps

1. Implement the backend endpoints mentioned above
2. Test the category creation flow
3. Add category deletion with cascade handling
4. Implement category reordering if needed
5. Add validation to prevent circular references

The system is now ready to handle parent-child category relationships efficiently!