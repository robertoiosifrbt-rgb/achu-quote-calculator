import React from 'react';
import { Button, Box } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useQuote } from '../../context/QuoteContext';
import { generatePDF } from '../../utils/pdfGenerator';
import { useSnackbar } from '../../hooks/useSnackbar';

export const PDFGenerator: React.FC = () => {
  const { quoteData, getTotalMinutes, getSubtotal, getDiscountAmount, getGrandTotal } = useQuote();
  const { showSnackbar } = useSnackbar();

  const handleGeneratePDF = async () => {
    try {
      if (!quoteData.clientDetails.name || !quoteData.clientDetails.address) {
        showSnackbar('Please fill in client details first', 'warning');
        return;
      }

      if (quoteData.services.length === 0) {
        showSnackbar('Please add at least one service', 'warning');
        return;
      }

      const summaryData = {
        totalMinutes: getTotalMinutes(),
        subtotal: getSubtotal(),
        discountAmount: getDiscountAmount(),
        grandTotal: getGrandTotal(),
      };

      generatePDF(quoteData, summaryData);
      showSnackbar('PDF generated successfully', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showSnackbar('Error generating PDF', 'error');
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<PictureAsPdfIcon />}
        onClick={handleGeneratePDF}
        fullWidth
        size="large"
        sx={{ borderRadius: 1, py: 1.5, fontWeight: 600 }}
      >
        Generate PDF Quote
      </Button>
    </Box>
  );
};
