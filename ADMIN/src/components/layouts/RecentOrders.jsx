import { Badge } from "../../components/ui/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/Table";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { OrderNew } from "../../services/Order.Service";

function getStatusStyle(status) {
  switch (status) {
    case 1:
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case 2:
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case 3:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case 5:
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

function getStatusText(status) {
  switch (status) {
    case 1:
      return "Hoàn thành";
    case 2:
      return "Đang xử lý";
    case 3:
      return "Chờ xác nhận";
    case 5:
      return "Đã hủy";
    default:
      return status;
  }
}

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderNew();
        setOrders(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Đơn hàng gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Ngày đặt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.useR_LAST_NAME}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="text-right">{order.totaL_PRICE}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={clsx("font-normal", getStatusStyle(order.ordeR_STATUS))}
                  >
                    {getStatusText(order.ordeR_STATUS)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.createD_AT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
