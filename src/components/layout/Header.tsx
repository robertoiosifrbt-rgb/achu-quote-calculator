import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useQuote } from '../../context/QuoteContext';
import { formatDateForDisplay } from '../../utils/date';

export const Header: React.FC = () => {
  const { quoteData } = useQuote();

  return (
    <Paper
      elevation={2}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 3,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
              ACHU Ltd
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 600 }}>
              Quote Calculator
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              Quote #: <strong>{quoteData.quoteNumber}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5 }}>
              Date: <strong>{formatDateForDisplay(quoteData.quoteDate)}</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 8px',
                borderRadius: 1,
                display: 'inline-block',
              }}
            >
              Valid for 7 days (until {formatDateForDisplay(quoteData.validUntil)})
            </Typography>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};
