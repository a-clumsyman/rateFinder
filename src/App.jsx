import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import MortgageForm from "./pages/mortgage-form/MortgageForm";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/mortgage-form" element={<MortgageForm/>} />
      </Route>
    </Routes>
  );
}
