import { ServiceDefinition } from '../types';

export const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    name: 'Regular Cleaning',
    options: [
      { label: 'Bedroom', minutes: 20 },
      { label: 'Bathroom', minutes: 35 },
      { label: 'Kitchen', minutes: 45 },
      { label: 'Living Room', minutes: 30 },
      { label: 'Hallway', minutes: 10 },
    ],
  },
  {
    name: 'Deep Cleaning',
    options: [
      { label: 'Bedroom', minutes: 35 },
      { label: 'Bathroom', minutes: 60 },
      { label: 'Kitchen', minutes: 75 },
      { label: 'Living Room', minutes: 50 },
      { label: 'Hallway', minutes: 20 },
    ],
  },
  {
    name: 'End of Tenancy Cleaning',
    options: [
      { label: 'Bedroom', minutes: 45 },
      { label: 'Bathroom', minutes: 75 },
      { label: 'Kitchen', minutes: 90 },
      { label: 'Living Room', minutes: 60 },
      { label: 'Hallway', minutes: 25 },
    ],
  },
  {
    name: 'Window Cleaning',
    options: [
      { label: 'Interior', minutes: 8 },
      { label: 'Exterior', minutes: 10 },
      { label: 'Both', minutes: 16 },
    ],
  },
  {
    name: 'Oven Cleaning',
    options: [
      { label: 'Standard', minutes: 60 },
      { label: 'Double', minutes: 90 },
    ],
  },
  {
    name: 'Fridge Cleaning',
    options: [
      { label: 'Fridge', minutes: 30 },
      { label: 'Fridge Freezer', minutes: 45 },
    ],
  },
  {
    name: 'Carpet Cleaning',
    options: [
      { label: 'Room', minutes: 30 },
      { label: 'Stairs', minutes: 20 },
    ],
  },
  {
    name: 'Upholstery Cleaning',
    options: [
      { label: 'Dining Chair', minutes: 10 },
      { label: 'Armchair', minutes: 25 },
      { label: '2 Seat Sofa', minutes: 40 },
      { label: '3 Seat Sofa', minutes: 55 },
      { label: 'Corner Sofa', minutes: 75 },
    ],
  },
  {
    name: 'Garden Tidy',
    options: [
      { label: 'Lawn', minutes: 30 },
      { label: 'Leaves', minutes: 20 },
      { label: 'Weeding', minutes: 30 },
      { label: 'Hedge', minutes: 30 },
      { label: 'Paths', minutes: 15 },
    ],
  },
  {
    name: 'Steam Sanitisation',
    options: [
      { label: 'Bedroom', minutes: 15 },
      { label: 'Bathroom', minutes: 20 },
      { label: 'Kitchen', minutes: 20 },
      { label: 'Living Room', minutes: 20 },
    ],
  },
];

export const DEFAULT_HOURLY_RATE = 28;

export const generateQuoteNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `QT-${timestamp}-${random}`;
};

export const generateInvoiceNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `INV-${timestamp}-${random}`;
};

export const getServiceDefinition = (serviceType: string) => {
  return SERVICE_DEFINITIONS.find((service) => service.name === serviceType);
};

export const calculatePrice = (
  minutes: number,
  hourlyRate: number
): number => {
  return (minutes / 60) * hourlyRate;
};

export const formatCurrency = (amount: number): string => {
  return `£${amount.toFixed(2)}`;
};
