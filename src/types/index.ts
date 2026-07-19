/**
 * Type definitions for the ACHU Quote Calculator application
 */

export type ServiceType =
  | 'Regular Cleaning'
  | 'Deep Cleaning'
  | 'End of Tenancy Cleaning'
  | 'Window Cleaning'
  | 'Oven Cleaning'
  | 'Fridge Cleaning'
  | 'Carpet Cleaning'
  | 'Upholstery Cleaning'
  | 'Garden Tidy'
  | 'Steam Sanitisation';

export interface ServiceOption {
  label: string;
  minutes: number;
}

export interface Service {
  id: string;
  type: ServiceType;
  selectedOption: string;
  minutes: number;
  hourlyRate: number;
  price: number;
}

export interface ClientDetails {
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

export interface QuoteData {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  clientDetails: ClientDetails;
  services: Service[];
  hourlyRate: number;
  discountPercentage: number;
}

export interface QuoteSummary {
  totalMinutes: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
}

export interface ServiceDefinition {
  name: ServiceType;
  options: ServiceOption[];
}
