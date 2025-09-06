import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { ArrowUpDown, Edit, Eye, MoreVertical, Package } from "lucide-react";
import { useEffect, useState } from "react";
import useToast from "../../hooks/use-toast";
import { OrderNew } from "../../services/Order.Service";
import { exportReport, getStatusBadge } from "../../utils/OrderUtils";
import CancelOrderDialog from "./CancelOrderDialog";
import OrdersFilter from "./OrdersFilter";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const { toast } = useToast();

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "Tất cả" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle view details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const fetchOrders = async () => {
    try {
      const response = await OrderNew();
      setOrders(response);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng mới:", error);
    }
  }

  // Handle update status
  const handleUpdateStatus = (newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder({ ...selectedOrder, status: newStatus });
    toast({
      title: "Cập nhật thành công",
      description: `Đơn hàng ${selectedOrder.id} đã được cập nhật trạng thái thành "${newStatus}".`,
    });
  };

  // Handle cancel order
  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setIsCancelOpen(true);
  };

  const confirmCancelOrder = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "Đã hủy" } : order
      )
    );
    toast({
      title: "Hủy đơn hàng",
      description: `Đơn hàng ${selectedOrder.id} đã được hủy.`,
    });
    setIsCancelOpen(false);
    setIsDetailOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          <div className="flex gap-2">
            <Button
              className="flex items-center gap-2"
              onClick={() => exportReport(filteredOrders, toast)}
            >
              <Package size={18} />
              Xuất báo cáo
            </Button>
            <Button className="flex items-center gap-2">
              <Package size={18} />
              Tạo đơn hàng mới
            </Button>
          </div>
        </div>

        <OrdersFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Ngày đặt
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead>Số mặt hàng</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.useR_LAST_NAME}</TableCell>
                      <TableCell>{order.createD_AT}</TableCell>
                      <TableCell>{getStatusBadge(order.ordeR_STATUS)}</TableCell>
                      <TableCell className="text-right">{order.totaL_PRICE}</TableCell>
                      <TableCell>{order.totaL_QUANTITY}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex jusitems-center gap-2"
                              onClick={() => handleViewDetails(order)}
                            >
                              <Eye size={16} />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit size={16} />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive"
                              onClick={() => handleCancelOrder(order)}
                            >
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Không tìm thấy đơn hàng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onUpdateStatus={handleUpdateStatus}
        />

        <CancelOrderDialog
          order={selectedOrder}
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={confirmCancelOrder}
        />
      </div>
    </DashboardLayout>
  );
};

export default Orders;