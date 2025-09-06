import { Star } from "lucide-react";
import { Badge } from "../components/ui/Badge";

export const renderStarRating = (rating) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

export const getStatusBadge = (status) => {
  switch (status) {
    case "Đã duyệt":
      return <Badge className="bg-green-500">Đã duyệ</Badge>;
    case "Chờ duyệt":
      return <Badge className="bg-amber-500">Chờ duyệt</Badge>;
    case "Đã từ chối":
      return <Badge variant="destructive">Đã từ chối</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};