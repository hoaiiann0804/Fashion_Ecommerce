import React from 'react'
import QuickActions from './QuickAction'
import InventoryTable from './InventoryTable'
import StatsCard from './StatsCard'
import RecentMoveMents from './RecentMoveMents'
import { useInventoryData } from '../../hooks/useInventoryData'
import { Button } from "../../components/ui/Button"
import { Download } from 'lucide-react'
import { Plus } from 'lucide-react'
import {Package, TrendingUp, TrendingDown, AlertTriangle} from 'lucide-react'
import { DashboardLayout } from '../../components/layouts/DashboardLayout'
import { StockModal } from './ModalComponents'
const InventoryManagement= () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isStockModalOpen, setIsStockModalOpen] = React.useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const { inventoryStats, recentMovements, inventoryData, addStock, removeStock } = useInventoryData();
    const filteredData = inventoryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    };
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
      <DashboardLayout>
      <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý Tồn kho</h1>
              <p className="text-gray-600">Theo dõi và quản lý hàng tồn kho của cửa hàng thời trang</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2" onClick ={() => setIsExportModalOpen(true)}>
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </Button>
              <Button className="flex items-center gap-2" onClick={() => setIsStockModalOpen(true)}>
                <Plus className="h-4 w-4" />
                Nhập kho
              </Button>
              <Button className="flex items-center gap-2" onClick={() => setIsExportModalOpen(true)}>
              <Package className="h-4 w-4" />
              Xuất kho
            </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Tổng sản phẩm"
              value={inventoryStats.totalProducts.toLocaleString()}
              description="Các mặt hàng trong kho"
              icon={Package}
            />
            <StatsCard
              title="Giá trị tồn kho"
              value={formatCurrency(inventoryStats.totalValue)}
              description="Tổng giá trị hàng tồn"
              icon={TrendingUp}
            />
            <StatsCard
              title="Sắp hết hàng"
              value={inventoryStats.lowStock}
              description="Sản phẩm dưới mức tối thiểu"
              icon={AlertTriangle}
              color="yellow"
            />
            <StatsCard
              title="Hết hàng"
              value={inventoryStats.outOfStock}
              description="Sản phẩm hết hàng"
              icon={TrendingDown}
              color="red"
            />
          </div>
  
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Inventory Table */}
            <div className="lg:col-span-2">
              <InventoryTable
                data={filteredData}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
              />
            </div>
  
            {/* Sidebar */}
            <div className="space-y-6">
              <RecentMoveMents movements={recentMovements} />
            <QuickActions inventoryData={inventoryData} />
            </div>
          </div>
        </div>
        <StockModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSubmit={addStock}
        products={inventoryData}
        title="Nhập kho"
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
      </DashboardLayout>
    );
  }
  export default InventoryManagement;
