/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/types/Product';

export const exportProductsToPDF = (products: Product[]) => {
  const doc = new jsPDF();


  doc.setFontSize(16);
  doc.text('Product List', 14, 15);


  const tableColumn = ['#', 'Name', 'Brand', 'Price', 'Stock'];
  const tableRows: any[] = [];

  products.forEach((product, index) => {
    const row = [
      index + 1,
      product.description.name,
      product.brandAndCategories?.brand.name || 'N/A',
      product.productInfo.price,
      product.productInfo.quantity,
    ];
    tableRows.push(row);
  });

  autoTable(doc, {
    startY: 25,
    head: [tableColumn],
    body: tableRows,
  });

  doc.save('products.pdf');
};
