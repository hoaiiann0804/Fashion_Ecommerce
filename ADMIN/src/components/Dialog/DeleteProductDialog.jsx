
import React from "react";
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
import { Trash2 } from "lucide-react";

export const DeleteProductDialog = ({
  open,
  onOpenChange,
  product,
  onConfirm,
}) => {
  if (!product) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            <span>Xác nhận xóa sản phẩm</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              Bạn có chắc chắn muốn xóa sản phẩm </span>
            <strong>"{product.name}"</strong>
            <span> không? Hành động này không thể hoàn tác.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <span>Hủy</span>
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            <span>Xóa</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
