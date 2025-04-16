import "./App.css";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Home from "./Components/Home";
import Dashboard from "./Components/Admin/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ProductDetail from "./Components/Product/ProductDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import AdminRoute from "./Components/Route/AdminRoute";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="App">
          <HelmetProvider>
            <Header />
            <main className="container container-fluid">
              <ToastContainer theme="dark" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <ProductList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products/create"
                  element={
                    <AdminRoute>
                      <NewProduct />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/product/:id"
                  element={
                    <AdminRoute>
                      <UpdateProduct />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </HelmetProvider>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
