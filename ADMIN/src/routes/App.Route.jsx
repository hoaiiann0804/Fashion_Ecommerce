import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Login from '../pages/authentication/Login';
import Home from '../pages/home/Home';
import ProductAdmin from '../pages/product/Product';
import Language from '../pages/setting/Language';

const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? <DashboardLayout>{children}</DashboardLayout> : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                {/* Chỉ cho phép vào Login nếu chưa đăng nhập */}
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                />

                {/* Các route cần đăng nhập */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <ProductAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <div>Orders Page</div>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <PrivateRoute>
                            <div>Customers Page</div>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <Language />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
