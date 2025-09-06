import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/Select";
import {Table , TableBody, TableHead, TableHeader, TableRow, TableCell } from "../../components/ui/Table";
import { Eye, Edit, Search } from "lucide-react";
import {Button} from "../../components/ui/Button"
const InventoryTable = ({ data, searchTerm, selectedCategory, onSearch, onCategoryChange }) => {
    const getStatusBadge = (status) => {
      switch (status) {
        case 'in-stock':
          return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Còn hàng</Badge>;
        case 'low-stock':
          return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sắp hết</Badge>;
        case 'out-of-stock':
          return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hết hàng</Badge>;
        default:
          return <Badge>Không xác định</Badge>;
      }
    };
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tồn kho</CardTitle>
          <CardDescription>Quản lý và theo dõi số lượng hàng tồn kho</CardDescription>
          
          <div className="flex gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm sản phẩm hoặc SKU..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                <SelectItem value="Áo">Áo</SelectItem>
                <SelectItem value="Quần">Quần</SelectItem>
                <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                <SelectItem value="Trang sức">Trang sức</SelectItem>
                <SelectItem value="Giày">Giày</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">{item.quantity}</div>
                    <div className="text-sm text-gray-500">Tối thiểu: {item.minStock}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  
  export default InventoryTable;