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
import { addRank, updateRank } from "../../services/Rank.Servcie";

const RankForm = ({ isOpen, onClose, onSave, rank }) => {
  const [formData, setFormData] = useState({
    rankName: "",
    iconName: "",
    iconColor: "",
    description: "",
  });

  useEffect(() => {
    if (rank) {
      setFormData({
        rankID: rank.rankID,
        rankName: rank.rankName || "",
        iconName: rank.iconName || "",
        iconColor: rank.iconColor || "",
        description: rank.description || "",
      });
    } else {
      setFormData({
        rankName: "",
        iconName: "",
        iconColor: "",
        description: "",
      });
    }
  }, [rank]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rankName) {
      alert("Tên rank không được để trống!");
      return;
    }
    onSave(formData);
    if (rank) {
      updateRank(formData);
    } else {
      addRank(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{rank ? "Chỉnh sửa rank" : "Thêm rank"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rankName" className="text-right">
                Tên
              </Label>
              <Input
                id="rankName"
                name="rankName"
                value={formData.rankName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

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
              <Label htmlFor="iconName" className="text-right">
                Tên icon
              </Label>
              <Input
                id="iconName"
                name="iconName"
                value={formData.iconName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="iconColor" className="text-right">
                Màu icon
              </Label>
              <Input
                id="iconColor"
                name="iconColor"
                value={formData.iconColor}
                onChange={handleChange}
                className="col-span-3"
              />
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

export default RankForm;