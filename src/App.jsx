import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import Layout from './components/layout'
import WeatherDashboard from './pages/weather-dashboard'
import CityPage from './pages/city-page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='dark'>
            <Layout>
              <Routes>
                <Route path="/" element={<WeatherDashboard />} />
                <Route path="/city/:cityName" element={<CityPage />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
