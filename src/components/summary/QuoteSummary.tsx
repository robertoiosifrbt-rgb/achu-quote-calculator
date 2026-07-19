import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useQuote } from '../../context/QuoteContext';
import { formatCurrency } from '../../data/services';

export const QuoteSummary: React.FC = () => {
  const {
    quoteData,
    getTotalMinutes,
    getSubtotal,
    getDiscountAmount,
    getGrandTotal,
    updateDiscountPercentage,
  } = useQuote();

  const totalMinutes = getTotalMinutes();
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const grandTotal = getGrandTotal();

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Quote Summary"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: 'none' }}>
                <Typography variant="body2">Total Minutes:</Typography>
              </TableCell>
              <TableCell sx={{ border: 'none', textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {totalMinutes} min
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 'none' }}>
                <Typography variant="body2">Subtotal:</Typography>
              </TableCell>
              <TableCell sx={{ border: 'none', textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {formatCurrency(subtotal)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
              <TableCell sx={{ border: 'none', py: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="body2">Discount:</Typography>
                  <TextField
                    type="number"
                    inputProps={{
                      min: '0',
                      max: '100',
                      step: '0.1',
                    }}
                    value={quoteData.discountPercentage}
                    onChange={(e) =>
                      updateDiscountPercentage(parseFloat(e.target.value) || 0)
                    }
                    sx={{
                      width: 80,
                      '& input': { textAlign: 'right', fontSize: '0.875rem' },
                    }}
                    size="small"
                    variant="outlined"
                    InputProps={{
                      endAdornment: '%',
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ border: 'none', py: 2, textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                  -{formatCurrency(discountAmount)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Grand Total:
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#667eea', fontSize: '1.75rem' }}
          >
            {formatCurrency(grandTotal)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
