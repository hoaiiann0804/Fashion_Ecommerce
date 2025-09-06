import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/DiaLog";
import { Label } from "../../components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";

const OrderDetailsDialog = ({ order, isOpen, onClose, onUpdateStatus }) => {
  if (!order) return null;
  console.log("Order Details:", order);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng {order.id}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Mã đơn hàng:</Label>
            <span className="col-span-3">{order.id}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Khách hàng:</Label>
            <span className="col-span-3">{order.useR_LAST_NAME}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Ngày đặt:</Label>
            <span className="col-span-3">{order.createD_AT}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Trạng thái:</Label>
            <Select value={order.ordeR_STATUS} onValueChange={onUpdateStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Đã hoàn thành", "Đang đợi", "Đã giao", "Đang giao", "Đã hủy"].map(
                  (status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Tổng tiền:</Label>
            <span className="col-span-3">{order.totaL_PRICE}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium">Số mặt hàng:</Label>
            <span className="col-span-3">{order.totaL_QUANTITY}</span>
          </div>
          <div className="grid gap-2">
            <Label className="font-medium">Danh sách sản phẩm:</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Giá</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.producT_NAME}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.producT_PRICE}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;