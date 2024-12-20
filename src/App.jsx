import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import MortgageForm from "./pages/mortgage-form/MortgageForm";
import 'swiper/css';
import BuilderForm from "./pages/builder-form/BuilderForm";
import BusinessForm from "./pages/business-form/BusinessForm";
import GICRates from "./pages/gic-rates/GICRates";
import Layout from "./components/Layout";

const NotFound = () => (
  <Layout>
    <div className="flex-1 flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-merriweather font-bold text-theme-purple mb-4">404 - Page Not Found</h1>
      <p className="text-gray-8 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-theme-purple text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
        Go Home
      </a>
    </div>
  </Layout>
);

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/mortgage-form" element={<MortgageForm/>} />
        <Route path="/builder-form" element={<BuilderForm/>} />
        <Route path="/business-form" element={<BusinessForm/>} />
        <Route path="/gic-rates" element={<GICRates/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
