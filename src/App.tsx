import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPages from "./pages/CityPages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function App() {
  return (
       <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark">
            <Layout>
              <Routes>
                <Route path="/" element={<WeatherDashboard/>}/>
                <Route path="/city/:cityName" element={<CityPages/>}/>
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>

  );
}

export default App;
