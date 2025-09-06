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
import { Card } from "../../components/ui/Card";
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

import RanksFilter from "../../pages/Rank/RanksFilter";
import useToast from "../../hooks/use-toast";
import { getRanks } from "../../services/Rank.Servcie";
import RankForm from "./RankForm";
import { deleteRank } from "../../services/Rank.Servcie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Ranks = () => {
  const [ranks, setRanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRank, setEditingRank] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rankToDelete, setRankToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("rankID");
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

  const filteredRanks = [...ranks]
    .filter((rank) =>
      rank.rankName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => compareValues(a[sortBy], b[sortBy]));

  const handleSaveRank = (data) => {
    if (editingRank) {
      const updatedRanks = ranks.map((rank) =>
        rank.rankID === editingRank.rankID
          ? { ...data, rankID: rank.rankID }
          : rank
      );
      setRanks(updatedRanks);
      showSuccess(`Cập nhật rank thành công: Rank "${data.rankName}" đã được cập nhật.`);
    } else {
      const newRank = {
        ...data,
        rankID: ranks.length ? Math.max(...ranks.map((c) => c.rankID)) + 1 : 1,
      };
      setRanks([...ranks, newRank]);
      showSuccess(`Thêm rank thành công: Rank "${data.rankName}" đã được thêm.`);
    }
    setIsModalOpen(false);
    setEditingRank(null);
  };

  const openAddModal = () => {
    setEditingRank(null);
    setIsModalOpen(true);
  };

  const openEditModal = (rank) => {
    setEditingRank(rank);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (rank) => {
    setRankToDelete(rank);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteRank(rankToDelete.rankID);
    if (rankToDelete) {
      setRanks(ranks.filter((c) => c.rankID !== rankToDelete.rankID));
      showSuccess(`Xóa rank thành công: Rank "${rankToDelete.rankName}" đã bị xóa.`);
      setRankToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRanks();
        setRanks(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rank:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quản lý rank</h1>
          <Button className="flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} />
            Thêm rank
          </Button>
        </div>

        <RanksFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Card>
          <Table>
            <TableCaption>Danh sách các rank</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => handleSort("rankID")}
                  className="cursor-pointer"
                >
                  ID{renderSortIndicator("rankID")}
                </TableHead>
                <TableHead
                  onClick={() => handleSort("rankName")}
                  className="cursor-pointer"
                >
                  Tên rank{renderSortIndicator("rankName")}
                </TableHead>
                <TableHead>Tên icon</TableHead>
                <TableHead>Màu icon</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRanks.map((rank) => (
                <TableRow key={rank.rankID}>
                  <TableCell>{rank.rankID}</TableCell>
                  <TableCell>{rank.rankName}</TableCell>
                  <TableCell>{rank.iconName}</TableCell>
                  <TableCell>{rank.iconColor}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditModal(rank)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(rank)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <RankForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRank(null);
          }}
          onSave={handleSaveRank}
          rank={editingRank}
        />

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa rank{" "}
                <strong>{rankToDelete?.rankName}</strong>? Hành động này không thể
                hoàn tác.
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

export default Ranks;