import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useQuote } from '../../context/QuoteContext';
import InfoIcon from '@mui/icons-material/Info';

export const RateForm: React.FC = () => {
  const { quoteData, updateHourlyRate } = useQuote();

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Settings"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Hourly Rate (£)"
              type="number"
              inputProps={{ step: '0.01', min: '0' }}
              value={quoteData.hourlyRate}
              onChange={(e) => updateHourlyRate(parseFloat(e.target.value) || 0)}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ maxWidth: 300 }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, pt: 1, color: 'textSecondary' }}>
            <InfoIcon fontSize="small" />
            <Typography variant="caption">
              This rate applies to all services. Individual services use this rate for calculations.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
