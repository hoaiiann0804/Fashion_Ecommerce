import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { ArrowUpDown, Edit, MoreVertical, Trash } from "lucide-react";

const RankTable = ({ ranks, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Danh sách rank</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  Tên rank
                  <ArrowUpDown size={16} />
                </div>
              </TableHead>
              <TableHead>Tên icon</TableHead>
              <TableHead>Màu icon</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ranks.length > 0 ? (
              ranks.map((rank) => (
                <TableRow key={rank.rankID}>
                  <TableCell>{rank.rankID}</TableCell>
                  <TableCell className="font-medium">{rank.rankName}</TableCell>
                  <TableCell>{rank.iconName}</TableCell>
                  <TableCell>{rank.iconColor}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {rank.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => onEdit(rank)}
                        >
                          <Edit size={16} />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive"
                          onClick={() => onDelete(rank)}
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
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  Không tìm thấy rank nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RankTable;