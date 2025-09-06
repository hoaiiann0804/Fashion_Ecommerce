import React, { useState } from "react";
import { Search, Filter, LayoutGrid, ListIcon, ChevronDown } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";
import { Label } from "../../components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";

export const ProductsFilter = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedBrandId,
  setSelectedBrandId,
  onApplyFilter,
  priceRange,
  setPriceRange,
  brands,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleApply = () => {
    if (onApplyFilter) {
      onApplyFilter({
        categorY_ID: selectedCategoryId,
        branD_ID: selectedBrandId,
        priceRange: localPriceRange,
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={18} />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <ListIcon size={18} />
            </Button>
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
                  <h4 className="font-medium leading-none">Danh mục</h4>
                  <Select
                    value={selectedCategoryId || "all"}
                    onValueChange={setSelectedCategoryId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Thương hiệu</h4>
                  <Select
                    value={selectedBrandId || "all"}
                    onValueChange={setSelectedBrandId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả thương hiệu" />
                    </SelectTrigger>
                    <SelectContent>
                  <SelectItem value="all">Tất cả thương hiệu</SelectItem>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Khoảng giá</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="minPrice">Giá tối thiểu</Label>
                      <Input
                        type="number"
                        id="minPrice"
                        placeholder="0"
                        value={localPriceRange.min}
                        onChange={(e) => setLocalPriceRange({ ...localPriceRange, min: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxPrice">Giá tối đa</Label>
                      <Input
                        type="number"
                        id="maxPrice"
                        placeholder="10,000,000"
                        value={localPriceRange.max}
                        onChange={(e) => setLocalPriceRange({ ...localPriceRange, max: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedCategoryId("");
                      setSelectedBrandId("");
                      setLocalPriceRange({ min: "", max: "" });
                    }}
                  >
                    Đặt lại
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleApply}
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};