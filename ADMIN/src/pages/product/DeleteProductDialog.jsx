import React from "react";
import { Button } from "../../components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/DiaLog";
import { Trash2 } from "lucide-react";
import useToast from "../../hooks/use-toast";

const DeleteProductDialog = ({ isOpen, onClose, item, onConfirm, itemType }) => {
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!item) return; // Prevent action if item is null
    onConfirm();
    toast({
      title: `Xóa ${itemType} thành công`,
      description: `${itemType} "${itemType === "Sản phẩm" ? item.producT_NAME : item.categorY_NAME}" đã được xóa.`,
    });
  };

  // If item is null, show a fallback message
  if (!item) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Xác nhận xóa {itemType.toLowerCase()}
            </DialogTitle>
            <DialogDescription>
              Không tìm thấy {itemType.toLowerCase()} để xóa. Vui lòng thử lại.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Xác nhận xóa {itemType.toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa {itemType.toLowerCase()}{" "}
            <strong>"{itemType === "Sản phẩm" ? item.producT_NAME : item.categorY_NAME}"</strong> không? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
          <Button type="button" onClick={handleConfirm}>Xóa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;