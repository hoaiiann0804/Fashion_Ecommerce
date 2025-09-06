import { setUISelection } from '@testing-library/user-event/dist/cjs/document/UI.js';
import { useState, useEffect } from 'react';

export function useInventoryData() {
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [recentMovements, setRecentMovements] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, name: 'Áo thun nam', sku: 'ATN001', category: 'Áo', price: 150000, stock: 50, minStock: 10 },
      { id: 2, name: 'Quần jean nữ', sku: 'QJN002', category: 'Quần', price: 300000, stock: 20, minStock: 10 },
      { id: 3, name: 'Giày thể thao', sku: 'GTT003', category: 'Giày', price: 500000, stock: 0, minStock: 10 },
      { id: 4, name: 'Áo khoác', sku: 'AK004', category: 'Áo', price: 450000, stock: 5, minStock: 10 },
    ];
    const updatedData = data.map(item=>({
      ...item, status: item.stock === 0 ? 'out-of-stock' : item.stock < item.minStock ? 'low-stock' : 'in-stock',
    }))
    setInventoryData(updatedData);

  
    const totalProducts = data.length;
    const totalValue = data.reduce((sum, item) => sum + item.price * item.stock, 0);
    const lowStock = data.filter(item => item.status === 'low-stock').length;
    const outOfStock = data.filter(item => item.status === 'out-of-stock').length;

    setInventoryStats({
      totalProducts,
      totalValue,
      lowStock,
      outOfStock,
    });

    const movements = [
      { id: 1, productName: 'Áo thun nam', type: 'Nhập', quantity: 20, date: '2024-06-01' },
      { id: 2, productName: 'Quần jean nữ', type: 'Xuất', quantity: 5, date: '2024-06-02' },
      { id: 3, productName: 'Giày thể thao', type: 'Nhập', quantity: 10, date: '2024-06-03' },
    ];
    setRecentMovements(movements);
  }, []);

  const addStock = (productId, quantity, supplier='')=>{
    if(quantity < 0){
      throw new Error('Số lượng phải lớn hơn 0');
    }
    setInventoryData((prevData) =>{
      const updatedData = prevData.map(item=>{
        if (item.id === productId){
          const newStock = item.stock + quantity;
          return{
            ...item, stock: newStock,
            status: newStock === 0 ? 'out-of-stock' : newStock < item.minStock ? 'low-stock' : 'in-stock',
          }
        }
        return item;
      });
      setInventoryStats({
        totalProducts: updatedData.length,
        totalValue: updatedData.reduce((sum, item) => sum + item.price * item.stock, 0),
        lowStock: updatedData.filter(item => item.status === 'low-stock').length,
        outOfStock: updatedData.filter(item => item.status === 'out-of-stock').length,
      })
      const product = prevData.find(item => item.id === productId);
      setRecentMovements(prev => [
        {
          id: prev.length + 1,
          product: product.name,
          type: 'in',
          quantity,
          supplier,
          date: new Date().toLocaleDateString('vi-VN'),
        },
        ...prev,
      ]);

      return updatedData;
    })
  }
  const removeStock = (productId, quantity) => {
    if (quantity <= 0) {
      throw new Error('Số lượng phải lớn hơn 0');
    }
    setInventoryData(prevData => {
      const product = prevData.find(item => item.id === productId);
      if (!product || product.stock < quantity) {
        throw new Error('Số lượng tồn kho không đủ');
      }

      const updatedData = prevData.map(item => {
        if (item.id === productId) {
          const newStock = item.stock - quantity;
          return {
            ...item,
            stock: newStock,
            status: newStock === 0 ? 'out-of-stock' : newStock < item.minStock ? 'low-stock' : 'in-stock',
          };
        }
        return item;
      });

      setInventoryStats({
        totalProducts: updatedData.length,
        totalValue: updatedData.reduce((sum, item) => sum + item.price * item.stock, 0),
        lowStock: updatedData.filter(item => item.status === 'low-stock').length,
        outOfStock: updatedData.filter(item => item.status === 'out-of-stock').length,
      });

      setRecentMovements(prev => [
        {
          id: prev.length + 1,
          product: product.name,
          type: 'out',
          quantity,
          date: new Date().toLocaleDateString('vi-VN'),
        },
        ...prev,
      ]);

      return updatedData;
    });
  };
const updateStock = (productId, actualStock) =>{
  if(actualStock <=0){
    throw new Error('Số lượng phải lớn hơn 0');
  }
  setInventoryData(prevData => {
    const updatedData = prevData.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          stock: actualStock,
          status: actualStock === 0 ? 'out-of-stock' : actualStock < item.minStock ? 'low-stock' : 'in-stock',
        };
      }
      return item;
    });

    setInventoryStats({
      totalProducts: updatedData.length,
      totalValue: updatedData.reduce((sum, item) => sum + item.price * item.stock, 0),
      lowStock: updatedData.filter(item => item.status === 'low-stock').length,
      outOfStock: updatedData.filter(item => item.status === 'out-of-stock').length,
    });

    return updatedData;
  });
  }

  return { inventoryData, inventoryStats, recentMovements };
}
