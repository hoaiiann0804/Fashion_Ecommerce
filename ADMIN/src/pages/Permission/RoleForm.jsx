import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

const RoleForm = ({ role, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: role?.id || Date.now(),
    name: role?.name || '',
    description: role?.description || '',
    usersCount: role?.usersCount || 0,
    createdAt: role?.createdAt || new Date().toISOString().split('T')[0],
    permissions: role?.permissions || {
      dashboard: false,
      products: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (module, action, value) => {
    if (module === 'dashboard') {
      setFormData({
        ...formData,
        permissions: { ...formData.permissions, dashboard: value }
      });
    } else {
      setFormData({
        ...formData,
        permissions: {
          ...formData.permissions,
          [module]: { ...formData.permissions[module], [action]: value }
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Tên vai trò</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Quyền</label>
        <div className="space-y-2">
          <div>
            <Checkbox
              checked={formData.permissions.dashboard}
              onCheckedChange={(checked) => handlePermissionChange('dashboard', null, checked)}
            />
            <span className="ml-2">Dashboard</span>
          </div>
          {['products', 'orders', 'users'].map((module) => (
            <div key={module} className="ml-4">
              <p className="font-medium capitalize">{module}</p>
              {['view', 'create', 'edit', 'delete'].map((action) => (
                <div key={action} className="ml-4">
                  <Checkbox
                    checked={formData.permissions[module][action]}
                    onCheckedChange={(checked) => handlePermissionChange(module, action, checked)}
                  />
                  <span className="ml-2 capitalize">{action}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">Lưu</Button>
      </div>
    </form>
  );
};

export default RoleForm;