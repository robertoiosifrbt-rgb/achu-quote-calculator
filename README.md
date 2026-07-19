# ACHU Ltd Quote Calculator

A professional quotation calculator web application for ACHU Ltd, a UK cleaning company.

## Features

- ✅ Modern, responsive UI built with React 19 and Material-UI
- ✅ Professional quote generation with automatic quote numbers and dates
- ✅ Support for 10+ cleaning services with predefined time estimates
- ✅ Customizable hourly rates
- ✅ Discount percentage support
- ✅ Service card management (add, edit, duplicate, delete)
- ✅ Professional PDF export
- ✅ Real-time price calculations
- ✅ Client details management
- ✅ Mobile-responsive design

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **Form Management**: React Hook Form
- **State Management**: React Context
- **PDF Generation**: jsPDF with jsPDF-AutoTable

## Project Structure

```
src/
├── components/
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── services/       # Service-related components
│   ├── summary/        # Summary components
│   └── pdf/            # PDF generation components
├── context/            # React Context for state management
├── data/               # Service definitions and constants
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── styles/             # Theme and styling
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Root component
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/robertoiosifrbt-rgb/ACHU-Quote-Calculator.git
cd ACHU-Quote-Calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Available Services

- Regular Cleaning
- Deep Cleaning
- End of Tenancy Cleaning
- Window Cleaning
- Oven Cleaning
- Fridge Cleaning
- Carpet Cleaning
- Upholstery Cleaning
- Garden Tidy
- Steam Sanitisation

## Usage

1. **Enter Client Details**: Fill in client name and address (phone and email are optional)
2. **Set Hourly Rate**: Adjust the default hourly rate if needed (default: £28)
3. **Add Services**: Select a service type and option, then click "Add Service"
4. **Manage Services**: Edit, duplicate, or delete services as needed
5. **Apply Discount**: Set a discount percentage if applicable
6. **Generate PDF**: Click "Generate PDF Quote" to create a professional quotation

## Features

### Service Management
- Add unlimited services to a quote
- Edit hourly rate for individual services
- Duplicate services for quick additions
- Delete services with confirmation dialog

### Quote Calculations
- Automatic price calculation based on time and hourly rate
- Real-time summary with totals
- Discount percentage support
- Grand total calculation

### Professional PDF Export
- Company branding and contact information
- Client details
- Service breakdown table
- Summary section
- Footer with social media and contact details

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (Below 768px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Code Quality

- Strict TypeScript with no `any` types
- Reusable components and utilities
- Clean architecture with separation of concerns
- React Context for efficient state management
- No code duplication

## License

MIT

## Contact

ACHU Ltd
- Phone: +44 (0) 123 456 7890
- Email: info@achuld.com
- Website: www.achuld.com
