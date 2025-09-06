import React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../components/ui/DropdownMenu";
import { MoreVertical, Eye, Edit, Trash, ArrowUpDown } from "lucide-react";
import { renderStarRating, getStatusBadge } from "../../utils/ReviewUtils";

const ReviewTable = ({ reviews, onView, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>
            <div className="flex items-center gap-1 cursor-pointer">
              Sản phẩm
              <ArrowUpDown size={16} />
            </div>
          </TableHead>
          <TableHead>Người dùng</TableHead>
          <TableHead>Đánh giá</TableHead>
          <TableHead>Bình luận</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell className="font-medium">{review.product}</TableCell>
              <TableCell>{review.user}</TableCell>
              <TableCell>{renderStarRating(review.rating)}</TableCell>
              <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>{getStatusBadge(review.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => onView(review)}>
                      <Eye size={16} />
                      <span>Xem chi tiết</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => onEdit(review)}>
                      <Edit size={16} />
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => onDelete(review.id)}
                    >
                      <Trash size={16} />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
              Không tìm thấy đánh giá nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReviewTable;