import { Toaster as Sonner } from "@/components/ui/Sonner";
import { ToastProvider, ToastViewport } from "./components/ui/Toast";
import { TooltipProvider } from "./components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "../node_modules/@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Private.Route";
import Analytics from "./pages/Analytics/Analytics";
import Login from "./pages/authentication/Login";
import Brands from "./pages/brands/Brands";
import Categories from "./pages/categories/Categories";
import Home from "./pages/home/Home";
import Orders from "./pages/Orders/Orders";
import Permissions from "./pages/Permission/Permissions";
import Products from "./pages/product/Products";
import Reviews from "./pages/reviews/Reviews";
import Settings from "./pages/setting/Settings";
import InventoryManagement from "./pages/inventory/InventoryManageMent";
import Users from "./pages/User/Users";
const queryClient = new QueryClient();  

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <ToastProvider>
    <ToastViewport />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/products" element={<PrivateRoute element={<Products />} />} />
          <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
          <Route path="/brands" element={<PrivateRoute element={<Brands />} />} />
          <Route path="/stock" element={<PrivateRoute element={<InventoryManagement />} />} />
          <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route path="/permissions" element={<PrivateRoute element={<Permissions />} />} />
          <Route path="/reviews" element={<PrivateRoute element={<Reviews />} />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;