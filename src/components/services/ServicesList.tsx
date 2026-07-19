import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useQuote } from '../../context/QuoteContext';
import { ServiceCard } from './ServiceCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const ServicesList: React.FC = () => {
  const { quoteData } = useQuote();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Services ({quoteData.services.length})
      </Typography>

      {quoteData.services.length === 0 ? (
        <Card sx={{ backgroundColor: '#f9f9f9' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <AddCircleOutlineIcon
              sx={{ fontSize: 48, color: 'action.disabled', mb: 1 }}
            />
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              No services added yet
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Add services using the form above to create your quote
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {quoteData.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Box>
      )}
    </Box>
  );
};
