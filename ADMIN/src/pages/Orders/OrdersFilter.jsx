import React from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/Popover";
import { Label } from "../../components/ui/Label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/RadioGroup";

const OrdersFilter = ({ searchTerm, setSearchTerm, selectedStatus, setSelectedStatus }) => {
  const allStatuses = [
    "Tất cả",
    "Đã hoàn thành",
    "Đang xử lý",
    "Đã giao",
    "Đang giao",
    "Đã hủy",
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="search"
              placeholder="Tìm kiếm đơn hàng..."
              className="pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                <span>Bộ lọc</span>
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Trạng thái</h4>
                  <RadioGroup
                    defaultValue={selectedStatus || "Tất cả"}
                    onValueChange={setSelectedStatus}
                    className="flex flex-col space-y-1"
                  >
                    {allStatuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <RadioGroupItem value={status} id={`status-${status}`} />
                        <Label htmlFor={`status-${status}`}>{status}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Khoảng ngày đặt hàng</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="fromDate">Từ ngày</Label>
                      <Input type="date" id="fromDate" />
                    </div>
                    <div>
                      <Label htmlFor="toDate">Đến ngày</Label>
                      <Input type="date" id="toDate" />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Áp dụng</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersFilter;