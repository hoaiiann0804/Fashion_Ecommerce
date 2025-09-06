import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/layouts/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import PermissionsFilter from './PermissionsFilter';
import PermissionsTable from './PermissionsTable';
import PermissionMatrix from './PermissionMatrix';
import RoleForm from './RoleForm';
import RoleDetail from './RoleDetail';
import RoleDeleteConfirm from './RoleDeleteConfirm';
import Modal from '../../components/ui/Modal';
import { mockRoles } from '../../services/mockRoles';

const Permissions = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // list or matrix
  const [modal, setModal] = useState({ type: null, data: null });

  // Filter roles based on search term
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle modal open/close
  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: null, data: null });

  // Handle CRUD operations
  const handleAddRole = () => openModal('add');
  const handleViewRole = (role) => openModal('view', role);
  const handleEditRole = (role) => openModal('edit', role);
  const handleDeleteRole = (role) => openModal('delete', role);

  const handleSaveRole = (roleData) => {
    if (modal.type === 'add') {
      setRoles([...roles, roleData]);
    } else if (modal.type === 'edit') {
      setRoles(roles.map((role) => (role.id === roleData.id ? roleData : role)));
    }
    closeModal();
  };

  const handleConfirmDelete = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    closeModal();
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý phân quyền</h1>
          <Button className="flex items-center gap-2" onClick={handleAddRole}>
            <Plus size={18} />
            Thêm vai trò mới
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <PermissionsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}>
              Danh sách
            </Button>
            <Button variant={view === 'matrix' ? 'default' : 'outline'} onClick={() => setView('matrix')}>
              Ma trận quyền
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Danh sách vai trò</CardTitle>
          </CardHeader>
          <CardContent>
            {view === 'list' ? (
              <PermissionsTable
                roles={filteredRoles}
                onView={handleViewRole}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}
              />
            ) : (
              <PermissionMatrix roles={filteredRoles} />
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <Modal isOpen={modal.type === 'add'} onClose={closeModal} title="Thêm vai trò mới">
          <RoleForm onSave={handleSaveRole} onCancel={closeModal} />
        </Modal>
        <Modal isOpen={modal.type === 'edit'} onClose={closeModal} title="Chỉnh sửa vai trò">
          <RoleForm role={modal.data} onSave={handleSaveRole} onCancel={closeModal} />
        </Modal>
        <Modal isOpen={modal.type === 'view'} onClose={closeModal} title="Chi tiết vai trò">
          <RoleDetail role={modal.data} onClose={closeModal} />
        </Modal>
        <Modal isOpen={modal.type === 'delete'} onClose={closeModal} title="Xác nhận xóa">
          <RoleDeleteConfirm role={modal.data} onConfirm={handleConfirmDelete} onCancel={closeModal} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Permissions;