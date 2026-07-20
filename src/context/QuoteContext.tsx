import React, { createContext, useContext, useState, useCallback } from 'react';
import { QuoteData, ClientDetails, Service } from '../types';
import { DEFAULT_HOURLY_RATE, generateQuoteNumber, calculatePrice } from '../data/services';
import { getCurrentDate, getDateSevenDaysAhead } from '../utils/date';

interface QuoteContextType {
  quoteData: QuoteData;
  updateClientDetails: (details: ClientDetails) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  duplicateService: (id: string) => void;
  updateHourlyRate: (rate: number) => void;
  updateDiscountPercentage: (percentage: number) => void;
  resetQuote: () => void;
  getTotalMinutes: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getGrandTotal: () => number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const createInitialQuoteData = (): QuoteData => ({
  quoteNumber: generateQuoteNumber(),
  quoteDate: getCurrentDate(),
  validUntil: getDateSevenDaysAhead(),
  clientDetails: {
    name: '',
    address: '',
    phone: '',
    email: '',
  },
  services: [],
  hourlyRate: DEFAULT_HOURLY_RATE,
  discountPercentage: 0,
});

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quoteData, setQuoteData] = useState<QuoteData>(
    createInitialQuoteData()
  );

  const updateClientDetails = useCallback((details: ClientDetails) => {
    setQuoteData((prev) => ({
      ...prev,
      clientDetails: details,
    }));
  }, []);

  const addService = useCallback(
    (service: Omit<Service, 'id'>) => {
      const id = `service-${Date.now()}-${Math.random()}`;
      setQuoteData((prev) => ({
        ...prev,
        services: [
          ...prev.services,
          {
            ...service,
            id,
          },
        ],
      }));
    },
    []
  );

  const updateService = useCallback(
    (id: string, updatedService: Omit<Service, 'id'>) => {
      setQuoteData((prev) => ({
        ...prev,
        services: prev.services.map((service) =>
          service.id === id
            ? {
                ...service,
                ...updatedService,
              }
            : service
        ),
      }));
    },
    []
  );

  const deleteService = useCallback((id: string) => {
    setQuoteData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  }, []);

  const duplicateService = useCallback((id: string) => {
    const serviceToDuplicate = quoteData.services.find(
      (service) => service.id === id
    );
    if (serviceToDuplicate) {
      const { id: _, ...serviceData } = serviceToDuplicate;
      addService(serviceData);
    }
  }, [quoteData.services, addService]);

  const updateHourlyRate = useCallback((rate: number) => {
    setQuoteData((prev) => ({
      ...prev,
      hourlyRate: rate,
      services: prev.services.map((service) => ({
        ...service,
        hourlyRate: rate,
        price: calculatePrice(service.minutes, rate) * service.quantity,
      })),
    }));
  }, []);

  const updateDiscountPercentage = useCallback((percentage: number) => {
    setQuoteData((prev) => ({
      ...prev,
      discountPercentage: Math.max(0, Math.min(100, percentage)),
    }));
  }, []);

  const resetQuote = useCallback(() => {
    setQuoteData(createInitialQuoteData());
  }, []);

  const getTotalMinutes = useCallback((): number => {
    return quoteData.services.reduce((sum, service) => sum + service.minutes, 0);
  }, [quoteData.services]);

  const getSubtotal = useCallback((): number => {
    return quoteData.services.reduce((sum, service) => sum + service.price, 0);
  }, [quoteData.services]);

  const getDiscountAmount = useCallback((): number => {
    const subtotal = getSubtotal();
    return (subtotal * quoteData.discountPercentage) / 100;
  }, [quoteData.discountPercentage, getSubtotal]);

  const getGrandTotal = useCallback((): number => {
    return getSubtotal() - getDiscountAmount();
  }, [getSubtotal, getDiscountAmount]);

  const value: QuoteContextType = {
    quoteData,
    updateClientDetails,
    addService,
    updateService,
    deleteService,
    duplicateService,
    updateHourlyRate,
    updateDiscountPercentage,
    resetQuote,
    getTotalMinutes,
    getSubtotal,
    getDiscountAmount,
    getGrandTotal,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
