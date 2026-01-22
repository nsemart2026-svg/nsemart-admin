// src/data/use_sr_order.ts
"use client";

import { useMemo, useState } from "react";
import { SR_ORDERS_DUMMY } from "./sr_order";
import { Order } from "@/types/Order";

export type KnownOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type FilterStatus = "ALL" | KnownOrderStatus;
type SortKey = "DATE_DESC" | "DATE_ASC" | "TOTAL_DESC" | "TOTAL_ASC";

function deriveStatus(order: Order): KnownOrderStatus | "OTHER" {
  const raw = order.orderInfo[0]?.status?.toUpperCase() ?? "";
  if (
    raw === "PENDING" ||
    raw === "CONFIRMED" ||
    raw === "SHIPPED" ||
    raw === "DELIVERED" ||
    raw === "CANCELLED"
  ) {
    return raw;
  }
  return "OTHER";
}

function customerName(o: Order): string {
  const f = o.customerInfo.firstName ?? "";
  const l = o.customerInfo.lastName ?? "";
  return (f + " " + l).trim();
}

export function useSrOrders() {
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<FilterStatus>("ALL");
  const [sort, setSort] = useState<SortKey>("DATE_DESC");
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const decorated = useMemo(() => {
    return SR_ORDERS_DUMMY.map((o) => ({
      order: o,
      status: deriveStatus(o),
      customerName: customerName(o),
      phone: o.customerInfo.phone ?? "",
      createdMs: new Date(o.createdAt).getTime(),
      total: o.totalAmount,
    }));
  }, []);

  const filtered = useMemo(() => {
    let rows = [...decorated];

    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.order._id.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.phone.toLowerCase().includes(q)
      );
    }

    if (status !== "ALL") {
      rows = rows.filter((r) => r.status === status);
    }

    rows.sort((a, b) => {
      if (sort === "DATE_DESC") return b.createdMs - a.createdMs;
      if (sort === "DATE_ASC") return a.createdMs - b.createdMs;
      if (sort === "TOTAL_DESC") return b.total - a.total;
      return a.total - b.total;
    });

    return rows;
  }, [decorated, query, status, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const data = useMemo(
    () => filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize),
    [filtered, pageSafe]
  );

  return {
    data, // [{ order, status, customerName, phone, createdMs, total }]
    total,
    totalPages,
    page: pageSafe,
    pageSize,
    query,
    setQuery,
    status,
    setStatus,
    sort,
    setSort,
    setPage,
  };
}
