import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Service } from '../../types';
import { useQuote } from '../../context/QuoteContext';
import { formatCurrency } from '../../data/services';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { updateService, deleteService, duplicateService } = useQuote();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedHourlyRate, setEditedHourlyRate] = useState(service.hourlyRate);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = () => {
    updateService(service.id, {
      ...service,
      hourlyRate: editedHourlyRate,
      price: (service.minutes / 60) * editedHourlyRate,
    });
    handleEditClose();
  };

  const handleDeleteConfirmOpen = () => {
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteService(service.id);
    handleDeleteConfirmClose();
  };

  const handleDuplicate = () => {
    duplicateService(service.id);
    handleMenuClose();
  };

  return (
    <>
      <Card
        sx={{
          mb: 2,
          borderLeft: '4px solid #667eea',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {service.type}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Service
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {service.selectedOption}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Duration
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {service.minutes} minutes
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Hourly Rate
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatCurrency(service.hourlyRate)}/hr
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Total Price:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#667eea', fontSize: '1.25rem' }}
                >
                  {formatCurrency(service.price)}
                </Typography>
              </Box>
            </Box>

            <Box>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <FileCopyIcon fontSize="small" sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDeleteConfirmOpen} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              {service.type} - {service.selectedOption}
            </Typography>
          </Box>
          <TextField
            label="Hourly Rate (£)"
            type="number"
            inputProps={{ step: '0.01', min: '0' }}
            value={editedHourlyRate}
            onChange={(e) => setEditedHourlyRate(parseFloat(e.target.value) || 0)}
            fullWidth
            size="small"
            variant="outlined"
          />
          <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="caption" color="textSecondary">
              New Price:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#667eea' }}>
              {formatCurrency((service.minutes / 60) * editedHourlyRate)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Delete Service?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this service? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
