import React from 'react';
import { Container, Box, Button, Stack, Divider, Typography } from '@mui/material';
import { Header } from '../components/layout/Header';
import { ClientDetailsForm } from '../components/forms/ClientDetailsForm';
import { ServiceForm } from '../components/forms/ServiceForm';
import { ServicesList } from '../components/services/ServicesList';
import { RateForm } from '../components/forms/RateForm';
import { QuoteSummary } from '../components/summary/QuoteSummary';
import { PDFGenerator } from '../components/pdf/PDFGenerator';
import { useQuote } from '../context/QuoteContext';
import { Snackbar } from '../components/Snackbar';
import { useSnackbar } from '../hooks/useSnackbar';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const QuoteCalculator: React.FC = () => {
  const { resetQuote, quoteData } = useQuote();
  const { snackbar, closeSnackbar, showSnackbar } = useSnackbar();

  const handleReset = () => {
    resetQuote();
    showSnackbar('Quote has been reset', 'info');
  };

  const hasContent = quoteData.services.length > 0 || 
                      quoteData.clientDetails.name !== '' ||
                      quoteData.clientDetails.address !== '';

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box>
          {/* Client Details */}
          <ClientDetailsForm />

          {/* Settings */}
          <RateForm />

          {/* Service Management */}
          <ServiceForm />

          {/* Services List */}
          <ServicesList />

          <Divider sx={{ my: 3 }} />

          {/* Summary */}
          <QuoteSummary />

          {/* Actions */}
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 4 }}>
            <PDFGenerator />
            {hasContent && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                fullWidth
                sx={{ borderRadius: 1, py: 1.5, fontWeight: 600 }}
              >
                Reset Quote
              </Button>
            )}
          </Stack>

          <Box sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="caption" color="textSecondary">
              ACHU Ltd Quote Calculator v1.0 | All quotes are valid for 7 days from the date shown
            </Typography>
          </Box>
        </Box>
      </Container>

      <Snackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  );
};
