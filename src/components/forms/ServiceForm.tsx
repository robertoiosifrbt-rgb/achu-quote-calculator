import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  MenuItem,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Service, ServiceType } from '../../types';
import { useQuote } from '../../context/QuoteContext';
import { SERVICE_DEFINITIONS, calculatePrice, formatCurrency } from '../../data/services';
import AddIcon from '@mui/icons-material/Add';

export const ServiceForm: React.FC = () => {
  const { quoteData, addService } = useQuote();
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | ''>('');
  const [selectedOption, setSelectedOption] = useState<string>('');

  const { control, watch, reset } = useForm<Partial<Service>>({
    defaultValues: {
      hourlyRate: quoteData.hourlyRate,
    },
  });

  const hourlyRate = watch('hourlyRate', quoteData.hourlyRate);

  const serviceDefinition = SERVICE_DEFINITIONS.find(
    (s) => s.name === selectedServiceType
  );

  const selectedServiceOption = serviceDefinition?.options.find(
    (opt) => opt.label === selectedOption
  );

  const estimatedPrice = selectedServiceOption && hourlyRate
    ? calculatePrice(selectedServiceOption.minutes, hourlyRate)
    : 0;

  const handleAddService = () => {
    if (selectedServiceType && selectedOption && selectedServiceOption) {
      addService({
        type: selectedServiceType,
        selectedOption,
        minutes: selectedServiceOption.minutes,
        hourlyRate: hourlyRate || 0,
        price: estimatedPrice,
      });

      setSelectedServiceType('');
      setSelectedOption('');
      reset({ hourlyRate });
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Add Service"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        }}
      />
      <CardContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' } }}>
          <TextField
            select
            label="Service Type *"
            value={selectedServiceType}
            onChange={(e) => {
              setSelectedServiceType(e.target.value as ServiceType);
              setSelectedOption('');
            }}
            fullWidth
            size="small"
            variant="outlined"
          >
            {SERVICE_DEFINITIONS.map((service) => (
              <MenuItem key={service.name} value={service.name}>
                {service.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Service Option *"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            fullWidth
            size="small"
            variant="outlined"
            disabled={!selectedServiceType}
          >
            {serviceDefinition?.options.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label} ({option.minutes} min)
              </MenuItem>
            ))}
          </TextField>

          <Controller
            name="hourlyRate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Hourly Rate (£) *"
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                fullWidth
                size="small"
                variant="outlined"
              />
            )}
          />
        </Box>

        {selectedServiceOption && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Estimated Details:
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 1 }}>
              <Typography variant="body2">
                <strong>Minutes:</strong> {selectedServiceOption.minutes}
              </Typography>
              <Typography variant="body2">
                <strong>Rate:</strong> £{(hourlyRate || 0).toFixed(2)}/hr
              </Typography>
              <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 600 }}>
                <strong>Price:</strong> {formatCurrency(estimatedPrice)}
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddService}
            disabled={!selectedServiceType || !selectedOption}
            sx={{ borderRadius: 1 }}
          >
            Add Service
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
