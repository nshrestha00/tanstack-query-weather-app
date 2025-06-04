import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            hello
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
