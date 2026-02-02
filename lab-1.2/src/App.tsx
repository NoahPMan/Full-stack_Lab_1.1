import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeesPage from "./components/pages/EmployeePage";
import OrganizationPage from "./components/pages/OrganizationPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/employees" replace />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="organization" element={<OrganizationPage />} />
      </Route>
    </Routes>
  );
}