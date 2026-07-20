import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QuoteData, QuoteSummary } from '../types';
import { formatCurrency, generateInvoiceNumber } from '../data/services';
import { formatDateForDisplay } from '../utils/date';
import logo from '../assets/logo.jpeg';

const COMPANY_DETAILS = {
  name: 'ACHU Ltd',
  phone: '+44 7304 398854',
  email: 'info@achu.uk',
  website: 'https://www.achu.uk',
  facebook: 'https://facebook.com/AchuLtd',
  instagram: 'https://www.instagram.com/achultd/',
  tiktok: 'https://www.tiktok.com/@achultd',
  youtube: 'https://www.youtube.com/@AchuLtd',
};

// Helper function to convert SVG string to PNG data URL
const svgToPngDataUri = (svgString: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new Image();
    const svg = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svg);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };

    img.src = url;
  });
};

// Helper function to fetch SVG files
const fetchSvg = async (path: string): Promise<string> => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to fetch ${path}`);
  return response.text();
};

// Social media and contact icons - will be converted to PNG in the function
const SOCIAL_ICONS_SVG = {
  phone: `${import.meta.env.BASE_URL}src/assets/icons/phone.svg`,
  email: `${import.meta.env.BASE_URL}src/assets/icons/email.svg`,
  website: `${import.meta.env.BASE_URL}src/assets/icons/website.svg`,
  facebook: `${import.meta.env.BASE_URL}src/assets/icons/facebook.svg`,
  instagram: `${import.meta.env.BASE_URL}src/assets/icons/instagram.svg`,
  tiktok: `${import.meta.env.BASE_URL}src/assets/icons/tiktok.svg`,
  youtube: `${import.meta.env.BASE_URL}src/assets/icons/youtube.svg`,
};

export const generateInvoicePDF = async (quoteData: QuoteData, summary: QuoteSummary): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Generate invoice number
  const invoiceNumber = generateInvoiceNumber();

  // Fetch and convert SVGs to PNG data URIs
  const [phoneSvgContent, emailSvgContent, websiteSvgContent, facebookSvgContent, instagramSvgContent, tiktokSvgContent, youtubeSvgContent] = await Promise.all([
    fetchSvg(SOCIAL_ICONS_SVG.phone),
    fetchSvg(SOCIAL_ICONS_SVG.email),
    fetchSvg(SOCIAL_ICONS_SVG.website),
    fetchSvg(SOCIAL_ICONS_SVG.facebook),
    fetchSvg(SOCIAL_ICONS_SVG.instagram),
    fetchSvg(SOCIAL_ICONS_SVG.tiktok),
    fetchSvg(SOCIAL_ICONS_SVG.youtube),
  ]);

  const allIcons = {
    phone: await svgToPngDataUri(phoneSvgContent),
    email: await svgToPngDataUri(emailSvgContent),
    website: await svgToPngDataUri(websiteSvgContent),
    facebook: await svgToPngDataUri(facebookSvgContent),
    instagram: await svgToPngDataUri(instagramSvgContent),
    tiktok: await svgToPngDataUri(tiktokSvgContent),
    youtube: await svgToPngDataUri(youtubeSvgContent),
  };

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Header background
  doc.setFillColor(102, 126, 234); // #667eea
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Logo centered
  doc.addImage(
    logo,
    'JPEG',
    pageWidth / 2 - 15,
    5,
    30,
    30
  );

  // Company Name and contact lines
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text(COMPANY_DETAILS.name, margin, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const contactLines = [
    COMPANY_DETAILS.phone,
    COMPANY_DETAILS.email,
    COMPANY_DETAILS.website.replace(/^https?:\/\//, ''),
  ];
  const contactLineSpacing = 4.5;
  let contactY = 20;

  contactLines.forEach((line) => {
    doc.text(line, margin, contactY);
    const textWidth = doc.getTextWidth(line);
    if (line.startsWith('+')) {
      doc.link(margin, contactY - 3, textWidth, 4.5, {
        url: `tel:${line.replace(/\s+/g, '')}`,
      });
    } else if (line.includes('@')) {
      doc.link(margin, contactY - 3, textWidth, 4.5, {
        url: `mailto:${line}`,
      });
    } else {
      doc.link(margin, contactY - 3, textWidth, 4.5, {
        url: COMPANY_DETAILS.website,
      });
    }
    contactY += contactLineSpacing;
  });

  // Invoice Number and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invoiceNumber}`, pageWidth - margin, 12, { align: 'right' });
  doc.text(`Date: ${formatDateForDisplay(quoteData.quoteDate)}`, pageWidth - margin, 18, {
    align: 'right',
  });
  doc.text(`Due date: ${formatDateForDisplay(quoteData.validUntil)}`, pageWidth - margin, 24, {
    align: 'right',
  });

  yPosition = 55;

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

  // Services Table - Invoice version (no Duration column)
  const serviceTableData = quoteData.services.map((service) => [
    `${service.type}\n${service.selectedOption}`,
    String(service.quantity ?? 1),
    formatCurrency(service.price),
  ]);

  autoTable(doc, {
    head: [['Service', 'Quantity', 'Price']],
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

  const summaryData: Array<[string, string]> = [
  ['Subtotal:', formatCurrency(summary.subtotal)],
  ...(summary.discountAmount > 0
    ? [
        [
          'Discount:',
          `-${formatCurrency(summary.discountAmount)}`,
        ] as [string, string],
      ]
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
    doc.text(String(row[0]), margin, yPosition);
    doc.text(String(row[1]), margin + columnWidth, yPosition, { align: 'right' });
    yPosition += 6;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  });

  // Footer
  yPosition = pageHeight - 34;

  const footerBlue: [number, number, number] = [40, 100, 200];

  type FooterItem = {
    imageData?: string;
    icon?: string;
    label: string;
    url: string;
  };

  const drawFooterRow = (
    items: FooterItem[],
    y: number,
    fontSize = 10,
    gap = 8
  ): void => {
    const iconSize = 6;
    const iconTextGap = 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);

    const itemWidths = items.map(
      (item) => iconSize + iconTextGap + doc.getTextWidth(item.label)
    );

    const totalWidth =
      itemWidths.reduce((total, width) => total + width, 0) +
      gap * (items.length - 1);

    let currentX = (pageWidth - totalWidth) / 2;

    items.forEach((item, index) => {
      const itemWidth = itemWidths[index];
      const iconX = currentX;
      const iconY = y - iconSize / 2 - 0.5;

      // Draw SVG icon or text icon
      if (item.imageData) {
        doc.addImage(item.imageData, 'PNG', iconX, iconY, iconSize, iconSize);
      } else if (item.icon) {
        // Fallback to text icon for non-image items
        doc.setFillColor(...footerBlue);
        doc.circle(iconX + iconSize / 2, y - 1.2, iconSize / 2 - 0.5, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(item.icon.length > 1 ? 5.5 : 7);
        doc.text(item.icon, iconX + iconSize / 2, y + 0.5, {
          align: 'center'
        });
      }

      // Link text
      const textX = currentX + iconSize + iconTextGap;

      doc.setTextColor(...footerBlue);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontSize);
      doc.text(item.label, textX, y);

      // Clickable area: icon + text
      doc.link(
        currentX,
        y - 4.5,
        itemWidth,
        6,
        { url: item.url }
      );

      currentX += itemWidth + gap;
    });
  };

  // Company name
  doc.setTextColor(...footerBlue);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(
    COMPANY_DETAILS.name,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );

  yPosition += 8;

  // Phone, email and website
  drawFooterRow(
    [
      {
        imageData: allIcons.phone,
        label: COMPANY_DETAILS.phone,
        url: `tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`
      },
      {
        imageData: allIcons.email,
        label: COMPANY_DETAILS.email,
        url: `mailto:${COMPANY_DETAILS.email}`
      },
      {
        imageData: allIcons.website,
        label: 'www.achu.uk',
        url: COMPANY_DETAILS.website
      }
    ],
    yPosition,
    10
  );

  yPosition += 8;

  // Social media
  drawFooterRow(
    [
      {
        imageData: allIcons.facebook,
        label: 'Facebook',
        url: COMPANY_DETAILS.facebook
      },
      {
        imageData: allIcons.instagram,
        label: 'Instagram',
        url: COMPANY_DETAILS.instagram
      },
      {
        imageData: allIcons.tiktok,
        label: 'TikTok',
        url: COMPANY_DETAILS.tiktok
      },
      {
        imageData: allIcons.youtube,
        label: 'YouTube',
        url: COMPANY_DETAILS.youtube
      }
    ],
    yPosition,
    10,
    7
  );

  // Reset document styling
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);

  // Save PDF
  doc.save(`ACHU-Invoice-${invoiceNumber}.pdf`);
};
