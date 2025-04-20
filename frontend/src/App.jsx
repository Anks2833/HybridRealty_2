import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./components/properties/propertydetail";
import Aboutus from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./components/login";
import Signup from "./components/signup";
import ForgotPassword from "./components/forgetpassword";
import ResetPassword from "./components/resetpassword";
import Footer from "./components/footer";
import NotFoundPage from "./components/Notfound";
import { AuthProvider } from "./context/AuthContext";
// import AIPropertyHub from './pages/Aiagent'
import StructuredData from "./components/SEO/StructuredData";
import "react-toastify/dist/ReactToastify.css";
import Add from "./pages/Add";
import InvestPage from "./pages/InvestPage";
import LuckyDrawPage from "./components/LuckyDrawPage";
import LuckyDrawPropertyDetails from "./components/LuckyDrawPropertyDetails";
import InvestPropertyDetails from "./components/properties/InvestPropertyDetails";
import UpcomingProjectsPage from "./components/UpcomingProjectsPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// export const Backendurl = import.meta.env.VITE_BACKEND_URL;
// export const Backendurl = "https://hybridrealty-dev-backend.onrender.com";
export const Backendurl = "";

// Define routes that should not have Navbar and Footer
const routesWithoutNavbarFooter = [
  "/login",
  "/signup",
  // "/add",
  "/forgot-password"
];

// This component uses the location to conditionally render Navbar and Footer
const AppContent = () => {
  const location = useLocation();

  // Check if current path should display navbar/footer
  const shouldShowNavbarFooter = !routesWithoutNavbarFooter.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  return (
    <>
      {/* Base website structured data */}
      <StructuredData type="website" />
      <StructuredData type="organization" />

      {/* Conditionally render Navbar */}
      {shouldShowNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/single/:id" element={<PropertyDetails />} />
        {/* <Route path="/about" element={<Aboutus />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/invest/single/:id" element={<InvestPropertyDetails />} />
        {/* <Route path="/ai-property-hub" element={<AIPropertyHub />} /> */}
        <Route path="/add" element={<Add />} />

        <Route path="/lucky-draw" element={<LuckyDrawPage />} />
        <Route path="/upcoming-projects" element={<UpcomingProjectsPage />} />
        <Route
          path="/lucky-draw/property/:id"
          element={<LuckyDrawPropertyDetails />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Conditionally render Footer */}
      {shouldShowNavbarFooter && <Footer />}

      <ToastContainer />
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
