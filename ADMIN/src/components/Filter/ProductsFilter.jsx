
import React from "react";
import { Search, Filter, LayoutGrid, ListIcon } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

 const ProductsFilter = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} />
            <span>Bộ lọc</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductsFilter;