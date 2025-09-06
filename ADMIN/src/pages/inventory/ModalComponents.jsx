import React from 'react';
import Modal from '../../components/ui/Modal';
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/Select";
import { toast } from 'react-toastify';

export const StockModal = ({ isOpen, onClose, onSubmit, products, title, submitText, isExport = false }) => {
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [supplier, setSupplier] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!selectedProduct || quantity <= 0) {
        toast.error('Vui lòng chọn sản phẩm và nhập số lượng hợp lệ');
        return;
      }
      if (isExport) {
        const product = products.find(p => p.id === parseInt(selectedProduct));
        if (product.stock < parseInt(quantity)) {
          toast.error('Số lượng tồn kho không đủ');
          return;
        }
      }
      onSubmit(parseInt(selectedProduct), parseInt(quantity), supplier);
      toast.success(`${isExport ? 'Xuất kho' : 'Nhập kho'} thành công`);
      setSelectedProduct('');
      setQuantity('');
      setSupplier('');
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn sản phẩm" />
          </SelectTrigger>
          <SelectContent>
            {products.map(product => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name} (SKU: {product.sku}, Tồn: {product.stock})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Số lượng"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
        {!isExport && (
          <Input
            type="text"
            placeholder="Nhà cung cấp (tùy chọn)"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        )}
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>Hủy</Button>
          <Button type="submit">{submitText}</Button>
        </div>
      </form>
    </Modal>
  );
};

export const LowStockModal = ({ isOpen, onClose, products, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {products.length === 0 ? (
          <p>Không có sản phẩm nào sắp hết hoặc hết hàng.</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="border-b py-2">
              <p className="font-medium">{product.name} (SKU: {product.sku})</p>
              <p className="text-sm text-gray-500">
                Số lượng: {product.stock} {product.status === 'low-stock' ? '(Sắp hết)' : '(Hết hàng)'}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={onClose}>Đóng</Button>
      </div>
    </Modal>
  );
};