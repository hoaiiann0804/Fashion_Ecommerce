import React from 'react';
import { Shield, MoreVertical, Eye, Edit, Trash } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/DropdownMenu';
import { Badge } from '../../components/ui/Badge';

const PermissionsTable = ({ roles, onView, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tên vai trò</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Số người dùng</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.length > 0 ? (
          roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" />
                  {role.name}
                </div>
              </TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <Badge variant="outline">{role.usersCount} người dùng</Badge>
              </TableCell>
              <TableCell>{role.createdAt}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => onView(role)}>
                      <Eye size={16} />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(role)}>
                      <Edit size={16} />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive" onClick={() => onDelete(role)}>
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
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Không tìm thấy vai trò nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PermissionsTable;