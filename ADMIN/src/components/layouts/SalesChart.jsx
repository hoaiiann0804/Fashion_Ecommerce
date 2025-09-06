import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GetRevenueByMonth, GetRevenueByWeek, GetRevenueByYear, GetRevenueTotal } from "../../services/Dashboard.Service";
import DateRangePicker from "../ui/DateRangePicker";

const dailyData = [
  { name: "T2", sales: 4000 },
  { name: "T3", sales: 3000 },
  { name: "T4", sales: 2000 },
  { name: "T5", sales: 2780 },
  { name: "T6", sales: 1890 },
  { name: "T7", sales: 2390 },
  { name: "CN", sales: 3490 },
];

const weeklyData = [
  { name: "Tuần 1", sales: 12000 },
  { name: "Tuần 2", sales: 19000 },
  { name: "Tuần 3", sales: 9800 },
  { name: "Tuần 4", sales: 15000 },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
};

export const SalesChart = () => {
  const [revenue, setRevenue] = useState([]);
  const [revenueByYear, setRevenueByYear] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [revenueByWeek, setRevenueByWeek] = useState([]);

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: undefined,
  });
  const vietnamDateTime = format(dateRange.from, "yyyy/MM/dd");


  const fetchRevenueData = async () => {
    try {
      const response = await GetRevenueTotal();
      setRevenue(response);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchRevenueByYear = async () =>{
    try {
      const response = await GetRevenueByYear(vietnamDateTime)
      setRevenueByYear(response)
    } catch(error) {
      console.log(error.response);
    }
  }
  
  const fetchRevenueByMonth = async () =>{
    try {
      const response = await GetRevenueByMonth(vietnamDateTime);
      setRevenueByMonth(response)
    } catch(error) {
      console.log(error.response);
    }
  }

  const formatRevenueData = (data) => {
    const weekdays = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

    return data.map(item => {
      const date = new Date(item.day);
      const dayOfWeekText = weekdays[date.getDay()];

      return {
        ...item,
        weekday: dayOfWeekText
        
      };
    });
  };


  const fetchRevenueByWeek = async () =>{
    try {
      const response = await GetRevenueByWeek(vietnamDateTime);
      const formattedData = formatRevenueData(response);
      setRevenueByWeek(formattedData);
    } catch(error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchRevenueData();
    fetchRevenueByYear(vietnamDateTime)
    fetchRevenueByMonth(vietnamDateTime)
    fetchRevenueByWeek(vietnamDateTime)
  }, [vietnamDateTime]);

  return (
    
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Phân tích doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="daily">Ngày</TabsTrigger>
              <TabsTrigger value="weekly">Tuần</TabsTrigger>
              <TabsTrigger value="monthly">Tháng</TabsTrigger>
            </TabsList>
            <div className="text-sm text-gray-500">
              <DateRangePicker value={dateRange} onChange={setDateRange}/>
            </div>
          </div>

          <TabsContent value="daily">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="weekday" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}K`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="quantity" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}K`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="quantity" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByYear} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `${value / 1000}`} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem',
                    }}
                  />
                  <Bar dataKey="quantity" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
