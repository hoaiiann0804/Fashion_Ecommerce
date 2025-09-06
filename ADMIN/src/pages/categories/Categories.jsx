import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/AlertDiaLog";
import { Button } from "../../components/ui/Button";
import {
  Card
} from "../../components/ui/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import CategoriesFilter from "../../pages/categories/CategoriesFilter";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../hooks/use-toast";
import { deleteCategory, getCategories } from "../../services/Category.Service";
import CategoryForm from "./CategoryForm";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const { showSuccess, showError, showInfo } = useToast();

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const renderSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  const compareValues = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    return sortOrder === 'asc' ? a - b : b - a;
  };

  const filteredCategories = [...categories]
    .filter((category) =>
      category.categorY_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => compareValues(a[sortBy], b[sortBy]));

  const handleSaveCategory = (data) => {
    if (editingCategory) {
      const updatedCategories = categories.map(category =>
        category.categorY_ID === editingCategory.categorY_ID
          ? { ...data, categorY_ID: category.categorY_ID }
          : category
      );
      setCategories(updatedCategories);
      showSuccess(`Cập nhật danh mục thành công: Danh mục "${data.categorY_NAME}" đã được cập nhật.`);
    } else {
      const newCategory = {
        ...data,
        categorY_ID: categories.length ? Math.max(...categories.map((c) => c.categorY_ID)) + 1 : 1,
      };
      setCategories([...categories, newCategory]);
      showSuccess(`Thêm danh mục thành công: Danh mục "${data.categorY_NAME}" đã được thêm.`);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteCategory(categoryToDelete.categorY_ID)
    if (categoryToDelete) {
      setCategories(categories.filter(c => c.categorY_ID !== categoryToDelete.categorY_ID));
      showSuccess(`Xóa danh mục thành công: Danh mục "${categoryToDelete.categorY_NAME}" đã bị xóa.`);
      setCategoryToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
          <Button className="flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} />
            Thêm danh mục
          </Button>
        </div>

        <CategoriesFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Card>
          <Table>
            <TableCaption>Danh sách các danh mục sản phẩm</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort("categorY_ID")} className="cursor-pointer">
                  ID{renderSortIndicator("categorY_ID")}
                </TableHead>
                <TableHead onClick={() => handleSort("categorY_NAME")} className="cursor-pointer">
                  Tên danh mục{renderSortIndicator("categorY_NAME")}
                </TableHead>
                <TableHead>Tên icon</TableHead>
                <TableHead>Màu icon</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.categorY_ID}>
                  <TableCell>{category.categorY_ID}</TableCell>
                  <TableCell>{category.categorY_NAME}</TableCell>
                  <TableCell>
                    {category.icoN_NAME}
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        backgroundColor: category.icoN_COLOR,
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        display: 'inline-block'
                      }}
                    ></div>
                  </TableCell>
                  <TableCell>{category.categorY_STATUS === 'ACTIVE' ? "Hiển thị" : "Ẩn"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditModal(category)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(category)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow> 
              ))}
            </TableBody>
          </Table>
        </Card>

        <CategoryForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSave={handleSaveCategory}
          category={editingCategory}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa danh mục{" "}
                <strong>{categoryToDelete?.categorY_NAME}</strong>? Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Xóa</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
