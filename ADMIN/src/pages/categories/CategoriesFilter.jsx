import React, { useState } from "react";
import { Search, Filter, ChevronDown, SortAsc, SortDesc } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";
import { RadioGroup, RadioGroupItem } from "../../components/ui/RadioGroup";
import { Label } from "../../components/ui/Label";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../../components/ui/Command";

 const CategoriesFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Dữ liệu mẫu của các bộ lọc
  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang hiển thị" },
    { value: "hidden", label: "Đang ẩn" },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Tìm kiếm */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Tìm kiếm danh mục..."
              className="pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Command Menu Filter */}
          <Popover open={isCommandOpen} onOpenChange={setIsCommandOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Tìm nhanh
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Tìm danh mục..." />
                <CommandList>
                  <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                  <CommandGroup heading="Danh mục phổ biến">
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Áo Nam
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Quần Nam
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Áo Nữ
                    </CommandItem>
                    <CommandItem onSelect={() => setIsCommandOpen(false)}>
                      Quần Nữ
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Bộ lọc trạng thái */}
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                <span>Bộ lọc</span>
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white">
              <DropdownMenuLabel>Trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={statusFilter === option.value}
                  onCheckedChange={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bộ lọc nâng cao */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Bộ lọc nâng cao</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Trạng thái</h4>
                  <RadioGroup 
                    defaultValue={statusFilter}
                    onValueChange={setStatusFilter}
                    className="flex flex-col space-y-1"
                  >
                    {statusOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                        <Label htmlFor={`status-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Số lượng sản phẩm</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="minProducts">Tối thiểu</Label>
                      <Input type="number" id="minProducts" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="maxProducts">Tối đa</Label>
                      <Input type="number" id="maxProducts" placeholder="1000" />
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
export default CategoriesFilter;