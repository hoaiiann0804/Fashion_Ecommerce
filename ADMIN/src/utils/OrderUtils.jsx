import { Badge } from "../components/ui/Badge";

export const getStatusBadge = (status) => {
  switch (status) {
    case "Đã hoàn thành":
      return <Badge className="bg-green-500">Đã hoàn thành</Badge>;
    case "Đang xử lý":
      return (
        <Badge variant="outline" className="text-blue-500 border-blue-500">
          Đang xử lý
        </Badge>
      );
    case "Đã giao":
      return <Badge className="bg-green-600">Đã giao</Badge>;
    case "Đang giao":
      return <Badge className="bg-amber-500">Đang giao</Badge>;
    case "Đã hủy":
      return <Badge variant="destructive">Đã hủy</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const exportReport = (orders, toast) => {
  const headers = [
    "Mã đơn hàng",
    "Khách hàng",
    "Ngày đặt",
    "Trạng thái",
    "Tổng tiền",
    "Số mặt hàng",
  ];
  const csvContent = [
    headers.join(","),
    ...orders.map((order) =>
      [
        order.id,
        order.customer,
        order.date,
        order.status,
        order.total,
        order.items,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "orders_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast({
    title: "Xuất báo cáo",
    description: "Báo cáo đơn hàng đã được tải xuống dưới dạng CSV.",
  });
};
