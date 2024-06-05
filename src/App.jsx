import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import MortgageForm from "./pages/mortgage-form/MortgageForm";
import 'swiper/css';
import BuilderForm from "./pages/builder-form/BuilderForm";
import BusinessForm from "./pages/business-form/BusinessForm";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/mortgage-form" element={<MortgageForm/>} />
        <Route path="/builder-form" element={<BuilderForm/>} />
        <Route path="/business-form" element={<BusinessForm/>} />
      </Route>
    </Routes>
  );
}
