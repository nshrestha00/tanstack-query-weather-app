import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPages from "./pages/CityPages";


function App() {
  return (
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
  );
}

export default App;
