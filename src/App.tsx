import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './styles/theme';
import { QuoteProvider } from './context/QuoteContext';
import { QuoteCalculator } from './pages/QuoteCalculator';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuoteProvider>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <QuoteCalculator />
        </Box>
      </QuoteProvider>
    </ThemeProvider>
  );
}

export default App;
