import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QuoteData, QuoteSummary } from '../types';
import { formatCurrency, formatDateForDisplay } from '../data/services';

const COMPANY_DETAILS = {
  name: 'ACHU Ltd',
  phone: '+44 (0) 123 456 7890',
  email: 'info@achultd.com',
  website: 'www.achultd.com',
  facebook: '@achultd',
  instagram: '@achultd',
  tiktok: '@achuld',
  youtube: '@achuld',
};

export const generatePDF = (quoteData: QuoteData, summary: QuoteSummary): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Header background
  doc.setFillColor(102, 126, 234); // #667eea
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(COMPANY_DETAILS.name, margin, 15);

  // Quote Number and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Quote #: ${quoteData.quoteNumber}`, pageWidth - margin, 12, { align: 'right' });
  doc.text(`Date: ${formatDateForDisplay(quoteData.quoteDate)}`, pageWidth - margin, 18, {
    align: 'right',
  });
  doc.text(`Valid until: ${formatDateForDisplay(quoteData.validUntil)}`, pageWidth - margin, 24, {
    align: 'right',
  });

  yPosition = 50;

  // Client Details Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Details', margin, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const clientInfo = [
    `Name: ${quoteData.clientDetails.name}`,
    `Address: ${quoteData.clientDetails.address}`,
  ];

  if (quoteData.clientDetails.phone) {
    clientInfo.push(`Phone: ${quoteData.clientDetails.phone}`);
  }
  if (quoteData.clientDetails.email) {
    clientInfo.push(`Email: ${quoteData.clientDetails.email}`);
  }

  clientInfo.forEach((line) => {
    doc.text(line, margin, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // Services Table
  const serviceTableData = quoteData.services.map((service) => [
    `${service.type}\n${service.selectedOption}`,
    `${service.minutes} min`,
    formatCurrency(service.price),
  ]);

  autoTable(doc, {
    head: [['Service', 'Duration', 'Price']],
    body: serviceTableData,
    startY: yPosition,
    margin: margin,
    theme: 'grid',
    headStyles: {
      fillColor: [102, 126, 234],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 11,
    },
    bodyStyles: {
      fontSize: 10,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // Summary Section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin, yPosition);

  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const summaryData = [
    ['Total Minutes:', `${summary.totalMinutes} min`],
    ['Subtotal:', formatCurrency(summary.subtotal)],
    ...(summary.discountAmount > 0
      ? [[
          ['Discount:', `-${formatCurrency(summary.discountAmount)}`],
        ] as unknown as [string, string]]
      : []),
    ['Grand Total:', formatCurrency(summary.grandTotal)],
  ];

  const columnWidth = (pageWidth - margin * 2) / 2;

  summaryData.forEach((row) => {
    if (row[0] === 'Grand Total:') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(102, 126, 234);
    }
    doc.text(row[0], margin, yPosition);
    doc.text(row[1], margin + columnWidth, yPosition, { align: 'right' });
    yPosition += 6;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  });

  // Footer
  yPosition = pageHeight - 40;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);

  const footerLines = [
    COMPANY_DETAILS.name,
    `Phone: ${COMPANY_DETAILS.phone}`,
    `Email: ${COMPANY_DETAILS.email}`,
    `Website: ${COMPANY_DETAILS.website}`,
    `Facebook: ${COMPANY_DETAILS.facebook} | Instagram: ${COMPANY_DETAILS.instagram}`,
    `TikTok: ${COMPANY_DETAILS.tiktok} | YouTube: ${COMPANY_DETAILS.youtube}`,
  ];

  footerLines.forEach((line) => {
    doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
  });

  // Save PDF
  doc.save(`ACHU-Quote-${quoteData.quoteNumber}.pdf`);
};
