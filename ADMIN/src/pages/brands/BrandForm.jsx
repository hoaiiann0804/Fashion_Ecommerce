import { Button } from "../../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/DiaLog";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { useEffect, useState } from "react";
import { uploadImage } from "../../services/Upload.Service";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";

const BrandForm = ({ isOpen, onClose, onSave, brand }) => {
  const [formData, setFormData] = useState({
    branD_NAME: "",
    image: "",
    description: "",
    productsCount: 0,
    status: "INACTIVE",
  });

  useEffect(() => {
    if (brand) {
      setFormData({
        ...brand,
        image: brand.branD_IMAGE || "",
      });
    } else {
      setFormData({
        branD_NAME: "",
        image: "",
        description: "",
        status: "INACTIVE",
        productsCount: 0,
      });
    }
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productsCount" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const res = await uploadImage(file); // res = URL ảnh
        setFormData((prev) => ({
          ...prev,
          image: res,
        }));
      } catch (err) {
        console.error("Upload thất bại:", err);
        toast.error("Lỗi khi tải ảnh lên.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.branD_NAME || !formData.branD_NAME.trim()) {
      toast.error("Tên không được để trống!");
      return;
    }

    try {
      const trimmedData = {
        ...formData,
        branD_NAME: formData.branD_NAME.trim(),
        branD_IMAGE: formData.image, // Gửi đúng field API
      };

      onSave(trimmedData);
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu thương hiệu:", error);
      if (error.response && error.response.data?.message) {
        const msg = error.response.data.message.toLowerCase();
        if (msg.includes("đã tồn tại") || msg.includes("exists")) {
          toast.error("Thương hiệu đã tồn tại. Vui lòng chọn tên khác.");
          return;
        }
      }
      toast.error("Lỗi khi lưu thương hiệu. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên
              </Label>
              <Input
                id="name"
                name="branD_NAME"
                value={formData.branD_NAME}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Ảnh
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>

            {formData.image && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">URL Ảnh</Label>
                  <span className="col-span-3 text-sm break-all">
                    {formData.image}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Ảnh hiện tại
                  </Label>
                  <img
                    src={formData.image}
                    alt="Brand"
                    className="col-span-3 h-24 object-cover"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Trạng thái
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Hiển thị</SelectItem>
                  <SelectItem value="INACTIVE">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandForm;
