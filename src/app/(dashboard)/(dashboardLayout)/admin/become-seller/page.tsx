/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetAllReviewsQuery } from "@/redux/featured/becomeSeller/becomeSeller";
import Image from "next/image";

const BecomeSeller = () => {
  const { data: reviews = [], isLoading } = useGetAllReviewsQuery();
  const [selectedReview, setSelectedReview] = useState<any>(null);

  if (isLoading)
    return <p className="text-center py-10">Loading seller reviews...</p>;

  const total = reviews.length;

  return (
    <div className="space-y-8 mx-4 py-6">
      {/* Summary Card */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 flex flex-col justify-between rounded-lg border-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Total Reviews</h2>
            <IoPersonAddOutline className="text-gray-400 text-xl" />
          </div>
          <h2 className="font-bold text-2xl mt-3">{total}</h2>
          <p className="text-gray-400 text-sm">Seller reviews</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-5 border-2 rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-1">Seller Reviews</h2>
        <p className="text-gray-400 mb-4">
          Review and manage seller feedback from the system.
        </p>

        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Reviewer</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Rating</TableHead>
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reviews.map((review: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="flex items-center gap-3 max-w-[150px]">
                  <Image
                    src={review.userInfo?.image}
                    alt={review.userInfo?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="truncate">{review.userInfo?.name}</p>
                </TableCell>
                <TableCell className="max-w-[100px] truncate">
                  {review.userInfo?.role}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">⭐ {review.rating}</Badge>
                </TableCell>
                <TableCell className="max-w-[120px] truncate">
                  {review.title}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {review.description}
                </TableCell>
                <TableCell>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setSelectedReview(review)}
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 text-lg font-bold"
              onClick={() => setSelectedReview(null)}
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={selectedReview.userInfo?.image}
                alt={selectedReview.userInfo?.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg truncate">
                  {selectedReview.userInfo?.name}
                </p>
                <p className="text-gray-500">{selectedReview.userInfo?.role}</p>
              </div>
            </div>
            <p className="mb-2">
              <span className="font-semibold">Rating:</span> ⭐{" "}
              {selectedReview.rating}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Title:</span>{" "}
              {selectedReview.title}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {selectedReview.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeSeller;
