/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  AttributesData,
  selectAttributes,
  setAttributes,
} from '@/redux/featured/attribute/attributeSlice';
import { IAttribute } from '@/types/attribute';
import {
  useGetAttributesQuery,
  useGetAttributeStatusQuery,
} from '@/redux/featured/attribute/attributeApi';
import CreateAndUpdateAttribute from '@/components/attributes/CreateAndUpdateAttribute';
import { ITagQueryParams } from '@/types/tags';
import PaginationView from '@/components/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AttributeValuesModal from '@/components/attributes/AttributeValuesModal';

export default function AttributeManagement() {
  const [queryParams, setQueryParams] = useState<ITagQueryParams>({
    limit: 8,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetAttributesQuery(queryParams);
  const {
    data: AttributeStats,
    isLoading: StatsLoading,
    refetch: statsRefetch,
  } = useGetAttributeStatusQuery(undefined);
  const dispatch = useAppDispatch();
  const allAttributes = useAppSelector(selectAttributes);


  useEffect(() => {
    if (data) {
      dispatch(setAttributes(data as any));
    }
  }, [dispatch, data]);

  useEffect(() => {
    setQueryParams(prev => ({
      ...prev,
      page: currentPage,
    }));
  }, [currentPage]);



  const getRequiredColor = (required: string) => {
    switch (required) {
      case 'Required':
        return 'bg-red-100 text-red-800';
      case 'Optional':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const types = ['dropdown', 'color', 'text', 'number'];

  if (!AttributeStats && !allAttributes) {
    return <div>Loading....</div>;
  }

  return (
    <div className="space-y-6 py-6">
      {/* Add Attribute Button */}
      <div className="flex justify-end">
        <CreateAndUpdateAttribute refetch={refetch} statsRefetch={statsRefetch}>
          + Add Attribute
        </CreateAndUpdateAttribute>
      </div>

      {/* Stats Cards */}
      {StatsLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Attributes</p>
                  <p className="text-2xl font-bold">
                    {AttributeStats?.totalAttributes}
                  </p>
                  <p className="text-xs text-gray-500">+4 this month</p>
                </div>
                <div className={`text-2xl text-blue-600`}>⚙️</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Required Attributes
                  </p>
                  <p className="text-2xl font-bold">
                    {AttributeStats?.requiredAttributes}
                  </p>
                  <p className="text-xs text-gray-500">Needs of total</p>
                </div>
                <div className={`text-2xl text-blue-600`}>❗</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Dropdown Attributes
                  </p>
                  <p className="text-2xl font-bold">
                    {AttributeStats?.dropdownAttributes}
                  </p>
                  <p className="text-xs text-gray-500">Most common type</p>
                </div>
                <div className={`text-2xl text-blue-600`}>📋</div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Categories</p>
                  <p className="text-2xl font-bold">
                    {AttributeStats?.categories}
                  </p>
                  <p className="text-xs text-gray-500">Attribute groups</p>
                </div>
                <div className={`text-2xl text-purple-600`}>📊</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Product Attributes Section */}
      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Product Attributes</h2>
          <p className="text-gray-600 text-sm">
            Define product characteristics for specifications
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search attributes"
              value={queryParams.searchTerm}
              onChange={e =>
                setQueryParams(prev => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={queryParams.type || ''}
              onValueChange={value =>
                setQueryParams(prev => ({
                  ...prev,
                  type: value === 'all' ? undefined : value,
                }))
              }
            >
              <SelectTrigger className="w-40 text-black">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" disabled size="sm">
              Sort by Category
            </Button>
          </div>
        </div>

        {/* Attributes Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Attribute Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Required
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allAttributes?.data?.length > 0 ? (
                allAttributes?.data?.map(
                  (attribute: IAttribute, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{attribute.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={''}>{attribute.type}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {attribute?.category?.name}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getRequiredColor('required')}>
                          {attribute.required ? 'True' : 'False'}
                        </Badge>
                      </td>
                      {/* <td className="py-4 px-4 text-gray-600">
                        {attribute.required}
                      </td> */}
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <CreateAndUpdateAttribute
                            updateAttribute={attribute}
                            type="edit"
                            refetch={refetch}
                            statsRefetch={statsRefetch}
                          >
                            Edit
                          </CreateAndUpdateAttribute>
                          <AttributeValuesModal attribute={attribute} />
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No attributes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationView
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        meta={allAttributes?.meta}
      />
    </div>
  );
}
