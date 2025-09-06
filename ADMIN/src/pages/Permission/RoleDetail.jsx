import React from 'react';
import { Button } from '../../components/ui/Button';
import { Check, X } from 'lucide-react';

const RoleDetail = ({ role, onClose }) => {
  if (!role) return null;

  const modules = [
    { name: 'Dashboard', key: 'dashboard' },
    { name: 'Sản phẩm', key: 'products', actions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Đơn hàng', key: 'orders', actions: ['view', 'create', 'edit', 'delete'] },
    { name: 'Người dùng', key: 'users', actions: ['view', 'create', 'edit', 'delete'] }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">Tên vai trò</h3>
        <p>{role.name}</p>
      </div>
      <div>
        <h3 className="font-medium">Mô tả</h3>
        <p>{role.description}</p>
      </div>
      <div>
        <h3 className="font-medium">Số người dùng</h3>
        <p>{role.usersCount}</p>
      </div>
      <div>
        <h3 className="font-medium">Ngày tạo</h3>
        <p>{role.createdAt}</p>
      </div>
      <div>
        <h3 className="font-medium">Quyền</h3>
        <table className="w-full border-collapse">
          <tbody>
            {modules.map((module) => (
              <React.Fragment key={module.key}>
                <tr className="bg-gray-100">
                  <td className="p-2 font-medium">{module.name}</td>
                  <td className="p-2">
                    {module.key === 'dashboard' ? (
                      role.permissions[module.key] ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )
                    ) : null}
                  </td>
                </tr>
                {module.actions?.map((action) => (
                  <tr key={`${module.key}-${action}`}>
                    <td className="p-2 pl-6">{action}</td>
                    <td className="p-2">
                      {role.permissions[module.key][action] ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <X size={16} className="text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Button onClick={onClose}>Đóng</Button>
      </div>
    </div>
  );
};

export default RoleDetail;