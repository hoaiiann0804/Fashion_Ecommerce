import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/Table';

const PermissionMatrix = ({ roles }) => {
  const modules = [
    { name: 'Dashboard', key: 'dashboard' },
    { name: 'Sản phẩm', key: 'products', actions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Đơn hàng', key: 'orders', actions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Người dùng', key: 'users', actions: ['view', 'create', 'edit', 'delete'] }
  ];

  const actionLabels = {
    view: 'Xem',
    create: 'Thêm',
    edit: 'Sửa',
    delete: 'Xóa'
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle>Ma trận phân quyền</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module / Vai trò</TableHead>
                {roles.map((role) => (
                  <TableHead key={role.id}>{role.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map((module) => (
                <React.Fragment key={module.key}>
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-medium">{module.name}</TableCell>
                    {roles.map((role) => (
                      <TableCell key={`${role.id}-${module.key}`}>
                        {module.key === 'dashboard' ? (
                          role.permissions[module.key] ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <X size={16} className="text-red-500" />
                          )
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                  {module.actions &&
                    module.actions.map((action) => (
                      <TableRow key={`${module.key}-${action}`}>
                        <TableCell className="pl-8">{actionLabels[action]}</TableCell>
                        {roles.map((role) => (
                          <TableCell key={`${role.id}-${module.key}-${action}`}>
                            {role.permissions[module.key]?.[action] ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <X size={16} className="text-red-500" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionMatrix;