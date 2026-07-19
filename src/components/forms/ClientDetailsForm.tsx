import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ClientDetails } from '../../types';
import { useQuote } from '../../context/QuoteContext';
import { validateEmail, validatePhone } from '../../utils/validation';

export const ClientDetailsForm: React.FC = () => {
  const { quoteData, updateClientDetails } = useQuote();
  const { control, watch } = useForm<ClientDetails>({
    defaultValues: quoteData.clientDetails,
  });

  const formValues = watch();

  useEffect(() => {
    updateClientDetails(formValues);
  }, [formValues, updateClientDetails]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Client Details"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Required fields marked with <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Client name is required',
              minLength: {
                value: 2,
                message: 'Client name must be at least 2 characters',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Client Name *"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
                size="small"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              validate: validatePhone,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Phone"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
                size="small"
                placeholder="+44 (0) 123 456 7890"
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{
              required: 'Address is required',
              minLength: {
                value: 5,
                message: 'Address must be at least 5 characters',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Address *"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
                size="small"
                multiline
                rows={2}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              validate: validateEmail,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
                size="small"
                type="email"
              />
            )}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
