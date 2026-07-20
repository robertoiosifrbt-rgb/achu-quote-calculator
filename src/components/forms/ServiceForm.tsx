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
  const [customMinutes, setCustomMinutes] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const { control, watch, reset } = useForm<Partial<Service>>({
    defaultValues: {
      hourlyRate: quoteData.hourlyRate,
    },
  });

  const hourlyRate = watch('hourlyRate', quoteData.hourlyRate);

  const serviceDefinition = SERVICE_DEFINITIONS.find(
    (s) => s.name === selectedServiceType
  );

  const serviceOptions = serviceDefinition?.options ?? [];

  const selectedServiceOption = serviceOptions.find(
    (opt) => opt.label === selectedOption
  );

 const minutesToUse =
  customMinutes > 0
    ? customMinutes
    : selectedServiceOption?.minutes ?? 0;

const basePrice =
  selectedServiceOption && hourlyRate
    ? calculatePrice(minutesToUse, hourlyRate)
    : 0;

const estimatedPrice = basePrice * quantity;

  const handleAddService = () => {
    if (selectedServiceType && selectedOption && selectedServiceOption) {
      addService({
  type: selectedServiceType,
  selectedOption,
  minutes: minutesToUse,
  hourlyRate: hourlyRate || 0,
  price: estimatedPrice,
  quantity,
});

      setSelectedServiceType('');
      setSelectedOption('');
      setCustomMinutes(0);
      setQuantity(1);
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
          <TextField
  label="Duration (minutes)"
  type="number"
  value={customMinutes || ''}
  onChange={(e) => setCustomMinutes(Number(e.target.value))}
  fullWidth
  size="small"
  inputProps={{ min: 1 }}
/>

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

          <TextField
            label="Quantity *"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            fullWidth
            size="small"
            inputProps={{ min: 1, step: 1 }}
            variant="outlined"
          />
        </Box>

        {selectedServiceOption && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Estimated Details:
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 1 }}>
              <Typography variant="body2">
                <strong>Minutes:</strong> {minutesToUse}
              </Typography>
              <Typography variant="body2">
                <strong>Rate:</strong> £{(hourlyRate || 0).toFixed(2)}/hr
              </Typography>
              <Typography variant="body2">
                <strong>Base Price:</strong> {formatCurrency(basePrice)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 600 }}>
                <strong>Total Price:</strong> {formatCurrency(estimatedPrice)}
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
