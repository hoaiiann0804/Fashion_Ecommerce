import React from 'react';
import { Button } from '../../components/ui/Button';

const RoleDeleteConfirm = ({ role, onConfirm, onCancel }) => {
  return (
    <div className="space-y-4">
      <p>
        Bạn có chắc chắn muốn xóa vai trò <strong>{role.name}</strong>? Hành động này không thể hoàn tác.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button variant="destructive" onClick={() => onConfirm(role.id)}>
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default RoleDeleteConfirm;