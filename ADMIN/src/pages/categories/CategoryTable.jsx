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
import { ArrowUpDown, Edit, MoreVertical, Tag, Trash } from "lucide-react";


const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Danh sách danh mục</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  Tên danh mục
                  <ArrowUpDown size={16} />
                </div>
              </TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Số sản phẩm</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category.categorY_ID}>
                  <TableCell>{category.categorY_ID}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-500" />
                      {category.categorY_NAME}
                    </div>
                  </TableCell>
                  <TableCell>
                    <img src={`https://localhost:5000/images/${category.categorY_IMAGE}`} alt={category.categorY_NAME} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>{category.producT_QUANTITY}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => onEdit(category)}
                        >
                          <Edit size={16} />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => onDelete(category)}
                        >
                          <Trash size={16} />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  Không tìm thấy danh mục nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryTable;