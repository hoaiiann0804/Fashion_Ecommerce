import React, { useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { Package} from "lucide-react";
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingBag,
  DollarSign,
  RefreshCw,
  ArrowRight,
  Percent,
  BarChart2,
  Map,
  AlertCircle
} from "lucide-react";
import DateRangePicker from "@/components/ui/DateRangePicker";
// Giả lập dữ liệu thống kê
const salesData = [
  { month: "T1", sales: 15000000, orders: 120, customers: 85 },
  { month: "T2", sales: 18500000, orders: 145, customers: 92 },
  { month: "T3", sales: 22000000, orders: 175, customers: 105 },
  { month: "T4", sales: 17500000, orders: 155, customers: 88 },
  { month: "T5", sales: 21000000, orders: 170, customers: 95 },
  { month: "T6", sales: 25000000, orders: 195, customers: 110 },
  { month: "T7", sales: 28000000, orders: 210, customers: 120 },
  { month: "T8", sales: 32000000, orders: 250, customers: 140 },
  { month: "T9", sales: 29000000, orders: 225, customers: 125 },
  { month: "T10", sales: 33000000, orders: 255, customers: 145 },
  { month: "T11", sales: 39000000, orders: 280, customers: 160 },
  { month: "T12", sales: 45000000, orders: 320, customers: 185 },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 255, revenue: 382500000, growth: 24 },
  { name: "Samsung Galaxy S25", sales: 210, revenue: 294000000, growth: 18 },
  { name: "Laptop Dell XPS 15", sales: 175, revenue: 612500000, growth: 22 },
  { name: "AirPods Pro 2", sales: 320, revenue: 224000000, growth: 35 },
  { name: "Apple Watch Series 9", sales: 190, revenue: 266000000, growth: 15 },
];

const customerSegments = [
  { segment: "Khách hàng mới", count: 850, percentage: 38 },
  { segment: "Khách hàng thường xuyên", count: 1250, percentage: 55 },
  { segment: "Khách hàng VIP", count: 150, percentage: 7 },
];

const salesChannels = [
  { channel: "Website", revenue: 225000000, percentage: 45 },
  { channel: "Ứng dụng di động", revenue: 175000000, percentage: 35 },
  { channel: "Bán hàng trực tiếp", revenue: 75000000, percentage: 15 },
  { channel: "Đối tác bán hàng", revenue: 25000000, percentage: 5 },
];

const topLocations = [
  { city: "Hà Nội", orders: 580, revenue: 145000000 },
  { city: "TP. Hồ Chí Minh", orders: 720, revenue: 180000000 },
  { city: "Đà Nẵng", orders: 230, revenue: 57500000 },
  { city: "Hải Phòng", orders: 185, revenue: 46250000 },
  { city: "Cần Thơ", orders: 120, revenue: 30000000 },
];

// Component xử lý các thẻ chỉ số
const MetricCard = ({ title, value, trend, icon, description, color }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline mt-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              <span className={`ml-2 text-sm font-medium flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                {Math.abs(trend)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            {icon}
          </div>
        </div> 
      </CardContent>
    </Card>
  );
};

// Component xử lý bảng xếp hạng sản phẩm
const RankingTable = ({ data, title, columns }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b text-left">
                {columns.map((column, index) => (
                  <th key={index} className="p-3 font-medium">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {data.map((item, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-gray-50">
                  {columns.map((column, j) => {
                    const key = column.toLowerCase().replace(/\s+/g, '');
                    let value = item[key] || '-';
                    
                    if (key === 'revenue') {
                      value = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                              .format(value).replace('₫', '') + 'đ';
                    } else if (key === 'growth') {
                      value = (
                        <span className={`flex items-center ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {value > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {value}%
                        </span>
                      );
                    }
                    
                    return <td key={`${i}-${j}`} className="p-3">{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Component cho biểu đồ phân phối
const DistributionChart = ({ data, title, description }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm">{item.segment || item.channel}</div>
                <div className="text-sm font-medium">
                  {item.revenue 
                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(item.revenue).replace('₫', '') + 'đ'
                    : `${item.count} khách`}  
                </div>
              </div>
              <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Component cảnh báo và thông tin
const AlertCard = ({ title, message, type = "info" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800"
  };
  
  return (
    <div className={`p-4 rounded-md border ${styles[type]} flex items-center`}>
      <AlertCircle className="w-5 h-5 mr-3" />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

// Component chính
const Analytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [compareEnabled, setCompareEnabled] = useState(false);
  
  // Tính toán tổng số liệu
  const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalOrders = salesData.reduce((acc, curr) => acc + curr.orders, 0);
  const totalCustomers = salesData.reduce((acc, curr) => acc + curr.customers, 0);
  const avgOrderValue = totalSales / totalOrders;
  
  // Tính tỷ lệ chuyển đổi (giả định)
  const conversionRate = 3.8;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Phân tích & Thống kê</h1>
            <p className="text-gray-500">Kiểm tra hiệu suất và xu hướng kinh doanh của bạn</p>
          </div>
          
          <div className="flex items-center gap-4">
            <DateRangePicker />
           <Button
                        className="flex items-center gap-2"
                        onClick={() => exportReport(filteredOrders, toast)}
                      >
                        <Package size={18} />
                        Xuất báo cáo
                      </Button>
            <Button variant="outline" size="icon">
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">
                  <BarChartIcon className="w-4 h-4 mr-2" />
                  Tổng quan
                </TabsTrigger>
                <TabsTrigger value="sales">
                  <LineChartIcon className="w-4 h-4 mr-2" />
                  Doanh số
                </TabsTrigger>
                <TabsTrigger value="customers">
                  <PieChartIcon className="w-4 h-4 mr-2" />
                  Khách hàng
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">Khoảng thời gian:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="week">Tuần này</SelectItem>
                <SelectItem value="month">Tháng này</SelectItem>
                <SelectItem value="quarter">Quý này</SelectItem>
                <SelectItem value="year">Năm nay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Các chỉ số tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Doanh thu"
            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(totalSales).replace('₫', '') + 'đ'}
            trend={12.8}
            icon={<DollarSign size={20} className="text-green-600" />}
            description="So với kỳ trước"
            color="green"
          />
          <MetricCard 
            title="Đơn hàng"
            value={totalOrders.toLocaleString()}
            trend={8.5}
            icon={<ShoppingBag size={20} className="text-blue-600" />}
            description="So với kỳ trước"
            color="blue"
          />
          <MetricCard 
            title="Khách hàng"
            value={totalCustomers.toLocaleString()}
            trend={5.2}
            icon={<Users size={20} className="text-purple-600" />}
            description="So với kỳ trước"
            color="purple"
          />
          <MetricCard 
            title="Giá trị đơn trung bình"
            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(avgOrderValue).replace('₫', '') + 'đ'}
            trend={-2.3}
            icon={<BarChart2 size={20} className="text-orange-600" />}
            description="So với kỳ trước"
            color="orange"
          />
        </div>
        
        {/* Chỉ số chuyển đổi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Tỷ lệ chuyển đổi</CardTitle>
              <CardDescription>Tỷ lệ % khách truy cập chuyển thành đơn hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#e6e6e6" 
                      strokeWidth="10"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="10"
                      strokeDasharray={`${conversionRate * 28.27} 282.7`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold">{conversionRate}%</span>
                    <span className="text-sm text-gray-500">Tỷ lệ chuyển đổi</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <AlertCard
                  type="info"
                  title="Mẹo cải thiện tỷ lệ chuyển đổi"
                  message="Thử tối ưu hóa các trang sản phẩm và đơn giản hóa quy trình thanh toán để tăng tỷ lệ chuyển đổi."
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Phân tích xu hướng</CardTitle>
              <CardDescription>Doanh thu theo tháng</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="h-[200px] flex items-end justify-between">
                  {salesData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-blue-500 rounded-t-sm" 
                        style={{ height: `${(item.sales / 45000000) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Biểu đồ phân phối */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DistributionChart 
            data={customerSegments}
            title="Phân khúc khách hàng"
            description="Phân bổ theo nhóm khách hàng"
          />
          <DistributionChart 
            data={salesChannels}
            title="Kênh bán hàng"
            description="Doanh thu theo kênh bán hàng"
          />
        </div>
        
        {/* Danh sách tóp */}
        <div className="grid grid-cols-1 gap-4">
          <RankingTable 
            data={topProducts}
            title="Sản phẩm bán chạy"
            columns={["Name", "Sales", "Revenue", "Growth"]}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RankingTable 
            data={topLocations}
            title="Thành phố mua nhiều nhất"
            columns={["City", "Orders", "Revenue"]}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Phân bố địa lý</CardTitle>
              <CardDescription>Doanh số theo vùng miền</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <Map size={48} className="text-gray-400 mb-2" />
                  <p className="text-lg font-medium text-gray-400">Bản đồ phân phối</p>
                  <p className="text-sm text-gray-500">Bản đồ phân phối doanh thu theo khu vực</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Cảnh báo và đề xuất */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Cảnh báo và đề xuất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertCard
              type="warning"
              title="Hàng tồn kho thấp"
              message="5 sản phẩm bán chạy sắp hết hàng. Xem danh sách và bổ sung kịp thời."
            />
            <AlertCard
              type="error"
              title="Tỷ lệ hủy đơn cao"
              message="Tỷ lệ hủy đơn hàng tăng 5% trong tuần qua. Kiểm tra nguyên nhân."
            />
            <AlertCard
              type="success"
              title="Cơ hội tăng trưởng"
              message="Thời trang nam đang có xu hướng tăng 15%. Cân nhắc ưu tiên cho chiến dịch marketing."
            />
            <AlertCard
              type="info"
              title="Cập nhật chính sách vận chuyển"
              message="Nhà vận chuyển mới đã được thêm vào hệ thống. Cập nhật chính sách để tối ưu chi phí."
            />
          </div>
        </div>
        
        {/* Các chỉ số chi tiết */}
        <div className="pt-4 border-t">
          <h2 className="text-xl font-bold mb-4">Các chỉ số chi tiết</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tổng doanh thu</span>
              <span className="text-xl font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(totalSales).replace('₫', '') + 'đ'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tổng đơn hàng</span>
              <span className="text-xl font-bold">{totalOrders.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tổng khách hàng</span>
              <span className="text-xl font-bold">{totalCustomers.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Doanh thu trung bình mỗi khách</span>
              <span className="text-xl font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(totalSales / totalCustomers).replace('₫', '') + 'đ'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tỷ lệ quay lại</span>
              <span className="text-xl font-bold">42.5%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Thời gian trung bình trên trang</span>
              <span className="text-xl font-bold">4:32</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Tỷ lệ bỏ giỏ hàng</span>
              <span className="text-xl font-bold">23.8%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Chi phí thu hút khách hàng</span>
              <span className="text-xl font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                  .format(125000).replace('₫', '') + 'đ'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Xem báo cáo chi tiết */}
        <div className="flex justify-center pt-6">
          <Button className="flex items-center gap-2">
            Xem báo cáo chi tiết
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;