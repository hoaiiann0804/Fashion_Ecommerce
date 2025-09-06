
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import RecentOrders from "../../components/layouts/RecentOrders";
import { SalesChart } from "../../components/layouts/SalesChart";
import { StatsCard } from "../../components/layouts/StatsCard";
import { TopProducts } from "../../components/layouts/TopProduct";
import { BarChart, Calendar, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { GetOrder, GetRevenueTotal, GetUser } from "../../services/Dashboard.Service";

const Home = () => {
  // State variables to hold data
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [revenue, setRevenue] = useState(null);

  // State variables to hold total and growth values
  const [totalUser, setTotalUser] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // State variables to hold growth percentages
  const [growUser, setGrowUser] = useState(0);
  const [growOrder, setGrowOrder] = useState(0);
  const [growRevenue, setGrowRevenue] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await GetUser();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const fetchOrder = async () => {
    try {
      const response = await GetOrder();
      setOrder(response);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }

  const fetchRevenue = async () => {
    try {
      const response = await GetRevenueTotal();
      setRevenue(response);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  }

  const handleTotalFunction = (data) => {
    return data.reduce((total, item) => total + item.quantity, 0);
  }

  const calculateGrowth = (data) => {
    const sorted = [...data].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
    
    const len = sorted.length;
    if (len < 2) return 0;

    const currentMonth = sorted[len - 1];
    const prevMonth = sorted[len - 2];

    const growth = ((currentMonth.quantity - prevMonth.quantity) / prevMonth.quantity) * 100;
    return growth.toFixed(2);
  };


  useEffect(() => {
    fetchUser();
    fetchOrder();
    fetchRevenue();
  }, []);

  useEffect(() => {
    if (user && user.length > 0) {
      setTotalUser(handleTotalFunction(user));
      setGrowUser(calculateGrowth(user));
    }
    if (order && order.length > 0) {
      setTotalOrder(handleTotalFunction(order));
      setGrowOrder(calculateGrowth(order));
    }

    if (revenue && revenue.length > 0) {
      setTotalRevenue(handleTotalFunction(revenue));
      setGrowRevenue(calculateGrowth(revenue));
    }

  }, [user, order, revenue]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
          <p className="text-gray-500">Thống kê và tình hình kinh doanh của bạn</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Tổng đơn hàng"
            value= {totalOrder}
            description="Tháng 5, 2025"
            icon={<ShoppingBag size={20} className="text-indigo-500" />}
            trend={{ value: Number(growOrder), isPositive: true }}
          />
          <StatsCard
            title="Khách hàng mới"
            value={totalUser}   
            description="Tháng 5, 2025"
            icon={<User size={20} className="text-blue-500" />}
            trend={{ value: Number(growUser), isPositive: true }}
          />
          <StatsCard
            title="Doanh thu"
            value= {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
            description="Tháng 5, 2025"
            icon={<BarChart size={20} className="text-green-500" />}
            trend={{ value: Number(growRevenue), isPositive: true }}
          />
          <StatsCard
            title="Tỷ lệ hoàn thành"
            value="97.2%"
            description="30 ngày qua"
            icon={<Calendar size={20} className="text-orange-500" />}
            trend={{ value: 1.2, isPositive: false }}
          />
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <SalesChart />
          <div className="lg:col-span-2 grid grid-cols-1 gap-6">
            <TopProducts />
          </div>
        </div>
        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Home;