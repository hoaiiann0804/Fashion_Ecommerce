import { AlertTriangle, Download, Package, Plus, TrendingDown } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import React from 'react';
import { StockModal, LowStockModal } from './ModalComponents';
import { useInventoryData } from "../../hooks/useInventoryData";

const QuickActions = ({ inventoryData }) => {
  const [isStockModalOpen, setIsStockModalOpen] = React.useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = React.useState(false);
  const [isLowStockModalOpen, setIsLowStockModalOpen] = React.useState(false);
  const { addStock, removeStock, updateStock } = useInventoryData();

  const exportReport = () => {
    const headers = ['ID,Sản phẩm,SKU,Danh mục,Số lượng,Giá,Trạng thái'];
    const rows = inventoryData.map(item =>
      `${item.id},${item.name},${item.sku},${item.category},${item.stock},${item.price},${item.status}`
    );
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'bao_cao_ton_kho.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline" onClick={() => setIsStockModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo phiếu nhập kho
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={() => setIsExportModalOpen(true)}>
            <TrendingDown className="mr-2 h-4 w-4" />
            Xuất kho
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={() => setIsAuditModalOpen(true)}>
            <Package className="mr-2 h-4 w-4" />
            Kiểm kê tồn kho
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={() => setIsLowStockModalOpen(true)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Xem cảnh báo hết hàng
          </Button>
          <Button className="w-full justify-start" variant="outline" onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Báo cáo tồn kho
          </Button>
        </CardContent>
      </Card>

      <StockModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSubmit={addStock}
        products={inventoryData}
        title="Tạo phiếu nhập kho"
        submitText="Nhập kho"
      />
      <StockModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onSubmit={removeStock}
        products={inventoryData}
        title="Xuất kho"
        submitText="Xuất kho"
        isExport={true}
      />
      <StockModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onSubmit={updateStock}
        products={inventoryData}
        title="Kiểm kê tồn kho"
        submitText="Cập nhật"
      />
      <LowStockModal
        isOpen={isLowStockModalOpen}
        onClose={() => setIsLowStockModalOpen(false)}
        products={inventoryData.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')}
        title="Cảnh báo hết hàng"
      />
    </>
  );
};

export default QuickActions;