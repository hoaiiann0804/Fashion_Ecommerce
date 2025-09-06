import React from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Edit, Trash2 } from "lucide-react";

const ProductTable = ({ items, itemType, onEdit, onDelete, categories, formatPrice }) => {
  const renderStatus = (status) => {
    const statusStyles = {
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-red-100 text-red-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
      Hiện: "bg-green-100 text-green-800",
      Ẩn: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "ACTIVE" ? "Hiển thị" : status === "DRAFT" ? "Bản nháp" : status === "Hiển thị" ? "Hiển thị" : "Ẩn"}
      </span>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              {itemType === "Sản phẩm" ? (
                <>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Hình ảnh</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Tên sản phẩm</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Danh mục</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Giá</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Tồn kho</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500"></th>
                </>
              ) : (
                <>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Tên danh mục</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Số sản phẩm</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Ngày tạo</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500"></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id || item.categorY_ID} className="border-b">
                {itemType === "Sản phẩm" ? (
                  <>
                    <td className="p-4">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.producT_NAME}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{item.producT_NAME}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-500">
                        {categories?.find(c => c.id === item.categorY_ID)?.name || "Không xác định"}
                      </div>
                    </td>
                    <td className="p-4">{renderStatus(item.producT_STATUS)}</td>
                    <td className="p-4">{formatPrice(item.producT_PRICE)}</td>
                    <td className="p-4">{item.stock}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4">
                      <div className="font-medium">{item.categorY_NAME}</div>
                    </td>
                    <td className="p-4">{item.products}</td>
                    <td className="p-4">{item.created}</td>
                    <td className="p-4">{renderStatus(item.status)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size={18} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ProductTable;